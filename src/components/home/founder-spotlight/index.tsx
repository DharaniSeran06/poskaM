"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const CUTOUT_IMAGE = "/images/owner_picture-removebg-preview.png";

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
        transform: rightVisible ? "translateX(0)" : "translateX(50px)",
        transition: `opacity 0.9s ${ease}, transform 0.9s ${ease}`,
        willChange: "opacity, transform",
      };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f0f6fb] dark:bg-darkmode overflow-hidden"
    >
      <div className="mx-auto max-w-screen-xl px-5 md:px-10 lg:px-12">
        {/* ── Desktop: 3-column  |  Mobile: stacked ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-end lg:items-end gap-8 lg:gap-6">

          {/* ── LEFT: Name + Button ────────────────────────── */}
          <div
            className="order-2 lg:order-1 flex flex-col justify-end pb-4 lg:pb-32"
            style={leftStyle}
          >
            <h2 className="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-black uppercase leading-[0.95] tracking-tight text-midnight_text dark:text-white mb-6">
              Ermond
              <br />
              Poshka
            </h2>

            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 font-medium mb-8">
              Founder &amp; Management
            </p>

            <Link
              href="/about/ermond-poshka"
              className="inline-block w-fit
                bg-[#f0f6fb] text-midnight_text
                dark:bg-[#f0f6fb] dark:text-midnight_text
                text-[10px] uppercase tracking-[0.2em] font-bold
                px-7 py-3
                hover:opacity-80
                active:scale-[0.97]
                transition-all duration-300"
            >
              Read More
            </Link>
          </div>

          {/* ── CENTER: Cutout Image ───────────────────────── */}
          <div
            ref={imageRef}
            className="order-1 lg:order-2 flex justify-center relative"
            style={centerStyle}
          >
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] xl:w-[460px]">
              <Image
                src={CUTOUT_IMAGE}
                alt="Ermond Poshka, Founder & Management"
                width={460}
                height={620}
                className="w-full h-auto object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 380px, 460px"
                priority
              />
            </div>
          </div>

          {/* ── RIGHT: Description ─────────────────────────── */}
          <div
            className="order-3 flex flex-col justify-end pb-4 lg:pb-36"
            style={rightStyle}
          >
            <p className="text-sm md:text-[15px] text-gray-500 dark:text-gray-400 leading-[1.9] max-w-[320px] lg:max-w-[280px] xl:max-w-[300px]">
              Ermond Poshka realized his dream of owning his own company and
              founded the sole proprietorship &ldquo;POSKA Plastering
              Business&rdquo; in Zurich. He gradually expanded his services,
              which his customers greatly appreciated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
