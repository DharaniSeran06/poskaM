import { NextResponse } from 'next/server'
import { getHomeStats } from '@/sanity/lib/homeStats'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await getHomeStats()
  return NextResponse.json(data)
}