import { NextResponse } from "next/server";
import { getServicesForMenu } from "@/sanity/lib/services";

// 🔥 REQUIRED: tells Next.js this route is runtime-only
export const dynamic = "force-dynamic";

// Cache API response for instant navigation - header data rarely changes
export const revalidate = 3600; // 1 hour

/**
 * Build header navigation data with Services from Sanity
 * @param locale - Current locale ('en' or 'de')
 */
async function buildHeaderData(locale: string) {
  const services = await getServicesForMenu(locale);

  return [
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
}

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";

    const headerData = await buildHeaderData(locale);

    console.log(
      `✅ Layout API: Built header data with ${
        headerData.find((item) => item.label === "Services")?.submenu?.length || 0
      } services (locale: ${locale})`
    );

    return NextResponse.json({ headerData });
  } catch (error) {
    console.error("❌ Layout API: Error building header data:", error);

    // Safe fallback
    return NextResponse.json({
      headerData: [
        { label: "Home", href: "/" },
        { label: "Services", href: "#", submenu: [] },
        {
          label: "Company",
          href: "#",
          submenu: [{ label: "About Us", href: "/about" }],
        },
        { label: "References", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ],
    });
  }
};
