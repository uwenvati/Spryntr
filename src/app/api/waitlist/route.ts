// app/api/waitlist/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ✅ Use the *server-only* env vars you already set in .env.local
const supabase = createClient(
  process.env.SUPABASE_URL!,               // not NEXT_PUBLIC_*
  process.env.SUPABASE_SERVICE_ROLE_KEY!   // service role (server only)
);

// Optional: force Node runtime (safer with server envs)
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const required = ['first_name', 'last_name', 'email'];
    for (const k of required) {
      if (!body?.[k] || typeof body[k] !== 'string') {
        return NextResponse.json({ ok: false, error: `Missing or invalid field: ${k}` }, { status: 400 });
      }
    }

    const payload = {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      org: body.org ?? null,
      sector: body.sector ?? null,
      country: body.country ?? null,
    };

    const { data, error } = await supabase
      .from('waitlist_signup')
      .insert([payload])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      const status = (error as any).code === '23505' ? 409 : 400;
      return NextResponse.json({ ok: false, error: error.message }, { status });
    }

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (err: any) {
    console.error('API crash:', err);
    return NextResponse.json({ ok: false, error: err?.message ?? 'Server error' }, { status: 500 });
  }
}

// (Optional) tiny GET for a quick health check in your browser
export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/waitlist' });
}
