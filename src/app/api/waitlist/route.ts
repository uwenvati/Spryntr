import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// Use Node runtime for server secrets (safer for service role)
export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ ok: true, message: 'Waitlist API is live' }, { status: 200 });
}

type Body = {
  org_name: string;
  contact_name?: string;
  email: string;
  role?: string;
  website?: string;
  industry?: string;
  size?: string;
  use_case?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;

  // anti-spam helpers
  company?: string; // honeypot (must be empty)
  t?: number;       // client timestamp to detect super-fast bots
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export async function POST(req: Request) {
  try {
    const ua = req.headers.get('user-agent') ?? '';
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 
      req.headers.get('x-real-ip') ?? '';

    const body = (await req.json()) as Body;

    // Validate
    if (!body?.org_name || !body?.email) {
      return NextResponse.json({ error: 'org_name and email are required' }, { status: 400 });
    }
    if (!EMAIL_RE.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Anti-spam: honeypot must be empty
    if (typeof body.company === 'string' && body.company.trim() !== '') {
      return NextResponse.json({ ok: true, redirect: process.env.DISCORD_INVITE_URL });
    }
    // Anti-spam: basic fill-time check (>=2s)
    const now = Date.now();
    if (typeof body.t === 'number' && now - body.t < 2000) {
      return NextResponse.json({ ok: true, redirect: process.env.DISCORD_INVITE_URL });
    }

    const { error } = await supabaseAdmin.from('waitlist_signups').insert({
      org_name: body.org_name,
      contact_name: body.contact_name ?? null,
      email: body.email,
      role: body.role ?? null,
      website: body.website ?? null,
      industry: body.industry ?? null,
      size: body.size ?? null,
      use_case: body.use_case ?? null,
      source: body.source ?? null,
      utm_source: body.utm_source ?? null,
      utm_medium: body.utm_medium ?? null,
      utm_campaign: body.utm_campaign ?? null,
      utm_term: body.utm_term ?? null,
      utm_content: body.utm_content ?? null,
      ip,
      user_agent: ua,
      discord_redirected: true,
    });

    if (error) throw error;

    return NextResponse.json({ ok: true, redirect: process.env.DISCORD_INVITE_URL });
  } catch (e: unknown) {
    const msg =
      e instanceof Error ? e.message : typeof e === 'string' ? e : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
