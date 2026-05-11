import twilio from 'twilio';
import type { MessagingAdapter, OutgoingMessage } from './types';

/**
 * Twilio WhatsApp adapter.
 *
 * Twilio's standard messages.create() does not natively render WhatsApp
 * interactive buttons unless you use Content Templates (preapproved).
 * For Phase 1 we render buttons / lists as numbered text messages — this
 * works on every WhatsApp number including the sandbox, and customers can
 * reply by typing the number or the option label. The flow engine accepts
 * both numeric replies and exact-title matches.
 */
export function makeTwilioAdapter(): MessagingAdapter {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886';
  if (!sid || !token) throw new Error('Twilio credentials missing (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN)');
  const client = twilio(sid, token);

  function render(msg: OutgoingMessage): { body?: string; mediaUrl?: string[] } {
    switch (msg.kind) {
      case 'text':
        return { body: msg.body };
      case 'media':
        return { body: msg.caption, mediaUrl: [msg.mediaUrl] };
      case 'buttons': {
        const lines = [msg.header, msg.body, '', ...msg.buttons.map((b, i) => `${i + 1}. ${b.title}`)];
        if (msg.footer) lines.push('', `_${msg.footer}_`);
        return { body: lines.filter(Boolean).join('\n') };
      }
      case 'list': {
        const lines: string[] = [];
        if (msg.header) lines.push(`*${msg.header}*`);
        lines.push(msg.body, '');
        let n = 1;
        for (const s of msg.sections) {
          lines.push(`*${s.title}*`);
          for (const it of s.items) {
            lines.push(`${n}. ${it.title}${it.description ? ` — ${it.description}` : ''}`);
            n++;
          }
          lines.push('');
        }
        if (msg.footer) lines.push(`_${msg.footer}_`);
        lines.push('Reply with the number or the option name.');
        return { body: lines.join('\n').trim() };
      }
    }
  }

  return {
    name: 'twilio',
    async send(to, message) {
      const rendered = render(message);
      const res = await client.messages.create({
        from,
        to: to.startsWith('whatsapp:') ? to : `whatsapp:${to}`,
        ...rendered,
      });
      return { providerId: res.sid };
    },
  };
}
