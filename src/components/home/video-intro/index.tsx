"use client";

import React, { useRef, useState } from "react";
import { Link } from "@/i18n/routing";

/**
 * VideoIntro – Premium section placed directly below the Hero.
 *
 * Layout: Left = content (heading, description, features, CTA) | Right = video card
 * Includes a soft gradient divider that transitions from the hero's blue into the section.
 */

const VIDEO_SRC = "/images/PoskaIntroA.mp4";

const FEATURES = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
    title: "Swiss Quality Standards",
    desc: "Every project meets the highest Swiss construction quality benchmarks.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    title: "20+ Years of Experience",
    desc: "Trusted expertise built over two decades of successful projects.",
  },
  // {
  //   icon: (
  //     <path
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
  //     />
  //   ),
  //   title: "Client-Centered Approach",
  //   desc: "Fair pricing and transparent communication from start to finish.",
  // },
];

export default function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(false);

  const handleInteraction = () => setShowControls(true);
  const handleLeave = () => setShowControls(false);

  return (
    <>
      {/* ── Gradient divider: hero blue → section white ─────── */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-[#016aac]/20 via-[#016aac]/5 to-transparent dark:from-[#016aac]/30 dark:via-darkmode/80 dark:to-darkmode pointer-events-none" />

      <section className="relative py-16 lg:py-24 bg-white dark:bg-darkmode overflow-hidden">
        {/* Subtle background accents */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#016aac]/[0.03] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#016aac]/[0.03] rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* ── Left: Content ──────────────────────────────── */}
            <div
              className="order-1"
              data-aos="fade-right"
              data-aos-duration="700"
            >
              {/* Label pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-[#016aac]/10 dark:bg-[#016aac]/20 text-[#016aac] text-xs font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#016aac] animate-pulse" />
                Who We Are
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-midnight_text dark:text-white mb-5">
                Building Excellence with <span className="text-[#016aac]">Swiss Precision</span>
              </h2>

              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
                Since 2003, POSKA MANOLITO AG has delivered construction, plastering, façade, and renovation services that stand for good quality and a fair price — trusted by clients across Switzerland.
              </p>

              {/* Feature list */}
              <div className="space-y-6 mb-10">
                {FEATURES.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 group"
                    data-aos="fade-right"
                    data-aos-delay={100 + i * 100}
                    data-aos-duration="600"
                  >
                    {/* Icon circle */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#016aac]/10 dark:bg-[#016aac]/20 flex items-center justify-center group-hover:bg-[#016aac]/20 dark:group-hover:bg-[#016aac]/30 group-hover:scale-110 transition-all duration-300">
                      <svg
                        className="w-5 h-5 text-[#016aac]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        viewBox="0 0 24 24"
                      >
                        {feat.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-midnight_text dark:text-white mb-0.5">
                        {feat.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#016aac] text-white rounded-xl
                  font-semibold text-lg shadow-lg shadow-[#016aac]/20
                  transition-all duration-300 ease-out
                  hover:bg-[#015a94] hover:shadow-xl hover:shadow-[#016aac]/30 hover:scale-[1.02]
                  active:scale-[0.97] active:shadow-md"
              >
                Discover Our Story
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5"
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

            {/* ── Right: Video Card ─────────────────────────── */}
            <div
              className="order-2"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              <div className="relative">
                {/* Decorative tilted background */}
                <div className="absolute -inset-3 bg-gradient-to-br from-[#016aac]/10 to-[#016aac]/5 dark:from-[#016aac]/15 dark:to-[#016aac]/5 rounded-3xl transform rotate-2 pointer-events-none" />

                {/* Glass card wrapper */}
                <div
                  className="relative rounded-2xl overflow-hidden
                    bg-white/60 dark:bg-white/5 backdrop-blur-sm
                    shadow-[0_8px_40px_rgba(1,106,172,0.10)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]
                    transition-all duration-400 ease-out
                    lg:hover:shadow-[0_12px_48px_rgba(1,106,172,0.18)] dark:lg:hover:shadow-[0_12px_48px_rgba(1,106,172,0.25)]
                    lg:hover:scale-[1.015]
                    will-change-transform p-2 md:p-3"
                  onMouseEnter={handleInteraction}
                  onMouseLeave={handleLeave}
                  onTouchStart={handleInteraction}
                >
                  <video
                    ref={videoRef}
                    src={VIDEO_SRC}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={showControls}
                    className="w-full h-auto rounded-xl object-cover"
                    preload="metadata"
                  />
                </div>

                {/* Floating stat badge */}
                <div
                  className="absolute -bottom-4 -left-4 md:-bottom-5 md:-left-5
                    bg-white dark:bg-darklight rounded-xl px-5 py-3.5
                    shadow-lg shadow-black/5 dark:shadow-black/20
                    border border-gray-100 dark:border-dark_border"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <p className="text-2xl font-bold text-[#016aac]">500+</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Projects Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
