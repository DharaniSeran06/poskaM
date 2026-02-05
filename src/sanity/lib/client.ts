import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Production client configuration
// - useCdn: true for better performance on client-side requests
// - Draft exclusion is handled in GROQ queries using !(_id in path("drafts.**"))
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster client-side requests
  perspective: 'published', // Only fetch published content (no drafts)
})

// Server-side client for API routes (bypasses CDN for fresh data)
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Bypass CDN for real-time updates in server context
})
