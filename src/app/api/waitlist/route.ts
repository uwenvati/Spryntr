// src/app/api/waitlist/route.ts
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'; // ⬅️ make sure this line exists

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
  company?: string;
  t?: number;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    // QUICK: allow a diag run without validating the whole form
    const diag = typeof (body as any)._diag === 'string' ? (body as any)._diag : null;

    // Validate (skip if diag)
    if (!diag) {
      if (!body?.org_name || !body?.email) {
        return NextResponse.json({ error: 'org_name and email are required' }, { status: 400 });
      }
      if (!EMAIL_RE.test(body.email)) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
      }
      if (typeof body.company === 'string' && body.company.trim() !== '') {
        return NextResponse.json({ ok: true, redirect: process.env.DISCORD_INVITE_URL });
      }
      const now = Date.now();
      if (typeof body.t === 'number' && now - body.t < 2000) {
        return NextResponse.json({ ok: true, redirect: process.env.DISCORD_INVITE_URL });
      }
    }

    // Build client at runtime
    const supabaseAdmin = getSupabaseAdmin();

    if (diag === 'ping') {
      // does the table exist / is RLS blocking basic read?
      const { error, count } = await supabaseAdmin
        .from('waitlist_signups')
        .select('id', { count: 'exact', head: true });

      return NextResponse.json({
        ok: !error,
        diag: 'ping',
        tableExists: !error || !String(error.message).includes('relation') ? true : false,
        countKnown: typeof count === 'number' ? count : null,
        supaError: error ? { message: error.message, code: (error as any).code, details: (error as any).details } : null,
      });
    }

    if (diag === 'insert') {
      // try a minimal insert
      const { error } = await supabaseAdmin.from('waitlist_signups').insert({
        org_name: 'DIAG_ORG',
        email: 'diag@example.com',
      });
      return NextResponse.json({
        ok: !error,
        diag: 'insert',
        supaError: error ? { message: error.message, code: (error as any).code, details: (error as any).details } : null,
      });
    }

    // Normal path
    const ua = req.headers.get('user-agent') ?? '';
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ?? '';

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
    // TEMP: return full error info so we can see exactly what broke
    const err = e as any;
    return NextResponse.json(
      {
        error: err?.message || 'Unknown error',
        code: err?.code ?? null,
        details: err?.details ?? null,
      },
      { status: 500 }
    );
  }
}
