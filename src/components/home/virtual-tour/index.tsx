import React from "react";
import Link from "next/link";

/**
 * VirtualTour – 3D virtual tour iframe section
 * Placed between Services and References (Projects) on the home page.
 */

export default function VirtualTour() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        {/* Section Header */}
        <div className="text-center mb-10" data-aos="fade-up" data-aos-duration="600">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-[#016aac]/10 dark:bg-[#016aac]/20 text-[#016aac] text-xs font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#016aac] animate-pulse" />
            Virtual Tour
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-5">
            Explore Our Work in <span className="text-primary">3D</span>
          </h2>

          {/* Project Details */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
            <p><span className="font-semibold text-midnight_text dark:text-white">Work:</span> General plastering work</p>
            <span className="hidden sm:inline text-primary/40">|</span>
            <p><span className="font-semibold text-midnight_text dark:text-white">Project Manager:</span> Ermond Poshka</p>
            <span className="hidden sm:inline text-primary/40">|</span>
            <p><span className="font-semibold text-midnight_text dark:text-white">Location:</span> Canton of Zurich</p>
            <span className="hidden sm:inline text-primary/40">|</span>
            <p><span className="font-semibold text-midnight_text dark:text-white">Architecture and planning:</span> Fuchs Architekten AG</p>
          </div>

          {/* Reference Button */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3
              bg-primary text-white rounded-lg
              hover:bg-primaryDark active:scale-[0.97]
              transition-all duration-300
              font-semibold text-sm tracking-wide shadow-lg shadow-primary/20"
          >
            Reference
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* 3D Tour Iframe */}
        <div
          className="w-full rounded-2xl overflow-hidden shadow-xl shadow-black/10 dark:shadow-black/30"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="700"
        >
          <iframe
            width="100%"
            height="500"
            src="https://tour-de.metareal.com/apps/player?asset=8c775d21-93ce-46f4-b6b4-78d010d95dac&starting=tour&autostart=false"
            frameBorder="0"
            allow="xr-spatial-tracking *; accelerometer *; magnetometer *; gyroscope *"
            allowFullScreen
            className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]"
          />
        </div>
      </div>
    </section>
  );
}
