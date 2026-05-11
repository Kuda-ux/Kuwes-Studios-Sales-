import { prisma } from '@/lib/db';
import type { MessagingAdapter, OutgoingMessage } from './types';

/**
 * Simulator adapter — persists outgoing messages straight to the DB so the
 * /simulator UI can fetch and render them. No external network calls.
 */
export function makeSimulatorAdapter(): MessagingAdapter {
  return {
    name: 'simulator',
    async send(to, message) {
      const customer = await prisma.customer.upsert({
        where: { phone: to },
        update: {},
        create: { phone: to },
      });
      const body =
        message.kind === 'text' ? message.body :
        message.kind === 'media' ? (message.caption ?? '[media]') :
        message.kind === 'buttons' ? message.body :
        message.body;
      await prisma.message.create({
        data: {
          customerId: customer.id,
          direction: 'out',
          channel: 'simulator',
          body,
          payload: message as any,
        },
      });
      return { providerId: undefined };
    },
  };
}
