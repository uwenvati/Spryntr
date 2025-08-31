import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const hasUrl = !!process.env.SUPABASE_URL;
  const hasServiceRole = !!process.env.SUPABASE_SERVICE_ROLE;
  const hasDiscord = !!process.env.DISCORD_INVITE_URL;
  const hasAdminKey = !!process.env.ADMIN_ACCESS_KEY;

  return NextResponse.json({
    ok: true,
    runtime: 'nodejs',
    env: {
      SUPABASE_URL: hasUrl,
      SUPABASE_SERVICE_ROLE: hasServiceRole,
      DISCORD_INVITE_URL: hasDiscord,
      ADMIN_ACCESS_KEY: hasAdminKey,
    }
  });
}
