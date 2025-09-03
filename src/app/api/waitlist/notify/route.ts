// app/api/waitlist/notify/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';
import WelcomeEmail from '../../../../../emails/welcome';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const now = new Date().toISOString();
  console.log('[notify] route hit at', now);

  // ---- CONFIG / FALLBACKS ----
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const ENV_FROM = process.env.FROM_EMAIL;            // e.g., "Spryntr <no-reply@updates.spryntr.co>"
  const REPLY_TO = process.env.REPLY_TO || 'vem@spryntr.co';
  const DISCORD_INVITE_URL = process.env.DISCORD_INVITE_URL;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

 

  try {
    const body = await req.json();
    const { email, first_name } = body || {};

    // basic validate
    if (!email) {
      return NextResponse.json(
        { ok: false, stage: 'validate', error: 'email required' },
        { status: 400 }
      );
    }

 
    const info = {
      hasKey: !!RESEND_API_KEY,
      isVerifiedMode,
      from: effectiveFrom,
      to: effectiveTo,
      replyTo: REPLY_TO,
      site: SITE_URL,
      discordInvite: DISCORD_INVITE_URL,
      note: isVerifiedMode
        ? 'Verified mode → real recipient'
        : 'UNVERIFIED mode → forcing onboarding@resend.dev → sending only to your account email',
    };
    console.log('[notify] send info', info);

    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, stage: 'config', error: 'RESEND_API_KEY missing', info },
        { status: 500 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

   const send = await resend.emails.send({
  from: "vem@spryntr.co",
  to: email,
  subject: 'Thanks for joining!',
  replyTo: REPLY_TO, // <-- camelCase
  react: React.createElement(WelcomeEmail, {
    firstName: first_name || 'there',
    discordInviteUrl: DISCORD_INVITE_URL,
    siteUrl: SITE_URL,
  }),
});


    if ((send as any)?.error) {
      console.error('[notify] provider error:', (send as any).error);
      // Return 200 with a flag so the UI doesn’t hard fail while you’re testing
      return NextResponse.json(
        { ok: false, stage: 'provider', providerError: (send as any).error, info },
        { status: 200 }
      );
    }

    const id = (send as any)?.data?.id || (send as any)?.id || null;
    console.log('[notify] sent ok id=', id);
    return NextResponse.json({ ok: true, id, info }, { status: 200 });
  } catch (e: any) {
    console.error('[notify] threw:', e);
    return NextResponse.json(
      { ok: false, stage: 'server', error: e?.message || String(e) },
      { status: 500 }
    );
  }
}
