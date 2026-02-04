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

/**
 * Fetch all published services from Sanity with language support
 * @param locale - Current locale ('en' or 'de')
 * @returns Array of service menu items
 */
export async function getServicesForMenu(locale: string): Promise<ServiceMenuItem[]> {
  try {
    // Build language-aware field selections
    const titleField = locale === 'en' ? 'title.en' : `coalesce(title.${locale}, title.en)`;

    const query = `*[
      _type == "service" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current)
    ] | order(order asc, _createdAt desc) {
      "title": ${titleField},
      "slug": slug.current
    }`;

    const services = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    console.log(`✅ Services Menu: Fetched ${services.length} services from Sanity (locale: ${locale})`);

    // Transform to menu items format
    const menuItems: ServiceMenuItem[] = services.map((service: any) => ({
      label: service.title || 'Untitled Service',
      href: `/services/${service.slug}`,
      slug: service.slug,
    }));

    return menuItems;
  } catch (error) {
    console.error('❌ Services Menu: Error fetching services from Sanity:', error);
    return [];
  }
}
