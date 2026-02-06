'use client'
import { useEffect, useRef } from "react";

/**
 * AOS (Animate On Scroll) wrapper component
 * 
 * IMPORTANT: Children render immediately without waiting for AOS.
 * AOS animations are progressive enhancement only.
 * 
 * This ensures:
 * 1. Content is ALWAYS visible on first render (no blank screen)
 * 2. Animations enhance the experience after hydration
 * 3. Mobile devices show content immediately even with slower JS
 */
const Aoscompo = ({children}: {children: React.ReactNode}) => {
    const initialized = useRef(false);

    useEffect(() => {
        // Only initialize AOS once
        if (initialized.current) return;
        initialized.current = true;
        
        // Load AOS only after page is interactive
        // Use requestIdleCallback for better performance on mobile
        const initAOS = () => {
            import('aos').then((AOS) => {
                import('aos/dist/aos.css');
                AOS.default.init({
                    duration: 800,
                    once: true, // Only animate once for better performance
                    offset: 50, // Reduced offset for better mobile experience
                    delay: 0,
                    // Remove disable: 'mobile' - it can cause visibility issues
                    // Instead, use reduced animations on mobile via CSS
                    easing: 'ease-out-cubic',
                    // Start with opacity: 1 so content is visible while AOS loads
                    startEvent: 'DOMContentLoaded',
                });
            }).catch(() => {
                // If AOS fails to load, content is still visible
                // This is just progressive enhancement
            });
        };

        // Delay AOS initialization slightly to prioritize content rendering
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(initAOS, { timeout: 1000 });
        } else {
            // Fallback for browsers without requestIdleCallback
            setTimeout(initAOS, 100);
        }
    }, []);

    // Always render children immediately - never return null
    // This ensures content is visible on first paint
    return <>{children}</>;
}

export default Aoscompo;
