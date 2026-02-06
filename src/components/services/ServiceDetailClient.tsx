"use client";

import dynamic from "next/dynamic";

// Dynamic imports with ssr: false must be in a client component
const BeforeAfterSlider = dynamic(
  () => import("@/components/shared/before-after-slider"),
  { 
    ssr: false, 
    loading: () => <div className="w-full aspect-[4/3] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl" /> 
  }
);

interface ServiceBeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  title: string;
  description: string;
}

export function ServiceBeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  title,
  description,
}: ServiceBeforeAfterProps) {
  return (
    <div className="my-16" data-aos="fade-up" data-aos-delay="100">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-midnight_text dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      <BeforeAfterSlider
        beforeImage={beforeImage}
        afterImage={afterImage}
        beforeLabel={beforeLabel}
        afterLabel={afterLabel}
        className="w-full"
      />
    </div>
  );
}
