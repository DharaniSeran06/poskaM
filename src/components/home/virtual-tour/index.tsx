"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * VirtualTour – 3D virtual tour iframe section
 * Split layout: text left, 3D iframe right.
 */

export default function VirtualTour() {
  const t = useTranslations("home.virtualTour");

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── Left Side: Text ──────────────────────── */}
          <div
            className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left"
            data-aos="fade-right"
            data-aos-duration="600"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/15 dark:border-primary/25 text-primary dark:text-cyan text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-cyan animate-pulse" />
              {t("badge")}
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-midnight_text dark:text-white mb-6">
              {t("heading")}{" "}
              <span className="text-primary dark:text-cyan">{t("headingHighlight")}</span>
            </h2>

            {/* Project Details */}
            <div className="flex flex-col gap-2.5 text-sm md:text-[15px] text-gray-600 dark:text-gray-400 mb-8">
              <p>
                <span className="font-semibold text-midnight_text dark:text-white">{t("workLabel")}</span>{" "}
                {t("workValue")}
              </p>
              <p>
                <span className="font-semibold text-midnight_text dark:text-white">{t("pmLabel")}</span>{" "}
                {t("pmValue")}
              </p>
              <p>
                <span className="font-semibold text-midnight_text dark:text-white">{t("locationLabel")}</span>{" "}
                {t("locationValue")}
              </p>
              <p>
                <span className="font-semibold text-midnight_text dark:text-white">{t("archLabel")}</span>{" "}
                {t("archValue")}
              </p>
            </div>

            {/* Reference Button */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5
                bg-[#016aac] text-white rounded-xl
                font-semibold text-sm md:text-base
                shadow-lg shadow-[#016aac]/20
                transition-all duration-300 ease-out
                hover:bg-[#015a94] hover:shadow-xl hover:scale-[1.02]
                active:scale-[0.97] active:shadow-md"
            >
              {t("cta")}
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

          {/* ── Right Side: 3D Tour Iframe ───────────── */}
          <div
            className="lg:col-span-8"
            data-aos="fade-left"
            data-aos-duration="800"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/15 dark:shadow-black/30">
              <iframe
                width="100%"
                height="500"
                src="https://tour-de.metareal.com/apps/player?asset=8c775d21-93ce-46f4-b6b4-78d010d95dac&starting=tour&autostart=false"
                frameBorder="0"
                allow="xr-spatial-tracking *; accelerometer *; magnetometer *; gyroscope *"
                allowFullScreen
                className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
