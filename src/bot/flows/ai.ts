import type { Flow } from '../flow-types';
import { askBudget, askBusinessName, askContactName, askDescription, askEmail } from './common';

export const aiFlow: Flow = {
  id: 'ai',
  title: 'AI Automation',
  steps: [
    {
      id: 'processes',
      type: 'multiselect',
      prompt: '🤖 *AI Automation*\n\nWhich processes do you want to automate?',
      save: 'processes',
      options: [
        { id: 'support', title: 'Customer Support' },
        { id: 'whatsapp', title: 'WhatsApp Replies' },
        { id: 'leads', title: 'Lead Management' },
        { id: 'booking', title: 'Booking System' },
        { id: 'sales', title: 'Sales Automation' },
        { id: 'crm', title: 'CRM Integration' },
        { id: 'reports', title: 'Reports & Analytics' },
        { id: 'docs', title: 'Document Processing' },
      ],
    },
    askBusinessName,
    askDescription,
    askBudget,
    askContactName,
    askEmail,
    {
      id: 'submit',
      type: 'submit',
      ticketType: 'ai',
      title: (ctx) => `AI Automation — ${ctx.data.businessName ?? 'New consultation'}`,
      summary: (ctx, ref) =>
        `✅ *AI consultation booked!*\n\n*Reference:* ${ref}\n` +
        `*Processes:* ${(ctx.data.processes ?? []).join(', ') || '-'}\n` +
        `*Budget:* ${ctx.data.budget ?? '-'}\n\n` +
        `An automation specialist will reach out to scope your build.`,
    },
  ],
};
