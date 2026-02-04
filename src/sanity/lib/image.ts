import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

/**
 * Get optimized image URL from Sanity with width and quality parameters
 * This helps prevent Next.js image optimization timeouts by using Sanity's CDN optimization
 */
export const urlForImage = (
  source: SanityImageSource,
  width?: number,
  quality: number = 75
) => {
  let image = builder.image(source)
  
  if (width) {
    image = image.width(width)
  }
  
  return image.quality(quality).url()
}
