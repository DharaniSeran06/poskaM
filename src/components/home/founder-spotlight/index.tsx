"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const CUTOUT_IMAGE = "/images/owner-picture.jpeg";

export default function FounderSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [leftVisible, setLeftVisible] = useState(false);
  const [centerVisible, setCenterVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  // Reduced-motion check
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Staggered entrance: center image → left text → right text
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCenterVisible(true);
          const t1 = setTimeout(() => setLeftVisible(true), 400);
          const t2 = setTimeout(() => setRightVisible(true), 700);
          observer.disconnect();
          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
          };
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Subtle parallax on desktop only
  const handleScroll = useCallback(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const offset = (viewportCenter - sectionCenter) * 0.06;
    setParallaxY(Math.max(-20, Math.min(20, offset)));
  }, [prefersReducedMotion]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const noMotion = prefersReducedMotion;
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  const leftStyle: React.CSSProperties = noMotion
    ? {}
    : {
        opacity: leftVisible ? 1 : 0,
        transform: leftVisible ? "translateX(0)" : "translateX(-50px)",
        transition: `opacity 0.9s ${ease}, transform 0.9s ${ease}`,
        willChange: "opacity, transform",
      };

  const centerStyle: React.CSSProperties = noMotion
    ? {}
    : {
        opacity: centerVisible ? 1 : 0,
        transform: centerVisible
          ? `translateY(${parallaxY}px) scale(1)`
          : "translateY(40px) scale(0.97)",
        transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        willChange: "opacity, transform",
      };

  const rightStyle: React.CSSProperties = noMotion
    ? {}
    : {
        opacity: rightVisible ? 1 : 0,
        transform: rightVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.9s ${ease}, transform 0.9s ${ease}`,
        willChange: "opacity, transform",
      };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f8f9fb] dark:bg-darkmode overflow-hidden"
    >
      {/* ═══════════════════════════════════════════════════
          GEOMETRIC BACKGROUND SHAPES — DESKTOP
          ═══════════════════════════════════════════════════ */}

      {/* Main diagonal deep-blue shape (right ~55%) */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-0 right-0 w-[58%] h-full"
        style={{
          background:
            "linear-gradient(155deg, #0F4C81 0%, #0a6aaf 40%, #0077B6 100%)",
          clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Green accent diagonal stripe */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-0 right-0 w-[58%] h-full"
        style={{
          background:
            "linear-gradient(155deg, #22C55E 0%, #00A86B 100%)",
          clipPath: "polygon(19% 0%, 23% 0%, 1% 100%, -2% 100%)",
          opacity: 0.9,
        }}
      />

      {/* Lighter translucent blue accent stripe */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-0 right-0 w-[58%] h-full"
        style={{
          background:
            "linear-gradient(155deg, rgba(0,119,182,0.35) 0%, rgba(15,76,129,0.5) 100%)",
          clipPath: "polygon(16% 0%, 19.5% 0%, -2% 100%, -5% 100%)",
        }}
      />

      {/* Subtle inner glow on the blue shape */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-0 right-0 w-[58%] h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(0,119,182,0.15) 0%, transparent 70%)",
          clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* ═══════════════════════════════════════════════════
          GEOMETRIC BACKGROUND SHAPES — MOBILE / TABLET
          ═══════════════════════════════════════════════════ */}

      {/* Mobile: Blue diagonal top region */}
      <div
        aria-hidden="true"
        className="lg:hidden absolute top-0 left-0 w-full h-[52%]"
        style={{
          background:
            "linear-gradient(175deg, #0F4C81 0%, #0077B6 100%)",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 78%, 0% 100%)",
        }}
      />

      {/* Mobile: Green accent bar */}
      <div
        aria-hidden="true"
        className="lg:hidden absolute top-0 left-0 w-full h-[52%]"
        style={{
          background:
            "linear-gradient(175deg, #22C55E 0%, #00A86B 100%)",
          clipPath: "polygon(0% 90%, 100% 68%, 100% 73%, 0% 95%)",
          opacity: 0.85,
        }}
      />

      {/* ═══════════════════════════════════════════════════
          CONTENT
          ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end min-h-[520px] lg:min-h-[660px]">

          {/* ── LEFT: Name + Description + Button ────────── */}
          <div
            className="order-2 lg:order-1 flex flex-col justify-center py-8 lg:py-24 lg:pr-10"
            style={leftStyle}
          >
            <h2 className="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-black uppercase leading-[0.95] tracking-tight text-midnight_text dark:text-white mb-4">
              Ermond
              <br />
              Poshka
            </h2>

            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 font-medium mb-5">
              Founder &amp; Management
            </p>

            {/* Blue→Green gradient accent line */}
            <div
              aria-hidden="true"
              className="w-16 h-[3px] rounded-full mb-8"
              style={{
                background: "linear-gradient(to right, #0077B6, #22C55E)",
              }}
            />

            {/* Description — staggered entrance (rightVisible delay) */}
            <div style={rightStyle}>
              <p className="text-sm md:text-[15px] text-gray-500 dark:text-gray-400 leading-[1.9] max-w-[400px] mb-10">
                Ermond Poshka realized his dream of owning his own company and
                founded the sole proprietorship &ldquo;POSKA Plastering
                Business&rdquo; in Zurich. He gradually expanded his services,
                which his customers greatly appreciated.
              </p>
            </div>

            <Link
              href="/about/ermond-poshka"
              className="inline-flex w-fit items-center gap-2 px-6 py-3
                bg-primary text-white rounded-lg
                hover:bg-primaryDark active:scale-[0.97]
                transition-all duration-300
                font-semibold text-sm tracking-wide shadow-lg shadow-primary/20"
            >
              Read More
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

          {/* ── RIGHT: Director Image ────────────────────── */}
          <div
            ref={imageRef}
            className="order-1 lg:order-2 flex justify-center lg:justify-end items-end relative self-end lg:mr-[-20px]"
            style={centerStyle}
          >
            {/* Soft radial glow behind the person */}
            <div
              aria-hidden="true"
              className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[85%] h-[55%] rounded-full blur-3xl opacity-25"
              style={{
                background:
                  "radial-gradient(ellipse at center, #22C55E 0%, #0077B6 50%, transparent 70%)",
              }}
            />

            <div className="relative w-[240px] sm:w-[280px] md:w-[320px] lg:w-[350px] xl:w-[400px]">
              <Image
                src={CUTOUT_IMAGE}
                alt="Ermond Poshka, Founder & Management"
                width={500}
                height={680}
                className="relative z-10 w-full h-auto object-cover rounded-lg
                  drop-shadow-[0_12px_48px_rgba(0,0,0,0.2)]"
                sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 320px, 400px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
