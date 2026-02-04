import { client } from './client';

export interface HomeStat {
  label: string;
  value: number;
  suffix?: string;
  order: number;
}

export interface HomeStatsData {
  title?: string;
  stats: HomeStat[];
  isActive: boolean;
}

/**
 * Fetch home stats data from Sanity
 * @returns Home stats data or null if not found or inactive
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
    }`;

    const data = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data) {
      console.warn('⚠️ Home Stats: No active home stats found in Sanity');
      return null;
    }

    // Normalize and validate data for safe rendering
    const normalized: HomeStatsData = {
      title: data.title || undefined,
      stats: Array.isArray(data.stats)
        ? data.stats
            .filter((stat: any) => stat.label && typeof stat.value === 'number')
            .map((stat: any) => ({
              label: stat.label,
              value: Math.max(0, stat.value),
              suffix: stat.suffix || '',
              order: stat.order || 0,
            }))
        : [],
      isActive: data.isActive !== false,
    };

    // Sort by order if not already sorted
    normalized.stats.sort((a, b) => (a.order || 0) - (b.order || 0));

    if (normalized.stats.length === 0) {
      console.warn('⚠️ Home Stats: No valid statistics found');
      return null;
    }

    console.log(`✅ Home Stats: Fetched ${normalized.stats.length} statistics from Sanity`);
    return normalized;
  } catch (error) {
    console.error('❌ Home Stats: Error fetching home stats from Sanity:', error);
    return null;
  }
}
