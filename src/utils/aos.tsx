'use client'
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// Lazy load AOS CSS to reduce initial bundle size
const Aoscompo = ({children}:any) => {
    const [aosLoaded, setAosLoaded] = useState(false);

    useEffect(() => {
        // Load AOS only after page is interactive
        if (typeof window !== 'undefined') {
            import('aos').then((AOS) => {
                import('aos/dist/aos.css');
                AOS.default.init({
                    duration: 800,
                    once: false,
                    offset: 100, // Trigger animations earlier
                    delay: 0,
                });
                setAosLoaded(true);
            });
        }
    }, []);

    return (
        <div>
            {children}
        </div>
    );
}

export default Aoscompo;
