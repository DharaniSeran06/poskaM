import React from "react";
import { headers } from "next/headers";
import { getTranslations } from 'next-intl/server';
import HeroSub from "@/components/shared/hero-sub";
import ContactInfo from "@/components/contact/contact-info";
import ContactForm from "@/components/contact/form";
import Location from "@/components/contact/office-location";
import { getContactPageData } from "@/sanity/lib/contactPage";

// Force dynamic to avoid static generation issues with embedded HTML
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: PageProps) {
  // Force runtime execution
  const headersList = await headers();
  const _host = headersList.get('host');
  
  const { locale } = await params;
  
  let t: (key: string) => string;
  let contactData = null;
  
  try {
    [t, contactData] = await Promise.all([
      getTranslations('contact'),
      getContactPageData(locale)
    ]);
  } catch (error) {
    console.error('[Contact] Error loading page data:', error);
    t = (key: string) => {
      const fallbacks: Record<string, string> = {
        'title': 'Contact Us',
        'description': 'Get in touch with us',
        'breadcrumb.home': 'Home',
        'breadcrumb.contact': 'Contact',
      };
      return fallbacks[key] || key;
    };
  }
  
  const breadcrumbLinks = [
    { href: "/", text: t('breadcrumb.home') },
    { href: "/contact", text: t('breadcrumb.contact') },
  ];

  const pageTitle = contactData?.title || t('title');
  const pageDescription = contactData?.description || t('description');
  
  return (
    <>
      <title>{`${pageTitle} | POSKA MANOLITO AG`}</title>
      <meta name="description" content={contactData?.metaDescription || pageDescription} />
      
      <HeroSub
        title={pageTitle}
        description={pageDescription}
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo contactData={contactData} />
      <ContactForm contactData={contactData} />
      <Location contactData={contactData} />
    </>
  );
}
