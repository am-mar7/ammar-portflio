import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        {
          status: 'error',
          error: 'Supabase client is not initialized. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    // Perform a lightweight query to keep the Supabase database and REST API active
    const { data, error } = await supabase
      .from('projects')
      .select('id, title')
      .limit(1);

    if (error) {
      console.error('[Supabase Keep-Alive] Error:', error.message);
      return NextResponse.json(
        {
          status: 'error',
          error: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Supabase heartbeat successful — database active',
      timestamp: new Date().toISOString(),
      rows_checked: data?.length ?? 0,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    console.error('[Supabase Keep-Alive] Exception:', message);
    return NextResponse.json(
      {
        status: 'error',
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
