"use client";
import React from "react";
import { ContactPageData } from '@/sanity/lib/contactPage';

interface LocationProps {
  contactData: ContactPageData | null;
}

const Location: React.FC<LocationProps> = ({ contactData }) => {
  // Use Sanity data if available
  const googleMapsEmbed = contactData?.googleMapsEmbed;
  const coordinates = contactData?.googleMapsCoordinates;

  // Build Google Maps URL from coordinates if embed URL is not provided
  const getMapUrl = () => {
    if (googleMapsEmbed) {
      return googleMapsEmbed;
    }
    if (coordinates?.latitude && coordinates?.longitude) {
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${coordinates.longitude}!3d${coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${coordinates.latitude}%2C${coordinates.longitude}!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s`;
    }
    // Fallback to default location (Winterthur, Switzerland)
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2700.5!2d8.7281!3d47.5056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a9a8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sHaldenstrasse%2050%2C%208400%20Winterthur%2C%20Switzerland!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s';
  };

  return (
    <section className="bg-section dark:bg-darklight lg:py-24 py-16 px-4">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <div className="bg-white dark:bg-darklight rounded-xl shadow-lg overflow-hidden" data-aos="fade-up">
          <div className="aspect-video w-full">
            {googleMapsEmbed || coordinates ? (
              <iframe
                src={getMapUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Map location not configured</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
