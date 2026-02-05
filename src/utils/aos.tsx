'use client'
import { useEffect, useRef } from "react";

// AOS wrapper component - loads AOS only once and doesn't re-render children
const Aoscompo = ({children}:any) => {
    const initialized = useRef(false);

    useEffect(() => {
        // Only initialize AOS once
        if (initialized.current) return;
        initialized.current = true;
        
        // Load AOS only after page is interactive
        if (typeof window !== 'undefined') {
            import('aos').then((AOS) => {
                import('aos/dist/aos.css');
                AOS.default.init({
                    duration: 800,
                    once: true, // Only animate once for better performance
                    offset: 100,
                    delay: 0,
                    disable: 'mobile', // Disable on mobile for instant feel
                });
            });
        }
    }, []);

    return <>{children}</>;
}

export default Aoscompo;
