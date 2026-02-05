import React, { Suspense } from 'react';
import { Metadata } from "next";
import dynamicImport from 'next/dynamic';
import Hero from '../components/home/hero';
import Services from '../components/home/services';
import About from '../components/home/about';

// Lazy load heavy components below the fold
const WhyChooseUs = dynamicImport(() => import('../components/home/why-choose-us'), {
  loading: () => <div className="min-h-[400px] bg-gray-50 dark:bg-darklight animate-pulse" />,
  ssr: false, // Disable SSR for non-critical components
});

const Projects = dynamicImport(() => import('../components/home/projects'), {
  loading: () => <div className="min-h-[600px] bg-gray-50 dark:bg-darklight animate-pulse" />,
});

const TestimonialsWrapper = dynamicImport(() => import('../components/home/testimonial/TestimonialsWrapper'), {
  loading: () => <div className="min-h-[500px] bg-gray-50 dark:bg-darklight animate-pulse" />,
  ssr: false, // Disable SSR for non-critical components
});

const CompanyInfoWrapper = dynamicImport(() => import('../components/home/info/CompanyInfoWrapper'), {
  loading: () => <div className="min-h-[300px] bg-gray-50 dark:bg-darklight animate-pulse" />,
});

// Use ISR for better performance - revalidate every 1 hour
// This allows static generation with periodic updates
export const revalidate = 3600; // 1 hour in seconds
// Removed 'force-dynamic' to enable static generation and ISR

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
      {/* Above the fold - render immediately */}
      <Hero />
      <Services locale={locale} />
      <About />
      
      {/* Below the fold - lazy loaded with Suspense boundaries */}
      <Suspense fallback={<div className="min-h-[400px] bg-gray-50 dark:bg-darklight animate-pulse" />}>
        <WhyChooseUs />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[600px] bg-gray-50 dark:bg-darklight animate-pulse" />}>
        <Projects locale={locale} />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[500px] bg-gray-50 dark:bg-darklight animate-pulse" />}>
        <TestimonialsWrapper locale={locale} />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[300px] bg-gray-50 dark:bg-darklight animate-pulse" />}>
        <CompanyInfoWrapper />
      </Suspense>
    </main>
  );
}
