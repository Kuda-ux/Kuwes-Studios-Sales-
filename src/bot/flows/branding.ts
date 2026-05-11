import type { Flow } from '../flow-types';
import { askAssets, askBudget, askBusinessName, askContactName, askDescription, askEmail, askTimeline } from './common';

export const brandingFlow: Flow = {
  id: 'branding',
  title: 'Branding & Design',
  steps: [
    {
      id: 'deliverables',
      type: 'multiselect',
      prompt: '🎨 *Branding & Design*\n\nWhat do you need designed?',
      save: 'deliverables',
      options: [
        { id: 'logo', title: 'Logo' },
        { id: 'brandkit', title: 'Full Brand Kit' },
        { id: 'business_cards', title: 'Business Cards' },
        { id: 'flyers', title: 'Flyers / Posters' },
        { id: 'social_pack', title: 'Social Media Pack' },
        { id: 'menu', title: 'Menu Design' },
        { id: 'packaging', title: 'Packaging' },
        { id: 'rebrand', title: 'Rebrand' },
      ],
    },
    askBusinessName,
    askDescription,
    askBudget,
    askTimeline,
    askContactName,
    askEmail,
    askAssets,
    {
      id: 'submit',
      type: 'submit',
      ticketType: 'branding',
      title: (ctx) => `Branding — ${ctx.data.businessName ?? 'New brand'}`,
      summary: (ctx, ref) =>
        `✅ *Branding request confirmed!*\n\n*Reference:* ${ref}\n` +
        `*Deliverables:* ${(ctx.data.deliverables ?? []).join(', ') || '-'}\n` +
        `*Budget:* ${ctx.data.budget ?? '-'}\n*Timeline:* ${ctx.data.timeline ?? '-'}\n\n` +
        `A designer will be in touch with concepts and pricing.`,
    },
  ],
};
