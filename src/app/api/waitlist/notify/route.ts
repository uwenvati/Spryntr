// app/api/waitlist/notify/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';
import WelcomeEmail from '../../../../../emails/welcome';

export const runtime = 'nodejs';

// Minimal type for Resend's send() result (v3-style)
type ResendSendResult = {
  data: { id: string } | null;
  error: { name?: string; message: string } | null;
};

export async function POST(req: Request) {
  const now = new Date().toISOString();
  console.log('[notify] route hit at', now);

  // ---- CONFIG / ENVS ----
  const RESEND_API_KEY = process.env.RESEND_API_KEY; // required (server-only)
  const ENV_FROM = process.env.FROM_EMAIL;           // e.g. "Spryntr <no-reply@updates.spryntr.co>"
  const REPLY_TO: string = process.env.REPLY_TO || 'vem@spryntr.co';
  const ACCOUNT_EMAIL = process.env.ACCOUNT_EMAIL || 'vem@spryntr.co'; // used in test mode
  const DISCORD_INVITE_URL = process.env.DISCORD_INVITE_URL;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  try {
    // ---- INPUT ----
    // If body is empty/invalid JSON, fall back to empty object
    const body: unknown = await req.json().catch(() => ({}));
    const { email, first_name } = (body as { email?: string; first_name?: string });

    // ---- BASIC VALIDATION ----
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { ok: false, stage: 'validate', error: 'email required' },
        { status: 400 }
      );
    }

    // ---- DERIVED FLAGS / ADDRESSES ----
    // Consider "verified mode" when FROM is set and not a @resend.dev sandbox sender.
    const isVerifiedMode = Boolean(ENV_FROM && !ENV_FROM.includes('@resend.dev'));

    // Use your verified domain as-from when available; otherwise fall back to Resend sandbox sender.
    const effectiveFrom = isVerifiedMode
      ? (ENV_FROM as string) // e.g., "Spryntr <no-reply@updates.spryntr.co>"
      : 'Acme <onboarding@resend.dev>'; // sandbox sender for local/test

    // In verified mode, send to real recipient; otherwise only to your account email.
    const targetEmail = String(email).trim().toLowerCase();
    const effectiveTo = isVerifiedMode ? targetEmail : ACCOUNT_EMAIL;

    // ---- INFO (for logs / debugging; no secrets) ----
    const info = {
      hasKey: Boolean(RESEND_API_KEY),
      isVerifiedMode,
      from: effectiveFrom,
      to: effectiveTo,
      replyTo: REPLY_TO,
      site: SITE_URL,
      discordInvite: DISCORD_INVITE_URL,
      note: isVerifiedMode
        ? 'Verified mode → sending to real recipient'
        : 'UNVERIFIED mode → sandbox from; delivering only to your account email',
    };
    console.log('[notify] send info', info);

    // ---- SAFETY CHECKS ----
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, stage: 'config', error: 'RESEND_API_KEY missing', info },
        { status: 500 }
      );
    }
    if (isVerifiedMode && !ENV_FROM) {
      return NextResponse.json(
        { ok: false, stage: 'config', error: 'FROM_EMAIL not set', info },
        { status: 500 }
      );
    }

    // ---- SEND EMAIL VIA RESEND ----
    const resend = new Resend(RESEND_API_KEY);

    const send: ResendSendResult = await resend.emails.send({
      from: effectiveFrom,
      to: [effectiveTo], // string or string[] are both accepted
      subject: 'Thanks for joining!',
      replyTo: REPLY_TO, // camelCase to match your SDK's CreateEmailOptions
      react: React.createElement(WelcomeEmail, {
        firstName: first_name || 'there',
        discordInviteUrl: DISCORD_INVITE_URL,
        siteUrl: SITE_URL,
      }),
    }) as ResendSendResult;

    // ---- HANDLE PROVIDER RESPONSE ----
    if (send.error) {
      console.error('[notify] provider error:', send.error);
      // Return 200 so the UI doesn't hard fail while testing; you can change to 502 if you prefer
      return NextResponse.json(
        { ok: false, stage: 'provider', providerError: send.error, info },
        { status: 200 }
      );
    }

    const id = send.data?.id ?? null;
    console.log('[notify] sent ok id=', id);

    return NextResponse.json({ ok: true, id, info }, { status: 200 });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : typeof e === 'string' ? e : 'Unknown error';
    console.error('[notify] threw:', message);
    return NextResponse.json(
      { ok: false, stage: 'server', error: message },
      { status: 500 }
    );
  }
}
