'use client'

/**
 * Sanity Studio Configuration
 * 
 * This configuration is for the embedded Sanity Studio at /studio
 * Located at: src/app/studio/[[...tool]]/page.tsx
 * 
 * IMPORTANT:
 * - Uses hardcoded values from env.ts (no runtime failures)
 * - Studio is self-contained within your Next.js app
 * - No dependency on hosted *.sanity.studio
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  // Studio will be accessible at /studio
  basePath: '/studio',
  
  // Project configuration (hardcoded fallbacks ensure this never fails)
  projectId,
  dataset,
  
  // Content schema
  schema,
  
  // Studio plugins
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
