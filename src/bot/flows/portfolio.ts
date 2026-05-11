import { KUWEX } from '@/config/kuwex';
import type { Flow } from '../flow-types';

export const portfolioFlow: Flow = {
  id: 'portfolio',
  title: 'Portfolio',
  steps: [
    {
      id: 'show',
      type: 'info',
      message: () => ({
        kind: 'text',
        body:
          `💼 *Kuwex Studios — Selected Work*\n\n` +
          `🌐 Full portfolio: ${KUWEX.contact.portfolio}\n` +
          `🌐 Website: ${KUWEX.contact.website}\n\n` +
          `Highlights:\n` +
          `• Business websites for SMEs across Zimbabwe\n` +
          `• E-commerce stores with online payments\n` +
          `• Lodge & hotel booking platforms\n` +
          `• WhatsApp automation systems\n` +
          `• Brand identity & design systems\n\n` +
          `Want a similar project? Type *menu* and pick a service, or type *quote* for pricing.`,
      }),
    },
    {
      id: 'next',
      type: 'buttons',
      prompt: 'What would you like to do next?',
      save: 'portfolioNext',
      buttons: [
        { id: 'menu', title: 'Main Menu' },
        { id: 'quote', title: 'Get Quotation' },
        { id: 'agent', title: 'Speak To Team' },
      ],
      branch: {
        menu: '__flow:welcome',
        quote: '__flow:quote',
        agent: '__flow:handover',
      },
    },
  ],
};
