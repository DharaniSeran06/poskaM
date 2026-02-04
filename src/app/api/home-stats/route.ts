import { NextResponse } from 'next/server';
import { getHomeStats } from '@/sanity/lib/homeStats';

/**
 * API route to fetch home stats data
 * Used by client components that need home stats
 */
export async function GET() {
  try {
    const homeStats = await getHomeStats();
    
    return NextResponse.json(homeStats, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching home stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch home stats' },
      { status: 500 }
    );
  }
}
