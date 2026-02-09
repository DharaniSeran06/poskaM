"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ── Count-up hook ─────────────────────────────────────── */

function useCountUp(
  target: number,
  started: boolean,
  duration = 2000,
  skip = false
) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (skip) {
      setCurrent(target);
      return;
    }
    if (!started) return;

    let raf: number;
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      // ease-out quart for smooth deceleration
      const eased = 1 - Math.pow(1 - p, 4);
      setCurrent(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, started, duration, skip]);

  return current;
}

/* ── Icons (inline SVGs matching Lucide style) ─────────── */

const CalendarIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
    />
  </svg>
);

const ProjectIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
    />
  </svg>
);

const SmileIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
    />
  </svg>
);

const TrophyIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m0 0a6.023 6.023 0 01-2.77-.896"
    />
  </svg>
);

/* ── Data ──────────────────────────────────────────────── */

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
}

const STATS: Stat[] = [
  {
    value: 2003,
    suffix: "",
    label: "Founded",
    icon: <CalendarIcon />,
    gradient: "from-[#016aac] to-[#4da8e0]",
    glowColor: "rgba(1, 106, 172, 0.15)",
  },
  {
    value: 250,
    suffix: "+",
    label: "Completed Projects",
    icon: <ProjectIcon />,
    gradient: "from-[#0288d1] to-[#26c6da]",
    glowColor: "rgba(2, 136, 209, 0.15)",
  },
  {
    value: 180,
    suffix: "+",
    label: "Happy Clients",
    icon: <SmileIcon />,
    gradient: "from-[#0277bd] to-[#4fc3f7]",
    glowColor: "rgba(2, 119, 189, 0.15)",
  },
  {
    value: 25,
    suffix: "+",
    label: "Awards",
    icon: <TrophyIcon />,
    gradient: "from-[#01579b] to-[#039be5]",
    glowColor: "rgba(1, 87, 155, 0.15)",
  },
];

/* ── Stat Card ─────────────────────────────────────────── */

function StatCard({
  stat,
  index,
  started,
  noMotion,
}: {
  stat: Stat;
  index: number;
  started: boolean;
  noMotion: boolean;
}) {
  const count = useCountUp(stat.value, started, 2000, noMotion);

  /* Framer Motion variants */
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  /* Subtle float keyframes via CSS */
  const floatDelay = index * 0.8;

  return (
    <motion.div
      variants={noMotion ? {} : cardVariants}
      initial={noMotion ? "visible" : "hidden"}
      animate={started ? "visible" : "hidden"}
      whileHover={
        noMotion
          ? {}
          : {
              scale: 1.05,
              y: -6,
              transition: { duration: 0.3, ease: "easeOut" },
            }
      }
      className="group relative"
    >
      {/* Glow layer (visible on hover) */}
      <div
        className="absolute -inset-[1px] rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{ background: stat.glowColor }}
      />

      {/* Card */}
      <div
        className="relative overflow-hidden rounded-[20px] p-8 md:p-10
          bg-white/80 dark:bg-[#1a2332]/80
          backdrop-blur-xl
          shadow-[0_4px_30px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.03)]
          dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]
          border border-white/60 dark:border-white/[0.06]
          transition-shadow duration-500
          group-hover:shadow-[0_20px_60px_rgba(1,106,172,0.12),0_4px_20px_rgba(0,0,0,0.04)]
          dark:group-hover:shadow-[0_20px_60px_rgba(1,106,172,0.2)]"
        style={{ animation: noMotion ? "none" : `statsFloat 6s ease-in-out ${floatDelay}s infinite` }}
      >
        {/* Gradient hover overlay */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 bg-gradient-to-br ${stat.gradient} pointer-events-none`}
        />

        {/* Top accent gradient bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${stat.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Icon badge */}
        <div className="mb-6">
          <div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl
              bg-gradient-to-br ${stat.gradient} bg-opacity-10
              text-white shadow-lg shadow-[#016aac]/10
              group-hover:rotate-[8deg] transition-transform duration-500 ease-out`}
            style={{
              background: `linear-gradient(135deg, rgba(1,106,172,0.08), rgba(77,168,224,0.12))`,
            }}
          >
            <span className="text-[#016aac] dark:text-[#4da8e0] group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </span>
          </div>
        </div>

        {/* Animated number */}
        <p className="text-[2.75rem] md:text-[3.5rem] lg:text-[3.75rem] font-extrabold tabular-nums leading-none mb-3 tracking-tight">
          <span className="bg-gradient-to-r from-[#013d64] via-[#016aac] to-[#4da8e0] dark:from-[#4da8e0] dark:via-[#7dc8f0] dark:to-white bg-clip-text text-transparent">
            {noMotion ? stat.value : count}
          </span>
          <span className="bg-gradient-to-r from-[#016aac]/50 to-[#4da8e0]/50 bg-clip-text text-transparent">
            {stat.suffix}
          </span>
        </p>

        {/* Small underline */}
        <div
          className={`w-10 h-[2.5px] rounded-full bg-gradient-to-r ${stat.gradient} mb-4
            group-hover:w-16 transition-all duration-500 ease-out opacity-60 group-hover:opacity-100`}
        />

        {/* Label */}
        <p className="text-sm md:text-[15px] text-gray-500 dark:text-gray-400 font-semibold tracking-wide uppercase">
          {stat.label}
        </p>

        {/* Decorative corner circle */}
        <div
          className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, #016aac 0%, transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ── Section ───────────────────────────────────────────── */

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const noMotion = prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f6fafd] dark:bg-darkmode py-24 lg:py-32 overflow-hidden"
    >
      {/* ── Background decorative blobs ─────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large top-left blob */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.35]"
          style={{
            background:
              "radial-gradient(circle, rgba(1,106,172,0.12) 0%, rgba(77,168,224,0.06) 40%, transparent 70%)",
            animation: noMotion ? "none" : "blobDrift1 18s ease-in-out infinite",
          }}
        />
        {/* Medium right blob */}
        <div
          className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.3]"
          style={{
            background:
              "radial-gradient(circle, rgba(77,168,224,0.1) 0%, rgba(1,106,172,0.04) 50%, transparent 70%)",
            animation: noMotion ? "none" : "blobDrift2 22s ease-in-out infinite",
          }}
        />
        {/* Small bottom blob */}
        <div
          className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full opacity-[0.25]"
          style={{
            background:
              "radial-gradient(circle, rgba(1,106,172,0.08) 0%, rgba(77,168,224,0.04) 40%, transparent 70%)",
            animation: noMotion ? "none" : "blobDrift3 20s ease-in-out infinite",
          }}
        />
        {/* Subtle light gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(246,250,253,0.5) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-5 md:px-10 lg:px-12">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={noMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : noMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#016aac] dark:text-[#4da8e0] font-semibold mb-4">
            Our Numbers
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-midnight_text dark:text-white tracking-tight">
            Achievements That Define Us
          </h2>
          <div className="mt-5 mx-auto w-16 h-[3px] rounded-full bg-gradient-to-r from-[#016aac] to-[#4da8e0] opacity-60" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              started={isInView}
              noMotion={noMotion}
            />
          ))}
        </div>
      </div>

      {/* ── CSS Keyframes (scoped via style tag) ────────── */}
      <style jsx>{`
        @keyframes statsFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes blobDrift1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, 20px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 10px) scale(0.97);
          }
        }
        @keyframes blobDrift2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-25px, 15px) scale(1.03);
          }
          66% {
            transform: translate(15px, -20px) scale(0.98);
          }
        }
        @keyframes blobDrift3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -15px) scale(1.04);
          }
        }
      `}</style>
    </section>
  );
}
