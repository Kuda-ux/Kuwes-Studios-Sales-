/**
 * Conversation engine.
 *
 * Responsibilities:
 *  - Detect global commands (menu, agent, restart) regardless of state.
 *  - Resolve the active flow & step for the customer's session.
 *  - Validate the latest customer reply against the current step, persist
 *    collected data, and advance / branch / submit accordingly.
 *  - Render the next prompt as a provider-agnostic OutgoingMessage and ship
 *    it via the configured MessagingAdapter.
 *
 * Designed to be stateless between calls — all state lives in Postgres.
 */

import { AsyncLocalStorage } from 'async_hooks';
import { prisma } from '@/lib/db';
import { ticketRef } from '@/lib/ids';
import { getAdapter } from '@/messaging';
import type { MessagingAdapter, OutgoingMessage } from '@/messaging/types';
import { COPY } from './copy';
import { FLOWS, getFlow } from './flows';
import type { Flow, Step, StepContext } from './flow-types';
import { getOrCreateCustomer, loadSession, resetSession, saveSession } from './session';

type Incoming = { from: string; text?: string; payloadId?: string; mediaUrl?: string };

/** Per-request adapter override via AsyncLocalStorage so concurrent
 * webhook + simulator invocations on the same Node instance can't
 * clobber each other. */
const adapterStore = new AsyncLocalStorage<MessagingAdapter>();
function activeAdapter(): MessagingAdapter {
  return adapterStore.getStore() ?? getAdapter();
}

const RESET_KEYWORDS = ['menu', 'start', 'restart', 'hi', 'hello', 'hey', 'hie'];
const HANDOVER_KEYWORDS = ['agent', 'human', 'support', 'team'];
const RESUME_KEYWORDS = ['menu', 'bot', 'restart'];

export async function handleIncoming(
  input: Incoming,
  opts?: { adapter?: MessagingAdapter },
): Promise<{ reply?: OutgoingMessage[] }> {
  if (opts?.adapter) {
    return await adapterStore.run(opts.adapter, () => _handleIncoming(input));
  }
  return await _handleIncoming(input);
}

async function _handleIncoming(input: Incoming): Promise<{ reply?: OutgoingMessage[] }> {
  const phone = normalizePhone(input.from);
  const customer = await getOrCreateCustomer(phone);
  const session = await loadSession(customer.id);

  // Persist incoming message
  await prisma.message.create({
    data: {
      customerId: customer.id,
      direction: 'in',
      body: input.text ?? (input.mediaUrl ? '[media]' : ''),
      payload: { payloadId: input.payloadId, mediaUrl: input.mediaUrl } as any,
    },
  });

  const text = (input.text ?? '').trim();
  const lower = text.toLowerCase();

  // Resume from human-handover pause
  if (session.paused) {
    if (RESUME_KEYWORDS.includes(lower)) {
      await resetSession(customer.id);
    } else {
      // Stay paused: do not auto-reply.
      return { reply: [] };
    }
  }

  // Global handover keyword
  if (HANDOVER_KEYWORDS.includes(lower)) {
    return await startFlow(customer.id, customer.phone, 'handover');
  }

  // Global reset keyword OR no active flow → show welcome menu
  if (RESET_KEYWORDS.includes(lower) || !session.flowId) {
    return await startFlow(customer.id, customer.phone, 'welcome');
  }

  // Continue current flow
  const flow = getFlow(session.flowId);
  const stepIndex = flow.steps.findIndex((s) => s.id === session.stepId);
  const step = stepIndex >= 0 ? flow.steps[stepIndex] : flow.steps[0];

  return await processStep({
    customerId: customer.id,
    phone: customer.phone,
    flow,
    step,
    stepIndex,
    data: (session.data as any) ?? {},
    input,
  });
}

async function startFlow(customerId: string, phone: string, flowId: string) {
  const flow = getFlow(flowId);
  // Auto-chain leading info steps so the customer sees the prompt that
  // actually requires their input, not just an unactionable info card.
  let idx = 0;
  const data: Record<string, any> = {};
  const out: OutgoingMessage[] = [];
  while (idx < flow.steps.length) {
    const s = flow.steps[idx];
    out.push(...(await renderStep(s, { data, customer: { phone } })));
    if (s.type !== 'info') break;
    idx++;
  }
  const stopStep = flow.steps[Math.min(idx, flow.steps.length - 1)];
  await saveSession(customerId, { flowId: flow.id, stepId: stopStep.id, data: {}, paused: false });
  return await dispatch(phone, out);
}

type ProcessArgs = {
  customerId: string;
  phone: string;
  flow: Flow;
  step: Step;
  stepIndex: number;
  data: Record<string, any>;
  input: Incoming;
};

async function processStep(args: ProcessArgs): Promise<{ reply: OutgoingMessage[] }> {
  const { customerId, phone, flow, step, data, input } = args;
  const text = (input.text ?? '').trim();

  // Attempt to handle current step's reply
  const handled = await consumeReply(step, text, input, data);

  if (handled.error) {
    const reprompt = await renderStep(step, { data, customer: { phone } });
    const out: OutgoingMessage[] = [{ kind: 'text', body: handled.error }, ...reprompt];
    return await dispatch(phone, out);
  }

  // Apply data updates
  Object.assign(data, handled.patch ?? {});

  // Determine next step
  const next = await resolveNext(flow, step, handled, data, customerId, phone);
  if (next.kind === 'flow_change') {
    // Reuse the same auto-chaining we do in startFlow.
    return await startFlow(customerId, phone, next.flowId);
  }

  if (next.kind === 'submit') {
    return await dispatch(phone, next.messages);
  }

  if (next.kind === 'done') {
    await resetSession(customerId);
    const welcome = getFlow('welcome');
    const out = await renderStep(welcome.steps[0], { data: {}, customer: { phone } });
    return await dispatch(phone, out);
  }

  // Advance to next step in same flow
  await saveSession(customerId, { stepId: next.step.id, data });
  const out = await renderStep(next.step, { data, customer: { phone } });
  return await dispatch(phone, out);
}

/* ---------------- Reply consumption ---------------- */

type Consumed = {
  error?: string;
  patch?: Record<string, any>;
  chosenId?: string;
  multiselectDone?: boolean;
};

async function consumeReply(step: Step, text: string, input: Incoming, data: Record<string, any>): Promise<Consumed> {
  switch (step.type) {
    case 'info':
      // info steps auto-advance on any input
      return {};

    case 'text': {
      if (step.optional && text.toLowerCase() === 'skip') return { patch: { [step.save]: null } };
      if (!text) return { error: '✏️ Please type your answer.' };
      if (step.validate) {
        const err = step.validate(text);
        if (err) return { error: err };
      }
      return { patch: { [step.save]: text } };
    }

    case 'buttons': {
      const id = matchOption(text, input.payloadId, step.buttons.map((b) => ({ id: b.id, title: b.title })));
      if (!id) return { error: COPY.invalid };
      const title = step.buttons.find((b) => b.id === id)!.title;
      return { patch: { [step.save]: title }, chosenId: id };
    }

    case 'list': {
      const items = step.sections.flatMap((s) => s.items);
      const id = matchOption(text, input.payloadId, items);
      if (!id) return { error: COPY.invalid };
      const title = items.find((i) => i.id === id)!.title;
      return { patch: { [step.save]: title }, chosenId: id };
    }

    case 'multiselect': {
      const doneId = step.doneId ?? '__done';
      const allOptions = [...step.options, { id: doneId, title: step.doneTitle ?? 'Done ✅' }];
      const id = matchOption(text, input.payloadId, allOptions);
      if (!id) return { error: COPY.invalid };

      const current: string[] = Array.isArray(data[step.save]) ? data[step.save] : [];
      if (id === doneId) {
        if (current.length === 0) return { error: 'Please pick at least one option, then tap *Done ✅*.' };
        return { multiselectDone: true };
      }
      const title = step.options.find((o) => o.id === id)!.title;
      const next = current.includes(title) ? current.filter((x) => x !== title) : [...current, title];
      return { patch: { [step.save]: next } };
    }

    case 'media': {
      if (input.mediaUrl) return { patch: { [step.save]: input.mediaUrl } };
      if (step.optional && (text.toLowerCase() === 'skip' || !text)) {
        return { patch: { [step.save]: null } };
      }
      // Treat free text on a media step as a link/description
      if (text) return { patch: { [step.save]: text } };
      return { error: 'Please send a file/link, or type *skip*.' };
    }

    case 'goto':
    case 'submit':
      return {};
  }
}

function matchOption(text: string, payloadId: string | undefined, options: { id: string; title: string }[]): string | null {
  if (payloadId && options.some((o) => o.id === payloadId)) return payloadId;
  const t = text.trim().toLowerCase();
  if (!t) return null;
  // Numeric reply: "1", "2."
  const num = parseInt(t, 10);
  if (!Number.isNaN(num) && num >= 1 && num <= options.length) return options[num - 1].id;
  // Exact id or title match
  const byId = options.find((o) => o.id.toLowerCase() === t);
  if (byId) return byId.id;
  const byTitle = options.find((o) => o.title.toLowerCase() === t);
  if (byTitle) return byTitle.id;
  // Partial title contains
  const partial = options.find((o) => o.title.toLowerCase().includes(t) && t.length >= 3);
  return partial?.id ?? null;
}

/* ---------------- Next-step resolution ---------------- */

type NextResult =
  | { kind: 'step'; step: Step }
  | { kind: 'flow_change'; flowId: string; stepId: string }
  | { kind: 'submit'; messages: OutgoingMessage[] }
  | { kind: 'done' };

async function resolveNext(
  flow: Flow,
  step: Step,
  consumed: Consumed,
  data: Record<string, any>,
  customerId: string,
  phone: string,
): Promise<NextResult> {
  // Branching steps
  if ((step.type === 'buttons' || step.type === 'list') && consumed.chosenId && step.branch?.[consumed.chosenId]) {
    const target = step.branch[consumed.chosenId];
    if (target.startsWith('__flow:')) {
      const flowId = target.slice('__flow:'.length);
      const f = FLOWS[flowId];
      if (f) return { kind: 'flow_change', flowId: f.id, stepId: f.steps[0].id };
    } else {
      const s = flow.steps.find((x) => x.id === target);
      if (s) return { kind: 'step', step: s };
    }
  }

  // Multiselect: stay on same step until "done"
  if (step.type === 'multiselect' && !consumed.multiselectDone) {
    return { kind: 'step', step };
  }

  // Goto step
  if (step.type === 'goto') {
    if (step.flowId === flow.id) {
      const s = flow.steps.find((x) => x.id === step.stepId) ?? flow.steps[0];
      return { kind: 'step', step: s };
    }
    const f = FLOWS[step.flowId];
    if (f) return { kind: 'flow_change', flowId: f.id, stepId: step.stepId ?? f.steps[0].id };
  }

  // Submit step → create ticket + lead, notify, return confirmation messages
  if (step.type === 'submit') {
    const ctx: StepContext = { data, customer: { phone } };
    const sequence = (await prisma.ticket.count({ where: { type: step.ticketType } })) + 1;
    const ref = ticketRef(step.ticketType, sequence);
    const ticket = await prisma.ticket.create({
      data: {
        ref,
        customerId,
        type: step.ticketType,
        title: step.title(ctx),
        budget: data.budget ?? null,
        timeline: data.timeline ?? null,
        data,
        priority: step.ticketType === 'callback' ? 'high' : 'normal',
      },
    });
    await prisma.lead.create({
      data: { customerId, service: step.ticketType, stage: 'new', score: scoreLead(data) },
    });
    // Update customer with collected info
    await prisma.customer.update({
      where: { id: customerId },
      data: {
        name: data.contactName ?? undefined,
        email: data.email && data.email !== 'skip' ? data.email : undefined,
        businessName: data.businessName ?? undefined,
      },
    });
    // Pause bot for human handover
    if (step.ticketType === 'callback') {
      await saveSession(customerId, { paused: true, flowId: null, stepId: null, data: {} });
    } else {
      await resetSession(customerId);
    }

    const summary = step.summary(ctx, ref);
    const messages: OutgoingMessage[] = [{ kind: 'text', body: summary }];
    if (step.ticketType !== 'callback') {
      messages.push({
        kind: 'buttons',
        body: 'Anything else I can help with?',
        buttons: [
          { id: 'menu', title: 'Main Menu' },
          { id: 'agent', title: 'Speak To Team' },
        ],
      });
    }

    // Fire-and-forget admin notification
    notifyAdmin(ticket.ref, ticket.title, ticket.type, phone).catch(() => {});

    return { kind: 'submit', messages };
  }

  // Default: advance to next step
  const idx = flow.steps.findIndex((s) => s.id === step.id);
  const next = flow.steps[idx + 1];
  if (!next) return { kind: 'done' };

  // Auto-chain into terminal / no-prompt steps so the customer receives
  // the ticket confirmation in the SAME turn they completed the form —
  // not on their next message. Without this, submit/goto steps would
  // render as an empty reply because they have no prompt.
  if (next.type === 'submit' || next.type === 'goto') {
    return await resolveNext(flow, next, consumed, data, customerId, phone);
  }

  return { kind: 'step', step: next };
}

function scoreLead(data: Record<string, any>): number {
  let score = 10;
  if (data.budget && !/not sure/i.test(data.budget)) score += 20;
  if (data.timeline && /asap|1 month/i.test(data.timeline)) score += 15;
  if (data.email && data.email !== 'skip') score += 10;
  if (data.businessName) score += 10;
  if (data.description && data.description.length > 40) score += 10;
  return Math.min(score, 100);
}

/* ---------------- Rendering ---------------- */

async function renderStep(step: Step, ctx: StepContext): Promise<OutgoingMessage[]> {
  switch (step.type) {
    case 'text':
      return [{ kind: 'text', body: typeof step.prompt === 'function' ? step.prompt(ctx) : step.prompt }];
    case 'buttons':
      return [{
        kind: 'buttons',
        body: typeof step.prompt === 'function' ? step.prompt(ctx) : step.prompt,
        buttons: step.buttons,
        footer: COPY.menuFooter,
      }];
    case 'list':
      return [{
        kind: 'list',
        body: typeof step.prompt === 'function' ? step.prompt(ctx) : step.prompt,
        buttonText: step.buttonText ?? 'Select',
        sections: step.sections,
        footer: COPY.menuFooter,
      }];
    case 'multiselect': {
      const current: string[] = Array.isArray(ctx.data[step.save]) ? ctx.data[step.save] : [];
      const promptText = typeof step.prompt === 'function' ? step.prompt(ctx) : step.prompt;
      const selected = current.length ? `\n\n*Selected:* ${current.join(', ')}` : '';
      return [{
        kind: 'buttons',
        body: `${promptText}${selected}`,
        buttons: [
          ...step.options.map((o) => ({ id: o.id, title: current.includes(o.title) ? `✅ ${o.title}` : o.title })),
          { id: step.doneId ?? '__done', title: step.doneTitle ?? 'Done ✅' },
        ],
        footer: 'Tap each option to toggle, then Done.',
      }];
    }
    case 'media':
      return [{
        kind: 'text',
        body: typeof step.prompt === 'function' ? step.prompt(ctx) : step.prompt,
      }];
    case 'info': {
      const m = step.message(ctx);
      return Array.isArray(m) ? m : [m];
    }
    case 'goto':
    case 'submit':
      return [];
  }
}

/* ---------------- Dispatch ---------------- */

async function dispatch(phone: string, messages: OutgoingMessage[]) {
  const adapter = activeAdapter();
  for (const msg of messages) {
    await adapter.send(phone, msg);
  }
  return { reply: messages };
}

function normalizePhone(raw: string): string {
  // Strip Twilio "whatsapp:" prefix and whitespace
  return raw.replace(/^whatsapp:/i, '').replace(/\s+/g, '').trim();
}

/* ---------------- Admin notification ---------------- */

async function notifyAdmin(ref: string, title: string, type: string, customerPhone: string) {
  const adminPhone = process.env.ADMIN_NOTIFY_PHONE;
  if (!adminPhone) return;
  const adapter = activeAdapter();
  await adapter.send(adminPhone, {
    kind: 'text',
    body:
      `🔔 *New ${type.toUpperCase()} request*\n\n` +
      `*Ref:* ${ref}\n*Title:* ${title}\n*Customer:* ${customerPhone}\n\n` +
      `Open admin → ${process.env.NEXT_PUBLIC_APP_URL ?? ''}/admin/tickets`,
  });
}
