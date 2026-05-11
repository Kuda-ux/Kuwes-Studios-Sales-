import { prisma } from '@/lib/db';

export async function getOrCreateCustomer(phone: string, name?: string) {
  return prisma.customer.upsert({
    where: { phone },
    update: { name: name ?? undefined, updatedAt: new Date() },
    create: { phone, name },
  });
}

export async function loadSession(customerId: string) {
  const existing = await prisma.session.findUnique({ where: { customerId } });
  if (existing) return existing;
  return prisma.session.create({ data: { customerId, data: {} } });
}

export async function saveSession(
  customerId: string,
  patch: { flowId?: string | null; stepId?: string | null; data?: any; paused?: boolean },
) {
  return prisma.session.update({
    where: { customerId },
    data: { ...patch, lastSeenAt: new Date() },
  });
}

export async function resetSession(customerId: string) {
  return prisma.session.update({
    where: { customerId },
    data: { flowId: null, stepId: null, data: {}, paused: false },
  });
}
