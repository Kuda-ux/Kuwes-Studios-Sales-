/** Generate a human-friendly ticket reference like KX-WEB-2026-0001. */
const PREFIX: Record<string, string> = {
  website: 'WEB',
  ecommerce: 'ECM',
  marketing: 'MKT',
  branding: 'BRD',
  ai: 'AI',
  whatsapp_automation: 'WAB',
  seo: 'SEO',
  social: 'SMM',
  quote: 'QTE',
  callback: 'CBK',
};

export function ticketRef(type: string, sequence: number) {
  const code = PREFIX[type] ?? 'GEN';
  const year = new Date().getFullYear();
  return `KX-${code}-${year}-${String(sequence).padStart(4, '0')}`;
}

export function shortId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}
