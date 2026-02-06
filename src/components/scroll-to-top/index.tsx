'use client'
import { useEffect, useState, useCallback } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setIsMounted(true);
    
    // Button is displayed after scrolling for 300 pixels
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position
    toggleVisibility();
    
    // Use passive listener for better scroll performance on mobile
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Don't render anything server-side to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`back-to-top flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-[#102C46] text-white shadow-md transition-all duration-300 ease-in-out hover:bg-[#016aac] hover:scale-110 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <span className="mt-[6px] h-3 w-3 rotate-45 border-l border-t border-white"></span>
      </button>
    </div>
  );
}
