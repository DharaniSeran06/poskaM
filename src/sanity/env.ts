export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Use safe defaults that won't crash the build
// These must be set in production environment variables
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bzcgy3z9'

// Validate at runtime only, log warnings instead of throwing
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.warn('⚠️ Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set, using fallback')
  }
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    console.warn('⚠️ Warning: NEXT_PUBLIC_SANITY_DATASET is not set, using fallback')
  }
}

// Log configuration in development (not in production)
if (process.env.NODE_ENV === 'development') {
  console.log('✅ Sanity Configuration:')
  console.log(`   Project ID: ${projectId}`)
  console.log(`   Dataset: ${dataset}`)
  console.log(`   API Version: ${apiVersion}`)
}
