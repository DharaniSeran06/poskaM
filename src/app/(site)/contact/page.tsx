import React from "react";
import { Metadata } from "next";
import HeroSub from "@/app/components/shared/hero-sub";
import ContactInfo from "@/app/components/contact/contact-info";
import ContactForm from "@/app/components/contact/form";
import Location from "@/app/components/contact/office-location";
import { getContactPageData } from "@/sanity/lib/contactPage";

export const metadata: Metadata = {
  title: "Contact | POSKA MANOLITO AG",
};

export const dynamic = 'force-dynamic';

const page = async () => {
  // Fetch contact data from Sanity (default to 'en' locale)
  const contactData = await getContactPageData('en');
  
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  
  return (
    <>
      <HeroSub
        title="Contact Us"
        description="Get in touch with POSKA MANOLITO AG for professional construction, renovation, and building services. We're here to help bring your project to life."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo contactData={contactData} />
      <ContactForm contactData={contactData} />
      <Location contactData={contactData} />
    </>
  );
};

export default page;
