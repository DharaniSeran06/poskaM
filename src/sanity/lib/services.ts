/**
 * Shared utility functions for fetching Services from Sanity
 * Used by both Navbar and Home page to ensure consistency
 */

import { client } from './client';

export interface ServiceMenuItem {
  label: string;
  href: string;
  slug: string;
}

// Fallback services when Sanity is unavailable
const fallbackServices: ServiceMenuItem[] = [
  { label: 'Plaster casts', href: '/services/plaster-casts', slug: 'plaster-casts' },
  { label: 'Drywall', href: '/services/drywall', slug: 'drywall' },
  { label: 'Painting', href: '/services/painting', slug: 'painting' },
  { label: 'Facades and insulation', href: '/services/facades-and-insulation', slug: 'facades-and-insulation' },
  { label: 'Customer Masons', href: '/services/customer-masons', slug: 'customer-masons' },
  { label: 'Bathroom-kitchen renovation', href: '/services/bathroom-kitchen-renovation', slug: 'bathroom-kitchen-renovation' },
  { label: 'General demolition work', href: '/services/general-demolition-work', slug: 'general-demolition-work' },
];

/**
 * Fetch all published services from Sanity with language support
 * @param locale - Current locale ('en' or 'de')
 * @returns Array of service menu items
 */
export async function getServicesForMenu(locale: string): Promise<ServiceMenuItem[]> {
  // Validate locale
  const safeLocale = locale && ['en', 'de'].includes(locale) ? locale : 'en';
  
  try {
    // Build language-aware field selections
    const titleField = safeLocale === 'en' ? 'title.en' : `coalesce(title.${safeLocale}, title.en)`;

    const query = `*[
      _type == "service" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current)
    ] | order(order asc, _createdAt desc) {
      "title": ${titleField},
      "slug": slug.current
    }`;

    const services = await client.fetch(query, {}, {
      cache: 'force-cache',
      next: { revalidate: 3600, tags: ['services-menu'] }
    });

    // Return fallback if no services found
    if (!services || services.length === 0) {
      console.warn('⚠️ Services Menu: No services found in Sanity, using fallback');
      return fallbackServices;
    }

    console.log(`✅ Services Menu: Fetched ${services.length} services from Sanity (locale: ${safeLocale})`);

    // Transform to menu items format
    const menuItems: ServiceMenuItem[] = services.map((service: any) => ({
      label: service.title || 'Untitled Service',
      href: `/services/${service.slug}`,
      slug: service.slug,
    }));

    return menuItems;
  } catch (error) {
    console.error('❌ Services Menu: Error fetching services from Sanity:', error);
    // Return fallback services on error to prevent 505
    return fallbackServices;
  }
}
