import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Production client configuration
// - useCdn: false ensures real-time updates and immediate content reflection
// - Draft exclusion is handled in GROQ queries using !(_id in path("drafts.**"))
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for real-time updates and immediate content reflection
})
