import { client } from './client';
import { urlFor } from './image';

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterLegalLinks {
  privacyPolicy: FooterLink;
  termsAndConditions: FooterLink;
}

export interface FooterSocialMedia {
  platform: string;
  url: string;
  icon?: string;
}

export interface FooterData {
  description: string;
  navigationLinks: FooterLink[];
  servicesLinks: FooterLink[];
  legalLinks: FooterLegalLinks;
  logo: string;
  socialMediaLinks: FooterSocialMedia[];
  copyright: string;
}

/**
 * Fetch footer data from Sanity
 * @param locale - Current locale ('en' or 'de')
 * @returns Footer data with language fallback
 */
export async function getFooterData(locale: string): Promise<FooterData | null> {
  try {
    // Build language-aware field selections with English fallback
    const descField = locale === 'en' ? 'description.en' : `coalesce(description.${locale}, description.en)`;
    const copyrightField = locale === 'en' ? 'copyright.en' : `coalesce(copyright.${locale}, copyright.en)`;
    
    // Navigation links
    const navLinksField = locale === 'en' 
      ? 'navigationLinks[] { "label": label.en, "url": url }'
      : `navigationLinks[] { "label": coalesce(label.${locale}, label.en), "url": url }`;
    
    // Services links
    const servicesLinksField = locale === 'en'
      ? 'servicesLinks[] { "label": label.en, "url": url }'
      : `servicesLinks[] { "label": coalesce(label.${locale}, label.en), "url": url }`;
    
    // Legal links
    const privacyLabelField = locale === 'en'
      ? 'legalLinks.privacyPolicy.label.en'
      : `coalesce(legalLinks.privacyPolicy.label.${locale}, legalLinks.privacyPolicy.label.en)`;
    const termsLabelField = locale === 'en'
      ? 'legalLinks.termsAndConditions.label.en'
      : `coalesce(legalLinks.termsAndConditions.label.${locale}, legalLinks.termsAndConditions.label.en)`;

    const query = `*[
      _type == "footer" &&
      !(_id in path("drafts.**"))
    ][0] {
      "description": ${descField},
      "navigationLinks": ${navLinksField},
      "servicesLinks": ${servicesLinksField},
      "legalLinks": {
        "privacyPolicy": {
          "label": ${privacyLabelField},
          "url": legalLinks.privacyPolicy.url
        },
        "termsAndConditions": {
          "label": ${termsLabelField},
          "url": legalLinks.termsAndConditions.url
        }
      },
      "logo": logo.asset->url,
      "socialMediaLinks": socialMediaLinks[] {
        platform,
        url,
        icon
      },
      "copyright": ${copyrightField}
    }`;

    const data = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data) {
      console.warn('⚠️ Footer: No published footer found in Sanity');
      return null;
    }

    // Normalize and validate data for safe rendering
    const normalized: FooterData = {
      description: data.description || '',
      navigationLinks: Array.isArray(data.navigationLinks) 
        ? data.navigationLinks.filter((link: any) => link.label && link.url)
        : [],
      servicesLinks: Array.isArray(data.servicesLinks)
        ? data.servicesLinks.filter((link: any) => link.label && link.url)
        : [],
      legalLinks: {
        privacyPolicy: {
          label: data.legalLinks?.privacyPolicy?.label || 'Privacy Policy',
          url: data.legalLinks?.privacyPolicy?.url || '/privacy',
        },
        termsAndConditions: {
          label: data.legalLinks?.termsAndConditions?.label || 'Terms & Conditions',
          url: data.legalLinks?.termsAndConditions?.url || '/terms',
        },
      },
      logo: data.logo || '/images/logo.png',
      socialMediaLinks: Array.isArray(data.socialMediaLinks)
        ? data.socialMediaLinks.filter((sm: any) => sm.platform && sm.url)
        : [],
      copyright: data.copyright || `© ${new Date().getFullYear()} All rights reserved.`,
    };

    console.log(`✅ Footer: Fetched footer data from Sanity (locale: ${locale})`);
    return normalized;
  } catch (error) {
    console.error('❌ Footer: Error fetching footer data from Sanity:', error);
    return null;
  }
}
