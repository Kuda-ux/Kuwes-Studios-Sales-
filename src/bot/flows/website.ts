import type { Flow } from '../flow-types';
import { askAssets, askBudget, askBusinessName, askContactName, askDescription, askEmail, askTimeline } from './common';

export const websiteFlow: Flow = {
  id: 'website',
  title: 'Website Development',
  steps: [
    {
      id: 'site_type',
      type: 'list',
      prompt: '🌐 *Website Development*\n\nWhat type of website do you need?',
      buttonText: 'Choose type',
      save: 'siteType',
      sections: [
        {
          title: 'Website types',
          items: [
            { id: 'business', title: 'Business Website', description: 'Company / services site' },
            { id: 'ecommerce', title: 'E-commerce Store', description: 'Sell products online' },
            { id: 'lodge', title: 'Lodge / Hotel', description: 'Rooms & bookings' },
            { id: 'school', title: 'School Website', description: 'Info, news, applications' },
            { id: 'booking', title: 'Booking Website', description: 'Appointments / services' },
            { id: 'portfolio', title: 'Portfolio Website', description: 'Personal / creative' },
            { id: 'custom', title: 'Custom / Other', description: 'Tell us your idea' },
          ],
        },
      ],
    },
    askBusinessName,
    askDescription,
    {
      id: 'features',
      type: 'multiselect',
      prompt: '⚙️ Which *features* do you need? Tap each one, then *Done* when finished.',
      save: 'features',
      options: [
        { id: 'payments', title: 'Online Payments' },
        { id: 'booking', title: 'Booking System' },
        { id: 'whatsapp', title: 'WhatsApp Chat' },
        { id: 'admin', title: 'Admin Dashboard' },
        { id: 'accounts', title: 'Customer Accounts' },
        { id: 'catalog', title: 'Product Catalog' },
        { id: 'seo', title: 'SEO Optimization' },
        { id: 'blog', title: 'Blog / News' },
        { id: 'multilang', title: 'Multi-language' },
      ],
    },
    askBudget,
    askTimeline,
    askContactName,
    askEmail,
    askAssets,
    {
      id: 'submit',
      type: 'submit',
      ticketType: 'website',
      title: (ctx) => `Website (${ctx.data.siteType ?? 'custom'}) — ${ctx.data.businessName ?? 'New project'}`,
      summary: (ctx, ref) =>
        `✅ *Website request confirmed!*\n\n` +
        `*Reference:* ${ref}\n` +
        `*Business:* ${ctx.data.businessName ?? '-'}\n` +
        `*Type:* ${ctx.data.siteType ?? '-'}\n` +
        `*Features:* ${(ctx.data.features ?? []).join(', ') || '-'}\n` +
        `*Budget:* ${ctx.data.budget ?? '-'}\n` +
        `*Timeline:* ${ctx.data.timeline ?? '-'}\n\n` +
        `Our team will review your brief and get back to you with a tailored proposal.`,
    },
  ],
};
