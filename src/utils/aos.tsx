'use client'
import { useEffect, useRef } from "react";
// Import AOS CSS synchronously to prevent style flickering
import 'aos/dist/aos.css';

/**
 * AOS (Animate On Scroll) wrapper component
 * 
 * CRITICAL FOR MOBILE:
 * - Children render IMMEDIATELY without waiting for AOS
 * - AOS animations are progressive enhancement only
 * - CSS is loaded synchronously to prevent layout shifts
 * 
 * This ensures:
 * 1. Content is ALWAYS visible on first render (no blank screen)
 * 2. Animations enhance the experience after hydration
 * 3. Mobile devices show content immediately even with slower JS
 * 4. No flash of unstyled content (FOUC)
 */
const Aoscompo = ({children}: {children: React.ReactNode}) => {
    const initialized = useRef(false);

    useEffect(() => {
        // Only initialize AOS once
        if (initialized.current) return;
        initialized.current = true;
        
        // Load AOS JS after page is interactive
        const initAOS = async () => {
            try {
                const AOS = await import('aos');
                AOS.default.init({
                    duration: 600, // Slightly faster for better mobile feel
                    once: true, // Only animate once for better performance
                    offset: 30, // Lower offset for better mobile experience
                    delay: 0,
                    easing: 'ease-out-cubic',
                    // Don't disable on mobile - use CSS to control visibility
                    anchorPlacement: 'top-bottom',
                    // Ensure elements are visible before AOS takes over
                    initClassName: 'aos-init',
                    animatedClassName: 'aos-animate',
                });
                
                // Refresh AOS after a short delay to catch any dynamically loaded content
                setTimeout(() => {
                    AOS.default.refresh();
                }, 500);
            } catch (error) {
                // If AOS fails to load, content is still visible via CSS fallback
                console.warn('AOS failed to load, using CSS fallback');
            }
        };

        // Use requestIdleCallback for non-blocking initialization on mobile
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(initAOS, { timeout: 500 });
        } else {
            // Fallback: use requestAnimationFrame for smoother initialization
            requestAnimationFrame(() => {
                setTimeout(initAOS, 50);
            });
        }
    }, []);

    // Always render children immediately - never return null
    // This ensures content is visible on first paint
    return <>{children}</>;
}

export default Aoscompo;
