/**
 * Kuwex Studios — single source of truth for all branded copy & business data.
 * Edit this file to update the bot, admin dashboard, and confirmation messages.
 */

export const KUWEX = {
  brand: {
    name: 'Kuwex Studios',
    tagline: 'Smart Digital Solutions for Africa',
    logoText: 'KUWEX',
    primary: '#1E1B4B',
    accent: '#10B981',
  },
  contact: {
    phone: '+263 71 906 6891',
    whatsapp: '+263719066891',
    adminWhatsapp: '+263719066891',
    email: 'info@kuwexstudios.co.zw',
    website: 'https://www.kuwexstudios.co.zw/',
    portfolio: 'https://www.kuwexstudios.co.zw/portfolio',
    address: '110 Leopold Takawira Ave, Construction Building, Harare CBD',
    hours: 'WhatsApp 24/7 — Always Open',
  },
  currency: 'USD',
  budgetTiers: [
    { id: 'b1', title: '$300 – $700' },
    { id: 'b2', title: '$700 – $1,500' },
    { id: 'b3', title: '$1,500 – $3,000' },
    { id: 'b4', title: '$3,000 – $7,000' },
    { id: 'b5', title: '$7,000+' },
    { id: 'b0', title: 'Not sure yet' },
  ],
  timelines: [
    { id: 't1', title: 'ASAP (1-2 weeks)' },
    { id: 't2', title: '1 month' },
    { id: 't3', title: '2-3 months' },
    { id: 't4', title: 'Flexible' },
  ],
} as const;

/** Top-level service catalog used by the main menu. */
export const SERVICES = [
  { id: 'website', emoji: '🌐', title: 'Website Development', desc: 'Business, e-commerce, lodge, school' },
  { id: 'marketing', emoji: '📈', title: 'Digital Marketing', desc: 'Facebook, Instagram, TikTok, Google ads' },
  { id: 'branding', emoji: '🎨', title: 'Branding & Design', desc: 'Logos, brand kits, graphics' },
  { id: 'ai', emoji: '🤖', title: 'AI Automation', desc: 'Smart workflows for your business' },
  { id: 'whatsapp_automation', emoji: '💬', title: 'WhatsApp Automation', desc: 'Chatbots like this one' },
  { id: 'seo', emoji: '🔎', title: 'SEO Services', desc: 'Rank higher on Google' },
  { id: 'social', emoji: '📱', title: 'Social Media Management', desc: 'Content & community' },
  { id: 'quote', emoji: '🧾', title: 'Request Quotation', desc: 'Custom price estimate' },
  { id: 'handover', emoji: '👤', title: 'Speak To Team', desc: 'Talk to a human' },
  { id: 'portfolio', emoji: '💼', title: 'Portfolio / Previous Work', desc: 'See what we have built' },
] as const;

export type ServiceId = typeof SERVICES[number]['id'];
