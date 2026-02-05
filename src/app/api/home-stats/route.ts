import { NextResponse } from 'next/server'
import { getHomeStats } from '@/sanity/lib/homeStats'

// Cache home stats for instant page loads
export const revalidate = 3600

export async function GET() {
  const data = await getHomeStats()
  return NextResponse.json(data)
}