import { NextResponse } from 'next/server';
import { handleIncoming } from '@/bot/engine';

export async function POST(req: Request) {
  const { from, text, payloadId } = await req.json();
  if (!from) return NextResponse.json({ error: 'from required' }, { status: 400 });
  await handleIncoming({ from, text, payloadId });
  return NextResponse.json({ ok: true });
}
