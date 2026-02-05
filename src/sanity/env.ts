/**
 * Sanity Environment Configuration
 * 
 * This file handles Sanity environment variables with safe fallbacks.
 * - Works in development, production, and Sanity hosted studio
 * - Never crashes if env vars are missing (uses fallbacks)
 * - Logs warnings in production if env vars are not set
 */

// ==========================================
// CONFIGURATION VALUES WITH SAFE FALLBACKS
// ==========================================

/**
 * Sanity Project ID
 * Set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment
 */
export const projectId: string = 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bzcgy3z9';

/**
 * Sanity Dataset
 * Set NEXT_PUBLIC_SANITY_DATASET in your environment
 */
export const dataset: string = 
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

/**
 * Sanity API Version
 * Set NEXT_PUBLIC_SANITY_API_VERSION in your environment
 * Uses a stable past date to avoid API version issues
 */
export const apiVersion: string = 
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// ==========================================
// VALIDATION (warnings only, no crashes)
// ==========================================

// Only run validation on server-side in production
const isServer = typeof window === 'undefined';
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

if (isServer && isProduction) {
  // Warn if environment variables are not explicitly set
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.warn(
      '⚠️ [Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID not set. Using fallback: bzcgy3z9'
    );
  }
  
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    console.warn(
      '⚠️ [Sanity] NEXT_PUBLIC_SANITY_DATASET not set. Using fallback: production'
    );
  }
}

// Development logging
if (isDevelopment && isServer) {
  console.log('✅ Sanity Configuration:');
  console.log(`   Project ID: ${projectId}`);
  console.log(`   Dataset: ${dataset}`);
  console.log(`   API Version: ${apiVersion}`);
}

// ==========================================
// TYPE EXPORTS
// ==========================================

export type SanityConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
};

export const sanityConfig: SanityConfig = {
  projectId,
  dataset,
  apiVersion,
};
