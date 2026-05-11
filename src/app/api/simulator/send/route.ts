import { NextResponse } from 'next/server';
import { handleIncoming } from '@/bot/engine';
import { getSimulatorAdapter } from '@/messaging';

export async function POST(req: Request) {
  try {
    const { from, text, payloadId } = await req.json();
    if (!from) return NextResponse.json({ error: 'from required' }, { status: 400 });
    // Force the simulator adapter so bot replies render in the chat UI
    // instead of being sent as real WhatsApp messages to fake phone numbers.
    await handleIncoming({ from, text, payloadId }, { adapter: getSimulatorAdapter() });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[simulator/send] error:', err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? String(err), stack: err?.stack },
      { status: 500 },
    );
  }
}
