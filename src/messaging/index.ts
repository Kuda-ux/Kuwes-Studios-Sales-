import { makeSimulatorAdapter } from './simulator';
import { makeTwilioAdapter } from './twilio';
import type { MessagingAdapter } from './types';

let _default: MessagingAdapter | null = null;
let _simulator: MessagingAdapter | null = null;

export function getAdapter(): MessagingAdapter {
  if (_default) return _default;
  const provider = (process.env.MESSAGING_PROVIDER ?? 'simulator').toLowerCase();
  _default = provider === 'twilio' ? makeTwilioAdapter() : makeSimulatorAdapter();
  return _default;
}

/** Force the in-app simulator adapter (used by the /simulator UI so bot
 * replies appear in the chat instead of being sent to real WhatsApp). */
export function getSimulatorAdapter(): MessagingAdapter {
  if (_simulator) return _simulator;
  _simulator = makeSimulatorAdapter();
  return _simulator;
}

export * from './types';
