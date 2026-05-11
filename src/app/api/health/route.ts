import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Health endpoint — visit /api/health in your browser to verify that
 * the deployed app can reach the database. Returns 200 + counts on
 * success, or 500 + the error message on failure.
 */
export async function GET() {
  const env = {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    messagingProvider: process.env.MESSAGING_PROVIDER ?? '(default: simulator)',
    hasTwilioSid: !!process.env.TWILIO_ACCOUNT_SID,
    hasTwilioToken: !!process.env.TWILIO_AUTH_TOKEN,
    twilioFrom: process.env.TWILIO_WHATSAPP_FROM ?? null,
    adminPhone: process.env.ADMIN_NOTIFY_PHONE ?? null,
  };

  try {
    const [customers, tickets, messages] = await Promise.all([
      prisma.customer.count(),
      prisma.ticket.count(),
      prisma.message.count(),
    ]);
    return NextResponse.json({ ok: true, env, db: { customers, tickets, messages } });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, env, error: err?.message ?? String(err) },
      { status: 500 },
    );
  }
}
