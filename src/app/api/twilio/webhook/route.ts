import { NextResponse } from 'next/server';
import { handleIncoming } from '@/bot/engine';

/**
 * Twilio WhatsApp webhook.
 *
 * Configure in Twilio console → WhatsApp Sandbox / Sender:
 *   "When a message comes in" → POST → https://YOUR-DOMAIN/api/twilio/webhook
 *
 * Twilio posts application/x-www-form-urlencoded. We MUST always return 200
 * (with TwiML) so Twilio does not retry the same message on transient errors.
 * Engine errors are logged for Vercel observability but never bubble up.
 */
export const dynamic = 'force-dynamic';
// Allow up to 30s for the engine + multiple Twilio sends in one turn.
export const maxDuration = 30;

const EMPTY_TWIML = '<?xml version="1.0" encoding="UTF-8"?><Response/>';

export async function POST(req: Request) {
  const startedAt = Date.now();
  let from = '';
  let body = '';
  try {
    const form = await req.formData();
    from = String(form.get('From') ?? '');
    body = String(form.get('Body') ?? '');
    const numMedia = parseInt(String(form.get('NumMedia') ?? '0'), 10);
    const mediaUrl = numMedia > 0 ? String(form.get('MediaUrl0') ?? '') : undefined;

    console.log(`[twilio] inbound from=${from} body=${JSON.stringify(body).slice(0, 200)}`);

    await handleIncoming({ from, text: body, mediaUrl });

    console.log(`[twilio] handled from=${from} in ${Date.now() - startedAt}ms`);
  } catch (err: any) {
    // Never let an exception bubble to Twilio — they'd retry and the
    // customer would see "(message failed)" in WhatsApp. Log loudly so
    // we can fix it from the Vercel function logs.
    console.error('[twilio] webhook error', {
      from,
      bodyPreview: body.slice(0, 200),
      message: err?.message,
      stack: err?.stack?.split('\n').slice(0, 5).join('\n'),
    });
  }

  // Twilio expects TwiML; we send replies via REST API ourselves.
  return new NextResponse(EMPTY_TWIML, {
    headers: { 'Content-Type': 'text/xml' },
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'kuwex-whatsapp' });
}
