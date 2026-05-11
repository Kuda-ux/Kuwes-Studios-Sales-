import { NextResponse } from 'next/server';
import { handleIncoming } from '@/bot/engine';

/**
 * Twilio WhatsApp webhook.
 *
 * Configure in Twilio console → WhatsApp Sandbox / Sender:
 *   "When a message comes in" → POST → https://YOUR-DOMAIN/api/twilio/webhook
 *
 * Twilio posts application/x-www-form-urlencoded.
 */
export async function POST(req: Request) {
  const form = await req.formData();
  const from = String(form.get('From') ?? '');
  const body = String(form.get('Body') ?? '');
  const numMedia = parseInt(String(form.get('NumMedia') ?? '0'), 10);
  const mediaUrl = numMedia > 0 ? String(form.get('MediaUrl0') ?? '') : undefined;

  await handleIncoming({ from, text: body, mediaUrl });

  // Twilio expects an empty TwiML response (we send replies via REST API ourselves).
  return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response/>', {
    headers: { 'Content-Type': 'text/xml' },
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'kuwex-whatsapp' });
}
