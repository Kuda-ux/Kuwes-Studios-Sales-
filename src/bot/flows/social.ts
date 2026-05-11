import type { Flow } from '../flow-types';
import { askBudget, askBusinessName, askContactName, askDescription, askEmail } from './common';

export const socialFlow: Flow = {
  id: 'social',
  title: 'Social Media Management',
  steps: [
    {
      id: 'platforms',
      type: 'multiselect',
      prompt: '📱 *Social Media Management*\n\nWhich platforms?',
      save: 'platforms',
      options: [
        { id: 'instagram', title: 'Instagram' },
        { id: 'facebook', title: 'Facebook' },
        { id: 'tiktok', title: 'TikTok' },
        { id: 'twitter', title: 'X / Twitter' },
        { id: 'linkedin', title: 'LinkedIn' },
        { id: 'youtube', title: 'YouTube' },
      ],
    },
    {
      id: 'frequency',
      type: 'buttons',
      prompt: '📅 How often should we *post*?',
      save: 'frequency',
      buttons: [
        { id: 'daily', title: 'Daily' },
        { id: '3x', title: '3× per week' },
        { id: 'weekly', title: 'Weekly' },
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
      ticketType: 'social',
      title: (ctx) => `Social Media — ${ctx.data.businessName ?? 'New account'}`,
      summary: (ctx, ref) =>
        `✅ *Social media request confirmed!*\n\n*Reference:* ${ref}\n` +
        `*Platforms:* ${(ctx.data.platforms ?? []).join(', ') || '-'}\n` +
        `*Posting:* ${ctx.data.frequency ?? '-'}\n*Budget:* ${ctx.data.budget ?? '-'}\n\n` +
        `Our social team will reach out with content samples and a plan.`,
    },
  ],
};
