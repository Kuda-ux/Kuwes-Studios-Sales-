import { KUWEX } from '@/config/kuwex';

export const COPY = {
  welcome: () =>
    `👋 *Welcome to ${KUWEX.brand.name}!*\n` +
    `_${KUWEX.brand.tagline}_\n\n` +
    `I'm your virtual assistant — here to help you with websites, marketing, branding, AI automation and more.\n\n` +
    `How can I help you today?`,

  menuFooter: `Reply with a number or option name • Type *menu* anytime to restart`,

  invalid: `🤔 I didn't catch that. Please pick one of the options above, or type *menu* to start over.`,

  paused: `✅ A team member will reply here shortly. Type *menu* anytime to use the bot again.`,

  thanks: (ref: string) =>
    `🎉 *Request received!*\n\nYour reference: *${ref}*\n\n` +
    `Our team has been notified and will reach out shortly. ` +
    `You can type *menu* anytime to make another request, or *agent* to talk to a human.`,

  handover: () =>
    `👤 *Connecting you to our team…*\n\n` +
    `A Kuwex team member will reply here shortly.\n` +
    `📞 ${KUWEX.contact.phone}\n📧 ${KUWEX.contact.email}\n🕒 ${KUWEX.contact.hours}\n\n` +
    `Type *menu* anytime to use the bot again.`,
};
