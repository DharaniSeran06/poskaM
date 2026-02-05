/**
 * Sanity Client Configuration
 * 
 * Provides two clients:
 * - client: CDN-backed for fast reads (use in components)
 * - serverClient: Direct API for real-time data (use in API routes)
 */

import { createClient, type SanityClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

/**
 * Production client for public content
 * - Uses CDN for faster responses
 * - Only fetches published content (no drafts)
 * - Safe for use in client and server components
 */
export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

/**
 * Server-side client for API routes
 * - Bypasses CDN for real-time data
 * - Use this when you need the latest content
 * - Only use in API routes or server components
 */
export const serverClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})
