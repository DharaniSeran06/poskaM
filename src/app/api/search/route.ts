import { NextResponse } from "next/server";
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const locale = searchParams.get('locale') || 'en';

    if (!query.trim()) {
      return NextResponse.json({ results: [] });
    }

    const results: any[] = [];

    // Search References
    const titleField = locale === 'en' ? 'property_title.en' : `coalesce(property_title.${locale}, property_title.en)`;
    const locationField = locale === 'en' ? 'location.en' : `coalesce(location.${locale}, location.en)`;
    const categoryField = locale === 'en' ? 'category.en' : `coalesce(category.${locale}, category.en)`;

    const projectsQuery = `*[
      _type == "project" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current) &&
      (
        property_title.en match $query ||
        property_title.de match $query ||
        propertyId match $query ||
        category.en match $query ||
        category.de match $query ||
        location.en match $query ||
        location.de match $query
      )
    ] | order(_createdAt desc) [0...10] {
      _id,
      propertyId,
      "property_title": ${titleField},
      "category": ${categoryField},
      "location": ${locationField},
      "image": coalesce(thumbnail.asset->url, ""),
      "slug": slug.current
    }`;

    const searchPattern = `*${query}*`;
    
    // Type assertion needed because query string uses template literals
    // which prevents TypeScript from inferring parameter types
    const projects = await client.fetch<any[]>(
      projectsQuery,
      { query: searchPattern } as any
    );

    projects.forEach((project: any) => {
      results.push({
        type: 'project',
        id: project._id,
        title: project.property_title || 'Untitled Reference',
        description: project.location || project.category || undefined,
        image: project.image,
        slug: project.slug,
        href: `/projects/${project.slug}`,
      });
    });

    // Search Services
    const serviceTitleField = locale === 'en' ? 'title.en' : `coalesce(title.${locale}, title.en)`;
    const serviceShortDescField = locale === 'en' ? 'shortDescription.en' : `coalesce(shortDescription.${locale}, shortDescription.en)`;
    const serviceDescField = locale === 'en' ? 'description.en' : `coalesce(description.${locale}, description.en)`;
    const serviceCategoryField = locale === 'en' ? 'category.en' : `coalesce(category.${locale}, category.en)`;

    const servicesQuery = `*[
      _type == "service" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current) &&
      (
        title.en match $query ||
        title.de match $query ||
        shortDescription.en match $query ||
        shortDescription.de match $query ||
        description.en match $query ||
        description.de match $query ||
        category.en match $query ||
        category.de match $query
      )
    ] | order(order asc, _createdAt desc) [0...10] {
      _id,
      "title": ${serviceTitleField},
      "shortDescription": ${serviceShortDescField},
      "description": ${serviceDescField},
      "thumbnail": coalesce(thumbnail.asset->url, ""),
      "slug": slug.current
    }`;

    const services = await client.fetch<any[]>(
      servicesQuery,
      { query: searchPattern } as any
    );

    services.forEach((service: any) => {
      results.push({
        type: 'service',
        id: service._id,
        title: service.title || 'Untitled Service',
        description: service.shortDescription || service.description?.substring(0, 150),
        image: service.thumbnail,
        slug: service.slug,
        href: `/services/${service.slug}`,
      });
    });

    // Search Pages (static pages)
    const staticPages = [
      { title: 'Home', href: '/', description: 'Welcome to POSKA MANOLITO AG' },
      { title: 'About Us', href: '/about', description: 'Learn about our company' },
      { title: 'References', href: '/projects', description: 'View our completed references' },
      { title: 'Services', href: '/services', description: 'Explore our services' },
      { title: 'Contact', href: '/contact', description: 'Get in touch with us' },
    ];

    staticPages.forEach((page) => {
      if (
        page.title.toLowerCase().includes(query.toLowerCase()) ||
        page.description.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push({
          type: 'page',
          id: page.href,
          title: page.title,
          description: page.description,
          slug: page.href,
          href: page.href,
        });
      }
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
};
