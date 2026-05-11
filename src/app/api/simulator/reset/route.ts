import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const { phone } = await req.json();
  if (!phone) return NextResponse.json({ error: 'phone required' }, { status: 400 });
  const customer = await prisma.customer.findUnique({ where: { phone } });
  if (customer) {
    await prisma.message.deleteMany({ where: { customerId: customer.id } });
    await prisma.session.update({
      where: { customerId: customer.id },
      data: { flowId: null, stepId: null, data: {}, paused: false },
    }).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
