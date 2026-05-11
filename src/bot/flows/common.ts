import { KUWEX } from '@/config/kuwex';
import type { Step } from '../flow-types';

/** Reusable steps that appear in many service flows. */

export const askBusinessName: Step = {
  id: 'business_name',
  type: 'text',
  prompt: '🏢 What is your *business name*?',
  save: 'businessName',
  validate: (s) => (s.trim().length < 2 ? 'Please enter a valid business name.' : null),
};

export const askContactName: Step = {
  id: 'contact_name',
  type: 'text',
  prompt: '👋 What is your *full name*?',
  save: 'contactName',
  validate: (s) => (s.trim().length < 2 ? 'Please enter your full name.' : null),
};

export const askEmail: Step = {
  id: 'email',
  type: 'text',
  prompt: '📧 What is your *email address*? (or type *skip*)',
  save: 'email',
  optional: true,
  validate: (s) => {
    if (s.trim().toLowerCase() === 'skip') return null;
    return /.+@.+\..+/.test(s) ? null : 'Please enter a valid email or type *skip*.';
  },
};

export const askBudget: Step = {
  id: 'budget',
  type: 'list',
  prompt: '💰 What is your *estimated budget* (USD)?',
  save: 'budget',
  buttonText: 'Choose budget',
  sections: [{ title: 'Budget range', items: KUWEX.budgetTiers.map((b) => ({ id: b.id, title: b.title })) }],
};

export const askTimeline: Step = {
  id: 'timeline',
  type: 'list',
  prompt: '⏱️ When do you need it ready?',
  save: 'timeline',
  buttonText: 'Choose timeline',
  sections: [{ title: 'Timeline', items: KUWEX.timelines.map((t) => ({ id: t.id, title: t.title })) }],
};

export const askDescription: Step = {
  id: 'description',
  type: 'text',
  prompt: '📝 Briefly *describe your project or goal*. The more detail, the better.',
  save: 'description',
  validate: (s) => (s.trim().length < 5 ? 'Please give a little more detail (at least a sentence).' : null),
};

export const askAssets: Step = {
  id: 'assets',
  type: 'media',
  prompt:
    '📎 Please upload any helpful files — *logo, photos, brand colors, existing site link*.\n' +
    'You can send multiple, or type *skip* if none.',
  save: 'assetsUrl',
  optional: true,
  skipTitle: 'Skip',
};
