"use client";
import React, { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { ContactPageData } from '@/sanity/lib/contactPage';

interface ContactFormProps {
  contactData: ContactPageData | null;
}

// Service mapping: translated label -> API slug
const SERVICE_MAP: Record<string, string> = {
  'plaster-casts': 'plaster-casts',
  'drywall': 'drywall',
  'painting': 'painting',
  'facades-and-insulation': 'facades-and-insulation',
  'customer-masons': 'customer-masons',
  'other': 'other',
};

const ContactForm: React.FC<ContactFormProps> = ({ contactData }) => {
  const t = useTranslations('contact.form');
  const tNav = useTranslations('navbar');
  const tFooter = useTranslations('footer');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const reset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    setError(null);
    setSubmitted(false);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          service: formData.service,
          projectDetails: formData.message,
          language: locale, // 'en' or 'de'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show server-side validation messages if present
        const details =
          Array.isArray(data?.errors) && data.errors.length > 0
            ? data.errors.join('\n')
            : (data?.details as string | undefined);
        throw new Error(details || data.error || 'Failed to submit quote request');
      }

      if (data.success) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err: any) {
      console.error('Quote submission error:', err);
      setError(err.message || t('submitError') || 'Failed to submit. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="dark:bg-darkmode lg:py-24 py-16 px-4 bg-white">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-12 items-start">  
          <div className="col-span-12 md:col-span-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-4">
              {t('getFreeQuote')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {t('formDescription')}
            </p>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 text-green-700 dark:text-green-300 rounded-lg">
                {contactData?.formSuccessMessage || t('thankYou')}
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block pb-2 text-base font-medium text-midnight_text dark:text-white">
                  {t('fullName')}
                </label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark_border dark:text-white dark:bg-darkmode focus:border-[#016aac] dark:focus:border-[#016aac] focus:outline-none focus:ring-2 focus:ring-[#016aac]/20 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block pb-2 text-base font-medium text-midnight_text dark:text-white">
                    {t('emailAddress')}
                  </label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark_border dark:text-white dark:bg-darkmode focus:border-[#016aac] dark:focus:border-[#016aac] focus:outline-none focus:ring-2 focus:ring-[#016aac]/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block pb-2 text-base font-medium text-midnight_text dark:text-white">
                    {t('phoneNumber')}
                  </label>
                  <input
                    id='phone'
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark_border dark:text-white dark:bg-darkmode focus:border-[#016aac] dark:focus:border-[#016aac] focus:outline-none focus:ring-2 focus:ring-[#016aac]/20 transition-all"
                    placeholder="+41 XX XXX XX XX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block pb-2 text-base font-medium text-midnight_text dark:text-white">
                  {t('serviceNeeded')}
                </label>
                <select
                  name="service"
                  id="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="custom-select w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark_border dark:text-white dark:bg-darkmode focus:border-[#016aac] dark:focus:border-[#016aac] focus:outline-none focus:ring-2 focus:ring-[#016aac]/20 transition-all"
                >
                  <option value="">{t('selectService')}</option>
                  <option value="plaster-casts">{tNav('submenu.plasterCasts')}</option>
                  <option value="drywall">{tNav('submenu.drywall')}</option>
                  <option value="painting">{tNav('submenu.painting')}</option>
                  <option value="facades-and-insulation">{tNav('submenu.facadesAndInsulation')}</option>
                  <option value="customer-masons">{tNav('submenu.customerMasons')}</option>
                  <option value="architecture">Architecture</option>
                  <option value="planning">Planning</option>
                  <option value="interior">Interior</option>
                  <option value="renovation">Renovation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block pb-2 text-base font-medium text-midnight_text dark:text-white">
                  {t('projectDetails')}
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark_border dark:text-white dark:bg-darkmode focus:border-[#016aac] dark:focus:border-[#016aac] focus:outline-none focus:ring-2 focus:ring-[#016aac]/20 transition-all resize-none"
                  placeholder={t('projectDetailsPlaceholder')}
                />
              </div>

              <button 
                type="submit" 
                disabled={loader}
                className="w-full bg-[#016aac] rounded-lg text-white py-4 px-8 font-semibold text-lg hover:bg-[#015a94] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {loader ? t('sending') : t('sendMessage')}
              </button>
            </form>
          </div>
          
          <div className="col-span-12 md:col-span-6">
            <div className="bg-section dark:bg-darklight rounded-xl p-8 h-full">
              <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-6">
                {t('contactInformation')}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#016aac]/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-midnight_text dark:text-white mb-1">{t('phone')}</h4>
                    <a href={`tel:${(contactData?.phoneNumber || '+41523472540').replace(/\s/g, '')}`} className="text-gray-600 dark:text-gray-400 hover:text-[#016aac] transition-colors">
                      {contactData?.phoneNumber || '+41 52 347 25 40'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#016aac]/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-midnight_text dark:text-white mb-1">{t('email')}</h4>
                    <a href={`mailto:${contactData?.emailAddress || 'info@poskamanolito.ch'}`} className="text-gray-600 dark:text-gray-400 hover:text-[#016aac] transition-colors">
                      {contactData?.emailAddress || 'info@poskamanolito.ch'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#016aac]/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-[#016aac]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-midnight_text dark:text-white mb-1">WhatsApp</h4>
                    <a href="https://wa.me/41523472540" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#016aac] transition-colors">
                      {t('chatWhatsApp')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#016aac]/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-midnight_text dark:text-white mb-1">{t('address')}</h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {contactData?.officeAddress || tFooter('address')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark_border">
                <h4 className="font-semibold text-midnight_text dark:text-white mb-4">{t('businessHours')}</h4>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  {contactData?.businessHours?.mondayFriday ? (
                    <>
                      <p>{contactData.businessHours.mondayFriday}</p>
                      {contactData.businessHours.saturday && <p>{contactData.businessHours.saturday}</p>}
                      {contactData.businessHours.sunday && <p>{contactData.businessHours.sunday}</p>}
                    </>
                  ) : (
                    <>
                      <p>{t('mondayFriday')}</p>
                      <p>{t('saturday')}</p>
                      <p>{t('sunday')}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
