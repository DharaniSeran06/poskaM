"use client";
import React from "react";
import { useTranslations } from 'next-intl';
import { ContactPageData } from '@/sanity/lib/contactPage';

interface ContactInfoProps {
  contactData: ContactPageData | null;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contactData }) => {
  const t = useTranslations('contact.info');
  
  // Use Sanity data if available, otherwise fallback to translations
  const phoneNumber = contactData?.phoneNumber || '+41 52 347 25 40';
  const emailAddress = contactData?.emailAddress || 'info@poskamanolito.ch';
  const officeAddress = contactData?.officeAddress || '';
  
  return (
    <section className="dark:bg-darkmode pt-16 pb-8 px-4 bg-section">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          <div className="bg-white dark:bg-darklight rounded-xl p-8 shadow-lg text-center" data-aos="fade-up">
            <div className="bg-[#016aac]/20 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-2">
              {t('phone')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {t('callUsAnytime')}
            </p>
            <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-[#016aac] font-semibold hover:text-[#015a94] transition-colors">
              {phoneNumber}
            </a>
          </div>

          <div className="bg-white dark:bg-darklight rounded-xl p-8 shadow-lg text-center" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-[#016aac]/20 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-2">
              {t('email')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {t('sendUsEmail')}
            </p>
            <a href={`mailto:${emailAddress}`} className="text-[#016aac] font-semibold hover:text-[#015a94] transition-colors">
              {emailAddress}
            </a>
          </div>

          <div className="bg-white dark:bg-darklight rounded-xl p-8 shadow-lg text-center" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-[#016aac]/20 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-2">
              {t('address')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
              {officeAddress || t('address')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
