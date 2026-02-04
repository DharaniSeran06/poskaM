import React from "react";
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import HeroSub from "@/app/components/shared/hero-sub";
import JobApplicationForm from "@/app/components/job-application/form";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Job Application | POSKA MANOLITO AG",
    description: "Apply for a position at POSKA MANOLITO AG. Join our team and grow your career with us.",
  };
}

export default async function JobApplicationPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ position?: string }>;
}) {
  const { locale } = await params;
  const { position } = await searchParams;
  const t = await getTranslations('jobApplication');
  const tNav = await getTranslations('navbar');
  const tVacancies = await getTranslations('vacancies');

  const breadcrumbLinks = [
    { href: "/", text: tNav('home') },
    { href: "/about", text: tNav('company') },
    { href: "/vacancies", text: tVacancies('title') },
    { href: "/company/careers/apply", text: t('title') },
  ];

  // Decode position from URL
  const positionTitle = position ? decodeURIComponent(position) : '';

  return (
    <main>
      {/* Hero Section */}
      <HeroSub
        title={positionTitle ? t('titleWithPosition', { position: positionTitle }) : t('title')}
        description={t('subtitle')}
        breadcrumbLinks={breadcrumbLinks}
      />

      {/* Application Form Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <JobApplicationForm initialPosition={positionTitle} />
          </div>
        </div>
      </section>
    </main>
  );
}
