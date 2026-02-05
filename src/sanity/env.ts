// src/sanity/env.ts

// API version (safe default)
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Dataset (fallback to production so Studio won't crash)
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Project ID (fallback ONLY to avoid crash – still must be set in env)
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bzcgy3z9'

// -----------------------------
// Runtime validation (NO CRASH)
// -----------------------------
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.warn(
      '⚠️ Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Using fallback projectId.'
    )
  }

  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    console.warn(
      '⚠️ Warning: NEXT_PUBLIC_SANITY_DATASET is not set. Using fallback dataset "production".'
    )
  }
}

// -----------------------------
// Dev-only logs (safe)
// -----------------------------
if (process.env.NODE_ENV === 'development') {
  console.log('✅ Sanity Configuration Loaded:')
  console.log('   Project ID:', projectId)
  console.log('   Dataset:', dataset)
  console.log('   API Version:', apiVersion)
}
