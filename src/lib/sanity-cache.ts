/**
 * Sanity query caching utilities
 * Optimizes data fetching with proper cache strategies
 */

import { client } from '@/sanity/lib/client';

export type CacheStrategy = 'force-cache' | 'no-store' | 'revalidate';

interface FetchOptions {
  cache?: CacheStrategy;
  revalidate?: number;
  tags?: string[];
}

/**
 * Optimized Sanity fetch with caching
 * Use this instead of direct client.fetch for better performance
 */
export async function cachedFetch<T>(
  query: string,
  params: Record<string, any> = {},
  options: FetchOptions = {}
): Promise<T> {
  const {
    cache = 'force-cache', // Default to caching
    revalidate = 3600, // 1 hour default
    tags = [],
  } = options;

  return client.fetch<T>(query, params, {
    cache: cache === 'force-cache' ? 'force-cache' : 'no-store',
    next: cache === 'force-cache' ? { revalidate, tags } : { revalidate: 0 },
  });
}

/**
 * Build language-aware field selection (memoized pattern)
 * Use this to avoid rebuilding queries on every render
 */
export function buildLanguageField(field: string, locale: string, fallback: string = 'en'): string {
  if (locale === fallback) {
    return `${field}.${locale}`;
  }
  return `coalesce(${field}.${locale}, ${field}.${fallback})`;
}

/**
 * Common query fragments for reuse
 */
export const commonQueryFragments = {
  publishedOnly: `_type == "project" && !(_id in path("drafts.**")) && defined(slug.current)`,
  servicePublishedOnly: `_type == "service" && !(_id in path("drafts.**")) && defined(slug.current)`,
};
