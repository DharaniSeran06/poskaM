"use client";

import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * VideoIntro – Modern split-layout section.
 *
 * Left (col-span-4): compact text content — label, heading, description, CTA.
 * Right (col-span-8): dominant video frame with premium styling.
 * On mobile: stacks vertically (text first, centered).
 */

const VIDEO_SRC = "/images/PoskaIntroA.mp4";

export default function VideoIntro() {
  const t = useTranslations("home.videoIntro");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  return (
    <section className="bg-white dark:bg-darkmode py-16 md:py-20">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── Left Side: Text (compact) ────────────────── */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Label pill */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 mb-5 rounded-full
                bg-primary/5 dark:bg-primary/10 border border-primary/15 dark:border-primary/25
                text-primary dark:text-cyan text-xs font-semibold uppercase tracking-widest"
              data-aos="fade-down"
              data-aos-duration="600"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-cyan animate-pulse" />
              {t("label")}
            </div>

            {/* Heading */}
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight
                text-midnight_text dark:text-white mb-4 max-w-md"
              data-aos="fade-right"
              data-aos-duration="700"
            >
              {t("heading")}{" "}
              <span className="text-primary dark:text-cyan">{t("headingHighlight")}</span>
            </h2>

            {/* Short description */}
            <p
              className="text-sm sm:text-base text-gray dark:text-gray leading-relaxed mb-6 max-w-md"
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-duration="600"
            >
              {t("description")}
            </p>

            {/* CTA */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 px-7 py-3.5
                bg-primary text-white rounded-xl
                font-semibold text-sm md:text-base
                shadow-lg shadow-primary/20
                transition-all duration-300 ease-out
                hover:bg-primaryDark hover:shadow-xl hover:scale-[1.02]
                active:scale-[0.97] active:shadow-md"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="600"
            >
              {t("cta")}
              <svg
                className="w-4.5 h-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* ── Right Side: Video (dominant) ──────────────── */}
          <div
            className="lg:col-span-8 relative"
            data-aos="fade-left"
            data-aos-duration="800"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/15 dark:shadow-black/30 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover absolute inset-0"
              />

              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              {/* Play/Pause Toggle */}
              <button
                onClick={togglePlay}
                aria-label={isPaused ? "Play video" : "Pause video"}
                className="absolute bottom-4 right-4 z-10 w-11 h-11 rounded-full
                  bg-white/15 backdrop-blur-sm border border-white/25
                  flex items-center justify-center
                  text-white hover:bg-white/25 transition-all duration-300
                  active:scale-90"
              >
                {isPaused ? (
                  <svg className="w-4.5 h-4.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
