import { client } from './client';

export interface ContactPageData {
  title: string;
  description: string;
  officeAddress: string;
  phoneNumber: string;
  emailAddress: string;
  googleMapsEmbed?: string;
  googleMapsCoordinates?: {
    latitude?: number;
    longitude?: number;
  };
  businessHours?: {
    mondayFriday?: string;
    saturday?: string;
    sunday?: string;
  };
  formSuccessMessage: string;
  metaDescription?: string;
}

/**
 * Fetch contact page data from Sanity
 * @param locale - Current locale ('en' or 'de')
 * @returns Contact page data with language fallback
 */
export async function getContactPageData(locale: string): Promise<ContactPageData | null> {
  try {
    // Build language-aware field selections with English fallback
    const titleField = locale === 'en' ? 'title.en' : `coalesce(title.${locale}, title.en)`;
    const descField = locale === 'en' ? 'description.en' : `coalesce(description.${locale}, description.en)`;
    const addressField = locale === 'en' ? 'officeAddress.en' : `coalesce(officeAddress.${locale}, officeAddress.en)`;
    const successMsgField = locale === 'en' ? 'formSuccessMessage.en' : `coalesce(formSuccessMessage.${locale}, formSuccessMessage.en)`;
    const metaDescField = locale === 'en' ? 'metaDescription.en' : `coalesce(metaDescription.${locale}, metaDescription.en)`;
    
    // Business hours structure
    const hoursMondayFriday = locale === 'en' 
      ? 'businessHours.en.mondayFriday' 
      : `coalesce(businessHours.${locale}.mondayFriday, businessHours.en.mondayFriday)`;
    const hoursSaturday = locale === 'en' 
      ? 'businessHours.en.saturday' 
      : `coalesce(businessHours.${locale}.saturday, businessHours.en.saturday)`;
    const hoursSunday = locale === 'en' 
      ? 'businessHours.en.sunday' 
      : `coalesce(businessHours.${locale}.sunday, businessHours.en.sunday)`;

    const query = `*[
      _type == "contactPage" &&
      !(_id in path("drafts.**"))
    ][0] {
      "title": ${titleField},
      "description": ${descField},
      "officeAddress": ${addressField},
      phoneNumber,
      emailAddress,
      googleMapsEmbed,
      googleMapsCoordinates,
      "businessHours": {
        "mondayFriday": ${hoursMondayFriday},
        "saturday": ${hoursSaturday},
        "sunday": ${hoursSunday}
      },
      "formSuccessMessage": ${successMsgField},
      "metaDescription": ${metaDescField}
    }`;

    const data = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data) {
      console.warn('[Contact] No published contact page found in Sanity');
      return null;
    }
    
    // Sanitize googleMapsEmbed - remove any problematic characters
    let sanitizedEmbed = data.googleMapsEmbed;
    if (sanitizedEmbed && typeof sanitizedEmbed === 'string') {
      // Keep only the src URL if it's an iframe
      const srcMatch = sanitizedEmbed.match(/src="([^"]+)"/);
      if (srcMatch) {
        sanitizedEmbed = srcMatch[1];
      }
    }

    // Normalize and validate data for safe rendering
    const normalized: ContactPageData = {
      title: data.title || 'Contact Us',
      description: data.description || '',
      officeAddress: data.officeAddress || '',
      phoneNumber: data.phoneNumber || '',
      emailAddress: data.emailAddress || '',
      formSuccessMessage: data.formSuccessMessage || 'Thank you! Your message has been sent successfully.',
      ...(sanitizedEmbed && { googleMapsEmbed: sanitizedEmbed }),
      ...(data.googleMapsCoordinates && { googleMapsCoordinates: data.googleMapsCoordinates }),
      ...(data.businessHours && {
        businessHours: {
          ...(data.businessHours.mondayFriday && { mondayFriday: data.businessHours.mondayFriday }),
          ...(data.businessHours.saturday && { saturday: data.businessHours.saturday }),
          ...(data.businessHours.sunday && { sunday: data.businessHours.sunday }),
        }
      }),
      ...(data.metaDescription && { metaDescription: data.metaDescription }),
    };

    console.log(`[Contact] Fetched contact page data (locale: ${locale})`);
    return normalized;
  } catch (error) {
    console.error('[Contact] Error fetching contact page data:', error);
    return null;
  }
}
