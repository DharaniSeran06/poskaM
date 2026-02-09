import React from 'react';
import { Metadata } from "next";
import Hero from '@/components/home/hero';
import VideoIntro from '@/components/home/video-intro';
import FounderSpotlight from '@/components/home/founder-spotlight';
import Stats from '@/components/home/stats';
import Services from '@/components/home/services';
import Projects from '@/components/home/projects';
import TestimonialsWrapper from '@/components/home/testimonial/TestimonialsWrapper';
import CompanyInfoWrapper from '@/components/home/info/CompanyInfoWrapper';

// Static generation with ISR - pages are pre-rendered and cached
// Revalidate every 1 hour for fresh content without loading delays
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "POSKA MANOLITO AG - Construction, Plastering, Facades, Painting, Renovation",
    description: "Professional construction services with Swiss precision. Specializing in construction, plastering, facades, painting, and renovation projects across Switzerland.",
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <main>
      <Hero />
      <VideoIntro />
      <FounderSpotlight />
      <Stats />
      <Services locale={locale} />
      <Projects locale={locale} />
      <TestimonialsWrapper locale={locale} />
      <CompanyInfoWrapper />
    </main>
  )
}
