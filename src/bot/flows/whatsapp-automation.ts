import type { Flow } from '../flow-types';
import { askBudget, askBusinessName, askContactName, askDescription, askEmail } from './common';

export const whatsappAutomationFlow: Flow = {
  id: 'whatsapp_automation',
  title: 'WhatsApp Automation',
  steps: [
    {
      id: 'use_case',
      type: 'list',
      prompt: '💬 *WhatsApp Automation*\n\nWhat will the chatbot do?',
      buttonText: 'Choose use case',
      save: 'useCase',
      sections: [
        {
          title: 'Common use cases',
          items: [
            { id: 'sales', title: 'Sales & Orders', description: 'Take orders inside WhatsApp' },
            { id: 'support', title: 'Customer Support', description: 'Auto-answer FAQs' },
            { id: 'booking', title: 'Bookings', description: 'Appointments / reservations' },
            { id: 'delivery', title: 'Delivery / Logistics', description: 'Like Mobis-style flows' },
            { id: 'leads', title: 'Lead Capture', description: 'Qualify and route leads' },
            { id: 'custom', title: 'Custom Workflow', description: 'Tell us more' },
          ],
        },
      ],
    },
    askBusinessName,
    askDescription,
    {
      id: 'volume',
      type: 'buttons',
      prompt: '📊 Roughly how many *messages per month* do you handle?',
      save: 'volume',
      buttons: [
        { id: 'low', title: '< 500' },
        { id: 'mid', title: '500 – 5,000' },
        { id: 'high', title: '5,000+' },
      ],
    },
    askBudget,
    askContactName,
    askEmail,
    {
      id: 'submit',
      type: 'submit',
      ticketType: 'whatsapp_automation',
      title: (ctx) => `WhatsApp Bot — ${ctx.data.businessName ?? 'New project'}`,
      summary: (ctx, ref) =>
        `✅ *WhatsApp automation request confirmed!*\n\n*Reference:* ${ref}\n` +
        `*Use case:* ${ctx.data.useCase ?? '-'}\n*Volume:* ${ctx.data.volume ?? '-'}\n` +
        `*Budget:* ${ctx.data.budget ?? '-'}\n\nWe'll send a tailored proposal shortly.`,
    },
  ],
};
