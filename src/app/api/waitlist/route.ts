// src/app/api/waitlist/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const runtime = 'nodejs';

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  try { return JSON.stringify(err); } catch { return 'Server error'; }
}

type Body = {
  first_name: string;
  last_name: string;
  email: string;
  org?: string | null;
  sector?: string | null;
  country?: string | null;
  // If you decide to include UTMs later from the client, add them here too
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Body>;

    // Validate basics
    const required: Array<keyof Body> = ['first_name', 'last_name', 'email'];
    for (const k of required) {
      if (!body?.[k] || typeof body[k] !== 'string') {
        return NextResponse.json(
          { ok: false, error: `Missing or invalid field: ${k}` },
          { status: 400 }
        );
      }
    }

    const payload = {
      first_name: body.first_name!,
      last_name: body.last_name!,
      email: body.email!,
      org: body.org ?? null,
      sector: body.sector ?? null,
      country: body.country ?? null,
    };

    // 1) Upsert the person (keeps one row per email)
    {
      const { error: upsertErr } = await supabase
        .from('waitlist_signup')
        .upsert([payload], { onConflict: 'email' });

      if (upsertErr) {
        console.error('upsert person error', upsertErr);
        return NextResponse.json({ ok: false, error: upsertErr.message }, { status: 400 });
      }
    }

    // 2) Insert an event for every submission
    const ua = req.headers.get('user-agent') ?? null;
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;

    const { error: evErr } = await supabase
      .from('waitlist_events')
      .insert([{
        email: payload.email,
        source: 'waitlist_modal',
        user_agent: ua,
        ip,
        payload // store raw fields for audit
      }]);

    if (evErr) {
      console.error('insert event error', evErr);
      // Don't fail the whole request for logging issues
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: unknown) {
    console.error('API crash:', err);
    return NextResponse.json({ ok: false, error: errorMessage(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/waitlist' });
}
