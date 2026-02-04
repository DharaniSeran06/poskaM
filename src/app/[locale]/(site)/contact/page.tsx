import React from "react";
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import HeroSub from "@/app/components/shared/hero-sub";
import ContactInfo from "@/app/components/contact/contact-info";
import ContactForm from "@/app/components/contact/form";
import Location from "@/app/components/contact/office-location";
import { getContactPageData } from "@/sanity/lib/contactPage";

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const contactData = await getContactPageData(locale);
  
  return {
    title: contactData?.title || "Contact | POSKA MANOLITO AG",
    description: contactData?.metaDescription || contactData?.description || "Get in touch with POSKA MANOLITO AG for professional construction, renovation, and building services.",
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('contact');
  const contactData = await getContactPageData(locale);
  
  const breadcrumbLinks = [
    { href: "/", text: t('breadcrumb.home') },
    { href: "/contact", text: t('breadcrumb.contact') },
  ];

  // Fallback to translations if Sanity data is not available
  const pageTitle = contactData?.title || t('title');
  const pageDescription = contactData?.description || t('description');
  
  return (
    <>
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
