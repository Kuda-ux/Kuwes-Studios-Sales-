import type { Flow } from '../flow-types';
import { aiFlow } from './ai';
import { brandingFlow } from './branding';
import { handoverFlow } from './handover';
import { welcomeFlow } from './main';
import { marketingFlow } from './marketing';
import { portfolioFlow } from './portfolio';
import { quoteFlow } from './quote';
import { seoFlow } from './seo';
import { socialFlow } from './social';
import { websiteFlow } from './website';
import { whatsappAutomationFlow } from './whatsapp-automation';

export const FLOWS: Record<string, Flow> = {
  welcome: welcomeFlow,
  website: websiteFlow,
  marketing: marketingFlow,
  branding: brandingFlow,
  ai: aiFlow,
  whatsapp_automation: whatsappAutomationFlow,
  seo: seoFlow,
  social: socialFlow,
  quote: quoteFlow,
  portfolio: portfolioFlow,
  handover: handoverFlow,
};

export function getFlow(id: string | null | undefined): Flow {
  if (id && FLOWS[id]) return FLOWS[id];
  return FLOWS.welcome;
}
