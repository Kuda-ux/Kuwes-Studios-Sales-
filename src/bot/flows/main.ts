import { SERVICES } from '@/config/kuwex';
import { COPY } from '../copy';
import type { Flow } from '../flow-types';

/**
 * Welcome flow. The first step shows the main menu; each option `branch`es
 * into the corresponding service flow id.
 */
export const welcomeFlow: Flow = {
  id: 'welcome',
  title: 'Welcome',
  steps: [
    {
      id: 'main_menu',
      type: 'list',
      prompt: COPY.welcome(),
      buttonText: 'View services',
      save: 'menuChoice',
      sections: [
        {
          title: 'Our Services',
          items: SERVICES.slice(0, 7).map((s) => ({
            id: s.id,
            title: `${s.emoji} ${s.title}`,
            description: s.desc,
          })),
        },
        {
          title: 'Get in touch',
          items: SERVICES.slice(7).map((s) => ({
            id: s.id,
            title: `${s.emoji} ${s.title}`,
            description: s.desc,
          })),
        },
      ],
      branch: {
        website: '__flow:website',
        marketing: '__flow:marketing',
        branding: '__flow:branding',
        ai: '__flow:ai',
        whatsapp_automation: '__flow:whatsapp_automation',
        seo: '__flow:seo',
        social: '__flow:social',
        quote: '__flow:quote',
        handover: '__flow:handover',
        portfolio: '__flow:portfolio',
      },
    },
  ],
};
