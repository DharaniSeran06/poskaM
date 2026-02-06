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
 * - DISABLED ON MOBILE to prevent touch/click blocking issues
 * 
 * This ensures:
 * 1. Content is ALWAYS visible on first render (no blank screen)
 * 2. Animations enhance the experience after hydration (desktop only)
 * 3. Mobile devices have instant interactivity without AOS interference
 * 4. No flash of unstyled content (FOUC)
 */
const Aoscompo = ({children}: {children: React.ReactNode}) => {
    const initialized = useRef(false);

    useEffect(() => {
        // Only initialize AOS once
        if (initialized.current) return;
        initialized.current = true;
        
        // Check if we're on mobile - if so, skip AOS entirely to avoid interaction issues
        const isMobile = window.innerWidth < 768 || 
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // On mobile, just ensure all AOS elements are visible and interactive
            document.querySelectorAll('[data-aos]').forEach((el) => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'none';
                (el as HTMLElement).style.pointerEvents = 'auto';
            });
            return;
        }
        
        // Desktop: Load AOS JS after page is interactive
        const initAOS = async () => {
            try {
                const AOS = await import('aos');
                AOS.default.init({
                    duration: 600,
                    once: true,
                    offset: 30,
                    delay: 0,
                    easing: 'ease-out-cubic',
                    anchorPlacement: 'top-bottom',
                    initClassName: 'aos-init',
                    animatedClassName: 'aos-animate',
                    // CRITICAL: Disable on mobile to prevent interaction issues
                    disable: 'mobile',
                });
                
                // Refresh AOS after a short delay
                setTimeout(() => {
                    AOS.default.refresh();
                }, 500);
            } catch (error) {
                console.warn('AOS failed to load, using CSS fallback');
            }
        };

        // Use requestIdleCallback for non-blocking initialization
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(initAOS, { timeout: 1000 });
        } else {
            setTimeout(initAOS, 100);
        }
    }, []);

    // Always render children immediately - never return null
    return <>{children}</>;
}

export default Aoscompo;
