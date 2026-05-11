import type { Flow } from '../flow-types';
import { askBudget, askBusinessName, askContactName, askDescription, askEmail } from './common';

export const seoFlow: Flow = {
  id: 'seo',
  title: 'SEO Services',
  steps: [
    {
      id: 'has_site',
      type: 'buttons',
      prompt: '🔎 *SEO Services*\n\nDo you already have a *website*?',
      save: 'hasSite',
      buttons: [
        { id: 'yes', title: 'Yes' },
        { id: 'no', title: 'Not yet' },
      ],
    },
    {
      id: 'site_url',
      type: 'text',
      prompt: '🔗 Please share your *website URL* (or type *skip* if none yet).',
      save: 'siteUrl',
      optional: true,
    },
    askBusinessName,
    askDescription,
    {
      id: 'goals',
      type: 'multiselect',
      prompt: '🎯 What are your *SEO goals*?',
      save: 'goals',
      options: [
        { id: 'rank', title: 'Rank higher on Google' },
        { id: 'traffic', title: 'More website traffic' },
        { id: 'local', title: 'Local / Google Maps' },
        { id: 'leads', title: 'More leads / sales' },
        { id: 'audit', title: 'SEO Audit' },
      ],
    },
    askBudget,
    askContactName,
    askEmail,
    {
      id: 'submit',
      type: 'submit',
      ticketType: 'seo',
      title: (ctx) => `SEO — ${ctx.data.businessName ?? 'New SEO request'}`,
      summary: (ctx, ref) =>
        `✅ *SEO request confirmed!*\n\n*Reference:* ${ref}\n` +
        `*Site:* ${ctx.data.siteUrl ?? '-'}\n*Goals:* ${(ctx.data.goals ?? []).join(', ') || '-'}\n` +
        `*Budget:* ${ctx.data.budget ?? '-'}\n\nAn SEO specialist will reach out with an audit & plan.`,
    },
  ],
};
