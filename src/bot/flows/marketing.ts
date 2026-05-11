import type { Flow } from '../flow-types';
import { askBudget, askBusinessName, askContactName, askDescription, askEmail } from './common';

export const marketingFlow: Flow = {
  id: 'marketing',
  title: 'Digital Marketing',
  steps: [
    {
      id: 'platforms',
      type: 'multiselect',
      prompt: '📈 *Digital Marketing*\n\nWhich *platforms* do you want to advertise on?',
      save: 'platforms',
      options: [
        { id: 'facebook', title: 'Facebook' },
        { id: 'instagram', title: 'Instagram' },
        { id: 'tiktok', title: 'TikTok' },
        { id: 'google', title: 'Google' },
        { id: 'youtube', title: 'YouTube' },
        { id: 'linkedin', title: 'LinkedIn' },
      ],
    },
    askBusinessName,
    askDescription,
    {
      id: 'audience',
      type: 'text',
      prompt: '🎯 Describe your *target audience* (e.g. "women 18–35 in Harare interested in fashion").',
      save: 'audience',
    },
    {
      id: 'services',
      type: 'multiselect',
      prompt: '🛠️ Which *services* do you need?',
      save: 'marketingServices',
      options: [
        { id: 'ads', title: 'Ad Management' },
        { id: 'content', title: 'Content Creation' },
        { id: 'social', title: 'Social Media Management' },
        { id: 'leads', title: 'Lead Generation' },
        { id: 'seo', title: 'SEO' },
        { id: 'strategy', title: 'Strategy & Consulting' },
      ],
    },
    {
      id: 'has_branding',
      type: 'buttons',
      prompt: '🎨 Do you already have *branding & content* (logo, photos, videos)?',
      save: 'hasBranding',
      buttons: [
        { id: 'yes', title: 'Yes' },
        { id: 'partial', title: 'Some of it' },
        { id: 'no', title: 'No, need help' },
      ],
    },
    askBudget,
    askContactName,
    askEmail,
    {
      id: 'submit',
      type: 'submit',
      ticketType: 'marketing',
      title: (ctx) => `Marketing — ${ctx.data.businessName ?? 'New campaign'}`,
      summary: (ctx, ref) =>
        `✅ *Marketing request confirmed!*\n\n` +
        `*Reference:* ${ref}\n` +
        `*Business:* ${ctx.data.businessName ?? '-'}\n` +
        `*Platforms:* ${(ctx.data.platforms ?? []).join(', ') || '-'}\n` +
        `*Services:* ${(ctx.data.marketingServices ?? []).join(', ') || '-'}\n` +
        `*Budget:* ${ctx.data.budget ?? '-'}\n\n` +
        `A marketing strategist will reach out with a tailored plan.`,
    },
  ],
};
