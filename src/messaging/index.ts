import { makeSimulatorAdapter } from './simulator';
import { makeTwilioAdapter } from './twilio';
import type { MessagingAdapter } from './types';

let _adapter: MessagingAdapter | null = null;

export function getAdapter(): MessagingAdapter {
  if (_adapter) return _adapter;
  const provider = (process.env.MESSAGING_PROVIDER ?? 'simulator').toLowerCase();
  _adapter = provider === 'twilio' ? makeTwilioAdapter() : makeSimulatorAdapter();
  return _adapter;
}

export * from './types';
