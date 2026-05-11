import { KUWEX } from '@/config/kuwex';
import type { Flow } from '../flow-types';

export const handoverFlow: Flow = {
  id: 'handover',
  title: 'Speak To Team',
  steps: [
    {
      id: 'reason',
      type: 'list',
      prompt: '👤 *Speak To Our Team*\n\nWhat do you need?',
      buttonText: 'Choose option',
      save: 'handoverReason',
      sections: [
        {
          title: 'How can we help?',
          items: [
            { id: 'agent', title: 'Chat with an agent', description: 'Right here on WhatsApp' },
            { id: 'callback', title: 'Request a callback', description: 'A team member will phone you' },
            { id: 'visit', title: 'Visit our office', description: KUWEX.contact.address },
          ],
        },
      ],
    },
    {
      id: 'message',
      type: 'text',
      prompt: '📝 In one short message, what is this about? (so we can route you to the right person)',
      save: 'handoverMessage',
    },
    {
      id: 'submit',
      type: 'submit',
      ticketType: 'callback',
      title: (ctx) => `Handover (${ctx.data.handoverReason ?? 'agent'}) — ${ctx.customer.phone}`,
      summary: (ctx, ref) =>
        `👤 *Connecting you to our team…*\n\n*Reference:* ${ref}\n\n` +
        `A Kuwex team member has been notified and will reply on this chat shortly.\n\n` +
        `📞 ${KUWEX.contact.phone}\n📧 ${KUWEX.contact.email}\n📍 ${KUWEX.contact.address}\n\n` +
        `_The bot is now paused. Type *menu* anytime to resume._`,
    },
  ],
};
