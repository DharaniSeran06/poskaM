/**
 * Custom Next.js image loader for Sanity images
 * This uses Sanity's built-in image optimization to prevent Next.js timeout issues
 * 
 * Sanity CDN supports URL parameters for optimization:
 * - ?w={width} - Set image width
 * - ?q={quality} - Set quality (1-100)
 * - ?auto=format - Auto-format (webp, avif, etc.)
 * - ?fit=max - Fit mode
 */
export default function sanityImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If the image is from Sanity CDN, add optimization parameters
  if (src.includes('cdn.sanity.io')) {
    try {
      const url = new URL(src);
      
      // Add Sanity CDN optimization parameters
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', (quality || 75).toString());
      url.searchParams.set('auto', 'format'); // Auto-format (webp, avif, etc.)
      url.searchParams.set('fit', 'max'); // Fit mode
      
      return url.toString();
    } catch (error) {
      // If URL parsing fails, return original src
      console.warn('Failed to parse Sanity image URL:', src);
      return src;
    }
  }
  
  // Fallback for non-Sanity images - use Next.js default optimization
  return src;
}
