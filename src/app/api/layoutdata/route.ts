import { NextResponse } from "next/server";
import { getServicesForMenu } from '@/sanity/lib/services';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data

/**
 * Build header navigation data with Services from Sanity
 * @param locale - Current locale ('en' or 'de')
 */
async function buildHeaderData(locale: string) {
  // Fetch services from Sanity
  const services = await getServicesForMenu(locale);

  // Build header data structure
  const headerData = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "#",
      submenu: services.map((service) => ({
        label: service.label,
        href: service.href,
      })),
    },
    {
      label: "Company",
      href: "#",
      submenu: [
        { label: "About Us", href: "/about" },
        { label: "Vacancies", href: "/vacancies" },
      ],
    },
        { label: "References", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return headerData;
}

export const GET = async (request: Request) => {
  try {
    // Get locale from query parameter or default to 'en'
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const headerData = await buildHeaderData(locale);

    console.log(`✅ Layout API: Built header data with ${headerData.find(item => item.label === 'Services')?.submenu?.length || 0} services (locale: ${locale})`);

    return NextResponse.json({
      headerData
    });
  } catch (error) {
    console.error('❌ Layout API: Error building header data:', error);
    // Return fallback data on error
    return NextResponse.json({
      headerData: [
        { label: "Home", href: "/" },
        { label: "Services", href: "#", submenu: [] },
        { label: "Company", href: "#", submenu: [{ label: "About Us", href: "/about" }] },
        { label: "References", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ]
    });
  }
};

