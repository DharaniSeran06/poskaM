import React from 'react';
import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import Testimonials from './index';

// Fetch testimonials from Sanity with language support
async function getTestimonials(locale: string) {
  try {
    // Build language-aware field selections
    const contentField = locale === 'en' ? 'content.en' : `coalesce(content.${locale}, content.en)`;

    const query = `*[
      _type == "testimonial" &&
      !(_id in path("drafts.**"))
    ] | order(featured desc, order asc, _createdAt desc) {
      _id,
      "name": clientName,
      "role": clientRole,
      "content": ${contentField},
      "image": coalesce(clientImage.asset->url, ""),
      "rating": coalesce(rating, 5),
      featured,
      order
    }`;

    const testimonials = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    console.log(`✅ Testimonials: Fetched ${testimonials.length} testimonials from Sanity (locale: ${locale})`);
    console.log('📋 Testimonials data:', testimonials);
    return testimonials || [];
  } catch (error) {
    console.error('❌ Testimonials: Error fetching testimonials from Sanity:', error);
    return [];
  }
}

export default async function TestimonialsWrapper({ locale }: { locale: string }) {
  const testimonials = await getTestimonials(locale);
  return <Testimonials testimonials={testimonials} />;
}
