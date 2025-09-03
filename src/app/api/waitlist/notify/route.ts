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

  // Your Resend account email (the ONLY recipient allowed while unverified)
  // Change if your account email is different.
  const ACCOUNT_EMAIL = 'vem@spryntr.co';

  // Consider domain "verified mode" only if the from-address ends with your verified subdomain
  const VERIFIED_SUFFIX = '@updates.spryntr.co'; // set this to the subdomain you’ll verify in Resend
  const isVerifiedMode =
    typeof ENV_FROM === 'string' &&
    ENV_FROM.toLowerCase().includes(VERIFIED_SUFFIX);

  // Enforce Resend rules:
  // - Unverified: from must be onboarding@resend.dev, to must be your account email.
  // - Verified: from = ENV_FROM, to = user-provided.
  const SAFE_FROM = 'onboarding@resend.dev';

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

    const effectiveFrom = isVerifiedMode ? ENV_FROM! : SAFE_FROM;
    const effectiveTo = isVerifiedMode ? email : ACCOUNT_EMAIL;

    // Log exactly what we’re about to send with (helps debugging)
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
  from: effectiveFrom,
  to: effectiveTo,
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
