/**
 * Sanity Environment Configuration
 * 
 * IMPORTANT: This file uses HARDCODED values as primary configuration.
 * Environment variables are optional overrides for flexibility.
 * 
 * This ensures:
 * - No runtime crashes if env vars are missing
 * - Works in development, production, and Vercel
 * - Studio at /studio works without external dependencies
 */

// ==========================================
// HARDCODED PRIMARY VALUES (NEVER FAIL)
// ==========================================

// Your Sanity project configuration
const SANITY_PROJECT_ID = 'bzcgy3z9';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

// ==========================================
// EXPORTS (with optional env var overrides)
// ==========================================

/**
 * Sanity Project ID
 * Primary: hardcoded value
 * Override: NEXT_PUBLIC_SANITY_PROJECT_ID env var
 */
export const projectId: string = 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || SANITY_PROJECT_ID;

/**
 * Sanity Dataset
 * Primary: hardcoded value
 * Override: NEXT_PUBLIC_SANITY_DATASET env var
 */
export const dataset: string = 
  process.env.NEXT_PUBLIC_SANITY_DATASET || SANITY_DATASET;

/**
 * Sanity API Version
 * Primary: hardcoded value (stable past date)
 * Override: NEXT_PUBLIC_SANITY_API_VERSION env var
 */
export const apiVersion: string = 
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || SANITY_API_VERSION;

// ==========================================
// DEVELOPMENT LOGGING (optional)
// ==========================================

if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
  console.log('✅ Sanity Config:', { projectId, dataset, apiVersion });
}
