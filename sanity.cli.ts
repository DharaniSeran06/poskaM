/**
 * Sanity CLI Configuration
 * 
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 * 
 * Uses the same env.ts for consistent configuration across the project.
 */
import { defineCliConfig } from 'sanity/cli'
import { projectId, dataset } from './src/sanity/env'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
