// src/app/api/waitlist/route.ts
import { NextResponse } from 'next/server';
import { createClient, type PostgrestError } from '@supabase/supabase-js';

// Use server-only env vars
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Keep Node runtime (avoids Edge/env quirks)
export const runtime = 'nodejs';

// Small helper to extract a message from unknown errors
function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  try {
    return JSON.stringify(err);
  } catch {
    return 'Server error';
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<{
      first_name: string;
      last_name: string;
      email: string;
      org?: string | null;
      sector?: string | null;
      country?: string | null;
    }>;

    // Basic validation
    const required: Array<keyof typeof body> = ['first_name', 'last_name', 'email'];
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

    
const { data, error } = await supabase
  .from('waitlist_signup')
  .insert([payload])
  .select();

if (error) {
  // 23505 = unique_violation (duplicate email)
  if ((error as PostgrestError).code === '23505') {
    // Idempotent behavior: user is already on the waitlist → return 200 OK
    return NextResponse.json(
      { ok: true, alreadyOnWaitlist: true },
      { status: 200 }
    );
  }

  console.error('Supabase insert error:', error);
  return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
}

return NextResponse.json({ ok: true, data }, { status: 201 });

  } catch (err: unknown) {
    console.error('API crash:', err);
    return NextResponse.json(
      { ok: false, error: errorMessage(err) },
      { status: 500 }
    );
  }
}

// Optional health check
export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/waitlist' });
}
