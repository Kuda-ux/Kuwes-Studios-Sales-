import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get('phone');
  if (!phone) return NextResponse.json({ messages: [] });
  const customer = await prisma.customer.findUnique({ where: { phone } });
  if (!customer) return NextResponse.json({ messages: [] });
  const messages = await prisma.message.findMany({
    where: { customerId: customer.id },
    orderBy: { createdAt: 'asc' },
    take: 200,
  });
  return NextResponse.json({ messages });
}
