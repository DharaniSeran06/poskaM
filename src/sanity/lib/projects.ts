/**
 * Normalize architecturePlanning field for backward compatibility
 * Handles both old format (string) and new format (object with title/url)
 */
export function normalizeArchitecturePlanning(
  data: any,
  locale: string
): { title: string; url: string } | null {
  if (!data) return null;

  const localeData = data[locale] || data.en || data;

  // New format: object with title and url
  if (typeof localeData === 'object' && localeData !== null) {
    if (localeData.title && localeData.url) {
      return {
        title: localeData.title,
        url: localeData.url,
      };
    }
    // Fallback: try English if current locale doesn't have data
    if (locale !== 'en' && data.en) {
      if (data.en.title && data.en.url) {
        return {
          title: data.en.title,
          url: data.en.url,
        };
      }
    }
  }

  // Old format: plain string (backward compatibility)
  if (typeof localeData === 'string' && localeData.trim() !== '') {
    return {
      title: localeData,
      url: '#', // No URL in old format
    };
  }

  return null;
}
