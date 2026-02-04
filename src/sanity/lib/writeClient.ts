import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

/**
 * Server-side write client for Sanity
 * Uses SANITY_WRITE_TOKEN from environment variables
 * 
 * IMPORTANT: This client should NEVER be used on the client-side
 * Only use in API routes or server components
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  // Support both env names to avoid misconfiguration
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});

// Validate that write token exists
if (!(process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN) && process.env.NODE_ENV === 'production') {
  console.error('❌ SANITY write token is missing! Set SANITY_WRITE_TOKEN (recommended) or SANITY_API_WRITE_TOKEN.');
}
