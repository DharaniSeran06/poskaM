/**
 * Helper function to create language-aware field selection with English fallback
 * @param fieldName - The field name in Sanity schema
 * @param locale - Current locale ('en' or 'de')
 * @returns GROQ field selection string with fallback
 * 
 * Example:
 * localeField('title', 'de') returns: 'coalesce(title.de, title.en)'
 */
export function localeField(fieldName: string, locale: string): string {
  if (locale === 'en') {
    return fieldName;
  }
  // For German (or any other language), fallback to English
  return `coalesce(${fieldName}.${locale}, ${fieldName}.en)`;
}

/**
 * Helper function to create language-aware object field selection
 * @param fieldName - The field name in Sanity schema
 * @param locale - Current locale ('en' or 'de')
 * @returns GROQ field selection string with fallback
 * 
 * Example:
 * localeObjectField('property_title', 'de') returns: 'coalesce(property_title.de, property_title.en)'
 */
export function localeObjectField(fieldName: string, locale: string): string {
  if (locale === 'en') {
    return `${fieldName}.en`;
  }
  return `coalesce(${fieldName}.${locale}, ${fieldName}.en)`;
}

/**
 * Helper function to create language-aware array field selection
 * @param fieldName - The field name in Sanity schema
 * @param locale - Current locale ('en' or 'de')
 * @returns GROQ field selection string with fallback
 * 
 * Example:
 * localeArrayField('works', 'de') returns: 'coalesce(works.de, works.en)'
 */
export function localeArrayField(fieldName: string, locale: string): string {
  if (locale === 'en') {
    return `${fieldName}.en`;
  }
  return `coalesce(${fieldName}.${locale}, ${fieldName}.en)`;
}
