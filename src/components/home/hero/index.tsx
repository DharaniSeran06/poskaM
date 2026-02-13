"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";

const Threads = dynamic(() => import("./Threads"), { ssr: false });

const Hero = () => {
  const t = useTranslations("home.hero");

  return (
    <section className="relative min-h-screen overflow-hidden bg-white flex items-center">

      {/* THREAD BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Threads
          color={[0.12, 0.44, 0.66]}
          amplitude={1.6}
          distance={0}
          enableMouseInteraction
        />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 w-full container mx-auto lg:max-w-screen-xl px-6 md:px-10 py-32 lg:py-40">
        <div className="flex flex-col items-start">

          <div className="mb-10 text-primary text-sm font-medium">
            {t("foundedIn")}
          </div>

          <h1 className="whitespace-nowrap text-[clamp(2rem,7vw,6.5rem)] font-bold leading-[1] tracking-tight text-midnight_text mb-6">
            POSKA MANOLITO AG
          </h1>

          <div className="w-16 h-[3px] rounded-full bg-primary mb-8" />

          <p className="max-w-3xl text-base md:text-lg tracking-[0.15em] uppercase font-medium text-gray mb-12">
            {t("plastering")}
            <span className="mx-3 text-primary/40">|</span>
            {t("facades")}
            <span className="mx-3 text-primary/40">|</span>
            {t("painting")}
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4
            bg-[#016aac] text-white rounded-lg
            hover:bg-[#015a94] transition-all duration-300
            font-semibold shadow-lg shadow-[#016aac]/20"
          >
            {t("contactUs")}
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Hero;
