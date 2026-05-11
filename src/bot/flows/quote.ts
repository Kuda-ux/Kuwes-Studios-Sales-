import type { Flow } from '../flow-types';
import { askBudget, askBusinessName, askContactName, askDescription, askEmail, askTimeline } from './common';

export const quoteFlow: Flow = {
  id: 'quote',
  title: 'Request Quotation',
  steps: [
    {
      id: 'service',
      type: 'list',
      prompt: '🧾 *Request a Quotation*\n\nWhich service is the quote for?',
      buttonText: 'Choose service',
      save: 'quoteService',
      sections: [
        {
          title: 'Service',
          items: [
            { id: 'website', title: 'Website Development' },
            { id: 'ecommerce', title: 'E-commerce Store' },
            { id: 'marketing', title: 'Digital Marketing' },
            { id: 'branding', title: 'Branding & Design' },
            { id: 'ai', title: 'AI Automation' },
            { id: 'whatsapp_automation', title: 'WhatsApp Automation' },
            { id: 'seo', title: 'SEO' },
            { id: 'social', title: 'Social Media' },
            { id: 'other', title: 'Other / Custom' },
          ],
        },
      ],
    },
    askBusinessName,
    askDescription,
    askBudget,
    askTimeline,
    askContactName,
    askEmail,
    {
      id: 'submit',
      type: 'submit',
      ticketType: 'quote',
      title: (ctx) => `Quote — ${ctx.data.quoteService ?? 'general'} — ${ctx.data.businessName ?? ''}`.trim(),
      summary: (ctx, ref) =>
        `✅ *Quotation request received!*\n\n*Reference:* ${ref}\n` +
        `*Service:* ${ctx.data.quoteService ?? '-'}\n*Budget:* ${ctx.data.budget ?? '-'}\n` +
        `*Timeline:* ${ctx.data.timeline ?? '-'}\n\n` +
        `Your custom quotation will be ready shortly. We'll send it here on WhatsApp.`,
    },
  ],
};
