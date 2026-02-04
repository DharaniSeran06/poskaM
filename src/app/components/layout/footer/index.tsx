"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { FooterData } from '@/sanity/lib/footer';

interface FooterProps {
  footerData?: FooterData | null;
}

// Helper function to render social media icon based on platform
const renderSocialIcon = (platform: string) => {
  const platformLower = platform.toLowerCase();
  
  if (platformLower.includes('facebook')) {
    return (
      <svg className="w-5 h-5 text-[#CBD5E1] group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
        <path d="M16.294 8.86875H14.369H13.6815V8.18125V6.05V5.3625H14.369H15.8128C16.1909 5.3625 16.5003 5.0875 16.5003 4.675V1.03125C16.5003 0.653125 16.2253 0.34375 15.8128 0.34375H13.3034C10.5878 0.34375 8.69714 2.26875 8.69714 5.12187V8.1125V8.8H8.00964H5.67214C5.19089 8.8 4.74402 9.17812 4.74402 9.72812V12.2031C4.74402 12.6844 5.12214 13.1313 5.67214 13.1313H7.94089H8.62839V13.8188V20.7281C8.62839 21.2094 9.00652 21.6562 9.55652 21.6562H12.7878C12.994 21.6562 13.1659 21.5531 13.3034 21.4156C13.4409 21.2781 13.544 21.0375 13.544 20.8312V13.8531V13.1656H14.2659H15.8128C16.2596 13.1656 16.6034 12.8906 16.6721 12.4781V12.4438V12.4094L17.1534 10.0375C17.1878 9.79688 17.1534 9.52187 16.9471 9.24687C16.8784 9.075 16.569 8.90312 16.294 8.86875Z" />
      </svg>
    );
  }
  
  if (platformLower.includes('linkedin')) {
    return (
      <svg className="w-5 h-5 text-[#CBD5E1] group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
      </svg>
    );
  }
  
  if (platformLower.includes('instagram')) {
    return (
      <svg className="w-5 h-5 text-[#CBD5E1] group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
      </svg>
    );
  }
  
  if (platformLower.includes('whatsapp')) {
    return (
      <svg className="w-5 h-5 text-[#CBD5E1] group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    );
  }
  
  // Default icon (generic social media)
  return (
    <svg className="w-5 h-5 text-[#CBD5E1] group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.152-2.049 4.099-.376.305-.796.512-1.24.619-.178.043-.356.064-.534.064-.178 0-.356-.021-.534-.064-.444-.107-.864-.314-1.24-.619-1.153-.947-1.88-2.241-2.049-4.099-.021-.178-.021-.356-.021-.534 0-.178 0-.356.021-.534.169-1.858.896-3.152 2.049-4.099.376-.305.796-.512 1.24-.619.178-.043.356-.064.534-.064.178 0 .356.021.534.064.444.107.864.314 1.24.619 1.153.947 1.88 2.241 2.049 4.099.021.178.021.356.021.534 0 .178 0 .356-.021.534z"/>
    </svg>
  );
};

const Footer: React.FC<FooterProps> = ({ footerData }) => {
  const t = useTranslations('footer');
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer for footer animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Use Sanity data if available, otherwise fallback to translations
  const description = footerData?.description || t('description');
  const logo = footerData?.logo || '/images/logo.png';
  const navigationLinks = footerData?.navigationLinks || [
    { url: "/", label: t('links.home') },
    { url: "/about", label: t('links.aboutUs') },
    { url: "/services/plaster-casts", label: t('links.services') },
    { url: "/projects", label: t('links.projects') },
    { url: "/contact", label: t('links.contact') },
  ];
  const servicesLinks = footerData?.servicesLinks || [
    { url: "/services/plaster-casts", label: t('serviceLinks.plasterCasts') },
    { url: "/services/drywall", label: t('serviceLinks.drywall') },
    { url: "/services/painting", label: t('serviceLinks.painting') },
    { url: "/services/facades-and-insulation", label: t('serviceLinks.facadesAndInsulation') },
    { url: "/services/customer-masons", label: t('serviceLinks.customerMasons') },
  ];
  const socialMediaLinks = footerData?.socialMediaLinks || [];
  const copyright = footerData?.copyright || t('copyright', { year: new Date().getFullYear() });
  const privacyLabel = footerData?.legalLinks?.privacyPolicy?.label || t('privacyPolicy');
  const privacyUrl = footerData?.legalLinks?.privacyPolicy?.url || '/privacy';
  const termsLabel = footerData?.legalLinks?.termsAndConditions?.label || t('termsOfService');
  const termsUrl = footerData?.legalLinks?.termsAndConditions?.url || '/terms';

  return (
    <footer
      ref={footerRef}
      className="relative z-10 bg-gradient-to-b from-midnight_text via-midnight_text to-[#0a1622] dark:from-darkmode dark:via-darkmode dark:to-[#050a12] border-t border-[#016aac]/20"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#016aac] to-transparent"></div>

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div 
            className="col-span-1"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.1s, transform 0.8s ease-out 0.1s',
            }}
          >
            <Link href="/" className="mb-6 inline-block group">
              <div className="relative">
                <Image
                  src={logo}
                  alt="POSKA MANOLITO AG Logo"
                  width={180}
                  height={60}
                  className="transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
                  style={{ width: 'auto', height: 'auto', filter: 'drop-shadow(0 2px 4px rgba(1, 106, 172, 0.2))' }}
                />
              </div>
            </Link>
            <p className="text-[#CBD5E1] mb-6 leading-relaxed text-sm">
              {description}
            </p>
            
            {/* Social Media Icons */}
            {socialMediaLinks.length > 0 ? (
              <div className="flex items-center space-x-3">
                {socialMediaLinks.map((social, index) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="p-2.5 rounded-lg bg-white/10 hover:bg-[#016aac] hover:scale-110 transition-all duration-300 group"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                      transition: `opacity 0.6s ease-out ${0.3 + index * 0.1}s, transform 0.6s ease-out ${0.3 + index * 0.1}s`,
                    }}
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            ) : (
              // Fallback to default social media icons if no Sanity data
              <div className="flex items-center space-x-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="p-2.5 rounded-lg bg-white/10 hover:bg-[#016aac] hover:scale-110 transition-all duration-300 group"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                    transition: 'opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s',
                  }}
                >
                  {renderSocialIcon('Facebook')}
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-lg bg-white/10 hover:bg-[#016aac] hover:scale-110 transition-all duration-300 group"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                    transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s',
                  }}
                >
                  {renderSocialIcon('LinkedIn')}
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="p-2.5 rounded-lg bg-white/10 hover:bg-[#016aac] hover:scale-110 transition-all duration-300 group"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                    transition: 'opacity 0.6s ease-out 0.5s, transform 0.6s ease-out 0.5s',
                  }}
                >
                  {renderSocialIcon('Instagram')}
                </a>
                <a
                  href="https://wa.me/41523472540"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="p-2.5 rounded-lg bg-white/10 hover:bg-[#016aac] hover:scale-110 transition-all duration-300 group"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                    transition: 'opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s',
                  }}
                >
                  {renderSocialIcon('WhatsApp')}
                </a>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div
            className="col-span-1"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
            }}
          >
            <h4 className="mb-6 text-lg text-white font-bold uppercase tracking-wider">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={link.url || index}>
                  <Link
                    href={link.url}
                    className="text-[#CBD5E1] hover:text-[#0284c7] hover:translate-x-2 transition-all duration-300 inline-block group"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                      transition: `opacity 0.6s ease-out ${0.3 + index * 0.1}s, transform 0.6s ease-out ${0.3 + index * 0.1}s`,
                    }}
                  >
                    <span className="flex items-center">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#0284c7] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            className="col-span-1"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
            }}
          >
            <h4 className="mb-6 text-lg text-white font-bold uppercase tracking-wider">
              {t('services')}
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <li key={link.url || index}>
                  <Link
                    href={link.url}
                    className="text-[#CBD5E1] hover:text-[#0284c7] hover:translate-x-2 transition-all duration-300 inline-block group"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                      transition: `opacity 0.6s ease-out ${0.4 + index * 0.1}s, transform 0.6s ease-out ${0.4 + index * 0.1}s`,
                    }}
                  >
                    <span className="flex items-center">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#0284c7] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className="col-span-1"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
            }}
          >
            <h4 className="mb-6 text-lg text-white font-bold uppercase tracking-wider">
              {t('contactUs')}
            </h4>
            <ul className="space-y-4">
              <li
                className="flex items-start space-x-3 group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.6s ease-out 0.5s, transform 0.6s ease-out 0.5s',
                }}
              >
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#0284c7] group-hover:text-[#016aac] group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[#CBD5E1] group-hover:text-[#E2E8F0] transition-colors whitespace-pre-line">
                  {t('address')}
                </span>
              </li>
              <li
                className="flex items-center space-x-3 group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s',
                }}
              >
                <svg className="w-5 h-5 flex-shrink-0 text-[#0284c7] group-hover:text-[#016aac] group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+41523472540" className="text-[#CBD5E1] hover:text-[#E2E8F0] transition-colors">
                  +41 52 347 25 40
                </a>
              </li>
              <li
                className="flex items-center space-x-3 group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.6s ease-out 0.7s, transform 0.6s ease-out 0.7s',
                }}
              >
                <svg className="w-5 h-5 flex-shrink-0 text-[#0284c7] group-hover:text-[#016aac] group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@poskamanolito.ch" className="text-[#CBD5E1] hover:text-[#E2E8F0] transition-colors">
                  info@poskamanolito.ch
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 dark:border-gray-700/30 py-6">
        <div
          className="container flex flex-col md:flex-row justify-between items-center mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 sm:px-6 lg:px-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s',
          }}
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-[#94A3B8] text-sm">
              {copyright}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href={privacyUrl} className="text-[#CBD5E1] hover:text-[#0284c7] hover:underline transition-all duration-300">
              {privacyLabel}
            </Link>
            <Link href={termsUrl} className="text-[#CBD5E1] hover:text-[#0284c7] hover:underline transition-all duration-300">
              {termsLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
