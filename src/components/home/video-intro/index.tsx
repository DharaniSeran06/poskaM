"use client";

import React, { useRef, useState } from "react";
import { Link } from "@/i18n/routing";

/**
 * VideoIntro – Full-width cinematic video section placed directly below the Hero.
 *
 * Layout: Full-bleed background video with centered overlay text + CTA.
 * Includes a soft gradient divider that transitions from the hero's blue into the section.
 */

const VIDEO_SRC = "/images/PoskaIntroA.mp4";

export default function VideoIntro() {
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
    <>
      <section className="relative w-full h-[80vh] sm:h-[85vh] md:h-[90vh] lg:h-screen overflow-hidden">
        {/* ── Background Video ──────────────────────────── */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ── Dark Overlay ──────────────────────────────── */}
        <div className="absolute inset-0 bg-black/50" />

        {/* ── Centered Content ──────────────────────────── */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          {/* Label pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full
              bg-white/10 backdrop-blur-sm border border-white/20
              text-white text-xs font-semibold uppercase tracking-widest"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Who We Are
          </div>

          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6 max-w-4xl"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            Building Excellence with{" "}
            <span className="text-[#4fc3f7]">Swiss Precision</span>
          </h2>

          {/* Short description */}
          <p
            className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
          >
            Since 2003, delivering trusted construction and façade excellence
            across Switzerland.
          </p>

          {/* CTA */}
          <Link
            href="/about"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#016aac] rounded-xl
              font-semibold text-base md:text-lg
              shadow-lg shadow-black/20
              transition-all duration-300 ease-out
              hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]
              active:scale-[0.97] active:shadow-md"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="600"
          >
            Discover Our Story
            <svg
              className="w-5 h-5"
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

        {/* ── Play/Pause Toggle ─────────────────────────── */}
        <button
          onClick={togglePlay}
          aria-label={isPaused ? "Play video" : "Pause video"}
          className="absolute bottom-6 right-6 z-10 w-12 h-12 rounded-full
            bg-white/15 backdrop-blur-sm border border-white/25
            flex items-center justify-center
            text-white hover:bg-white/25 transition-all duration-300
            active:scale-90"
        >
          {isPaused ? (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </button>
      </section>
    </>
  );
}
