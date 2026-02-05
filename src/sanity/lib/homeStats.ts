import 'server-only'
import { client } from './client'

export interface HomeStat {
  label: string
  value: number
  suffix?: string
  order: number
}

export interface HomeStatsData {
  title?: string
  stats: HomeStat[]
  isActive: boolean
}

/**
 * Fetch home stats data from Sanity
 * Runs ONLY on the server at runtime (not build time)
 */
export async function getHomeStats(): Promise<HomeStatsData | null> {
  try {
    const query = `*[
      _type == "homeStats" &&
      !(_id in path("drafts.**")) &&
      isActive == true
    ][0] {
      title,
      "stats": stats[] | order(order asc) {
        label,
        value,
        suffix,
        order
      },
      isActive
    }`

    const data = await client.fetch(query)

    if (!data) {
      console.warn('⚠️ HomeStats: No active data found in Sanity')
      return null
    }

    const normalized: HomeStatsData = {
      title: data.title || undefined,
      stats: Array.isArray(data.stats)
        ? data.stats
            .filter(
              (stat: any) =>
                typeof stat.label === 'string' &&
                typeof stat.value === 'number'
            )
            .map((stat: any) => ({
              label: stat.label,
              value: Math.max(0, stat.value),
              suffix: stat.suffix || undefined,
              order: stat.order ?? 0,
            }))
        : [],
      isActive: data.isActive !== false,
    }

    normalized.stats.sort((a, b) => a.order - b.order)

    if (normalized.stats.length === 0) {
      console.warn('⚠️ HomeStats: Stats array is empty after normalization')
      return null
    }

    console.log(
      `✅ HomeStats: Fetched ${normalized.stats.length} stats from Sanity`
    )

    return normalized
  } catch (error) {
    console.error('❌ HomeStats: Failed to fetch data from Sanity', error)
    return null
  }
}
