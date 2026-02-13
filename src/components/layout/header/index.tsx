"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import Logo from "./logo";
import HeaderLink from "./navigation/HeaderLink";
import MobileHeaderLink from "./navigation/MobileHeaderLink";
import LanguageSwitcher from "./LanguageSwitcher";

// Default navigation data for immediate render (prevents blank header on mobile)
const DEFAULT_NAV_DATA = [
  { label: 'Home', url: '/' },
  { label: 'Services', url: '/services' },
  { label: 'Projects', url: '/projects' },
  { label: 'Company', url: '/about', submenu: [
    { label: 'About Us', url: '/about' },
    { label: 'Vacancies', url: '/vacancies' }
  ]},
  { label: 'Contact', url: '/contact' },
];

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const t = useTranslations('navbar');
  const locale = useLocale();
  
  // Track mounted state to prevent hydration mismatches
  const [mounted, setMounted] = useState(false);
  
  // Session state - loaded dynamically to avoid next-auth URL errors when not configured
  const [session, setSession] = useState<any>(null);
  
  // Mark component as mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper function to translate header data - defined before useState to use in initial state
  const translateHeaderData = (headerData: any[], translator: typeof t) => {
    return headerData?.map((item: any) => ({
      ...item,
      label: item.label === 'Home' ? translator('home') :
             item.label === 'Services' ? translator('services') :
             item.label === 'Company' ? translator('company') :
             item.label === 'References' ? translator('projects') :
             item.label === 'Projects' ? translator('projects') :
             item.label === 'Contact' ? translator('contact') : item.label,
      submenu: item.submenu?.map((sub: any) => ({
        ...sub,
        label: sub.label === 'About Us' ? translator('submenu.aboutUs') : 
               sub.label === 'Vacancies' ? translator('submenu.vacancies') : sub.label
      }))
    })) || []
  };

  // Start with translated default navigation data for immediate render
  const [data, setData] = useState<any[]>(() => translateHeaderData(DEFAULT_NAV_DATA, t));
  const [user, setUser] = useState<{ user: any } | null>(null);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Memoized close function for mobile navbar
  const closeMobileNav = useCallback(() => {
    setNavbarOpen(false);
  }, []);

  // Auto-close mobile navbar on route change
  useEffect(() => {
    // Close navbar when path changes (user navigated)
    setNavbarOpen(false);
  }, [pathUrl]);

  // Company contact info
  const PHONE_NUMBER = "+41 52 347 25 40";
  const PHONE_LINK = "tel:+41523472540";
  const EMAIL = "info@poskamanolito.ch";

  // Function to handle scroll to set sticky class
  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  // Function to handle click outside
  const handleClickOutside = (event: MouseEvent) => {
    if (signInRef.current && !signInRef.current.contains(event.target as Node)) {
      setIsSignInOpen(false);
    }
    if (signUpRef.current && !signUpRef.current.contains(event.target as Node)) {
      setIsSignUpOpen(false);
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && navbarOpen) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen]);

  useEffect(() => {
    // SSR guard - only access window/localStorage on client
    if (typeof window === 'undefined') return;
    
    window.addEventListener("scroll", handleScroll);
    
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      // localStorage may not be available
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathUrl]);

  useEffect(() => {
    // SSR guard - only access sessionStorage on client
    if (typeof window === 'undefined') return;
    
    const cacheKey = `header-data-${locale}`;
    
    // Try to get cached data with error handling
    let cachedData: string | null = null;
    try {
      cachedData = sessionStorage.getItem(cacheKey);
    } catch (e) {
      // sessionStorage may not be available
    }
    
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        // Use cached data immediately for instant navigation
        const translatedData = translateHeaderData(parsed, t);
        setData(translatedData);
        return; // Don't refetch if we have cached data
      } catch (e) {
        // Cache invalid, will fetch fresh data
      }
    }
    
    const fetchData = async () => {
      try {
        // Fetch header data with current locale and cache hint
        const res = await fetch(`/api/layoutdata?locale=${locale}`, {
          next: { revalidate: 3600 } // Cache for 1 hour
        })
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        
        // Cache raw data in sessionStorage for instant access on navigation
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(data?.headerData || []));
        } catch (e) {
          // sessionStorage may be full or unavailable
        }
        
        const translatedData = translateHeaderData(data?.headerData || [], t);
        setData(translatedData)
      } catch (error) {
        console.error('❌ Navbar: Error fetching header data:', error)
      }
    }

    fetchData()
  }, [locale, t]) // Refetch when locale or translations change

  const handleSignOut = async () => {
    try {
      localStorage.removeItem("user");
    } catch (e) {
      // localStorage may not be available
    }
    try {
      const { signOut } = await import("next-auth/react");
      signOut();
    } catch (e) {
      // NextAuth not configured
    }
    setUser(null);
  };

  return (
    <header
      className={`fixed top-0 z-[9999] w-full transition-all ${sticky ? "shadow-lg dark:shadow-darkmd bg-white dark:bg-semidark" : "bg-white dark:bg-semidark"}`}
      style={{ 
        pointerEvents: 'auto',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {/* Top Contact Bar - Desktop */}
      <div className="bg-[#016aac] text-white py-2 hidden lg:block">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="flex items-center justify-end space-x-6 text-sm">
            <a href={PHONE_LINK} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{PHONE_NUMBER}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{EMAIL}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Contact Bar - Always visible on mobile */}
      <div className="bg-[#016aac] text-white py-2 lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* Phone - Tappable */}
            <a 
              href={PHONE_LINK} 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity active:scale-95"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium whitespace-nowrap">{PHONE_NUMBER}</span>
            </a>
            
            {/* Divider */}
            <span className="w-px h-4 bg-white/30"></span>
            
            {/* Email */}
            <a 
              href={`mailto:${EMAIL}`} 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity active:scale-95"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium whitespace-nowrap">{EMAIL}</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md flex items-center justify-between px-4 py-3 relative z-[10]">
        <Logo />
        <nav className="hidden lg:flex flex-grow items-center justify-center space-x-8" style={{ pointerEvents: 'auto' }}>
          {data.map((item:any, index:any) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          {/* Search Icon */}
          <button
            onClick={() => router.push('/search')}
            aria-label="Search"
            className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white hover:scale-110 transition-transform"
          >
            <svg
              className={`h-5 w-5 ${!sticky && pathUrl === "/" && "text-white"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <Link
            href="/contact"
            className="hidden lg:block bg-[#016aac] text-white px-6 py-2.5 rounded-lg hover:bg-[#015a94] transition-colors font-medium shadow-md"
          >
            {t('getQuote')}
          </Link>

          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="block lg:hidden p-2 rounded-lg"
            aria-label="Toggle mobile menu"
          >
            <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
            <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
            <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
          </button>
        </div>
      </div>
      {navbarOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" />
      )}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 z-50 right-0 h-full w-full bg-white dark:bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark_border">
          <h2 className="text-lg font-bold text-midnight_text dark:text-white">{t('menu')}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                router.push('/search');
                setNavbarOpen(false);
              }}
              aria-label="Search"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="h-5 w-5 text-midnight_text dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button onClick={() => setNavbarOpen(false)} aria-label="Close mobile menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="dark:text-white">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Contact Info - Quick Access */}
        <div className="p-4 bg-[#016aac] text-white">
          <div className="space-y-3">
            {/* Phone - Primary CTA */}
            <a 
              href={PHONE_LINK} 
              className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors active:scale-[0.98]"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span className="text-xs opacity-80 block">Call Us</span>
                <span className="font-semibold text-base">{PHONE_NUMBER}</span>
              </div>
            </a>
            
            {/* Email */}
            <a 
              href={`mailto:${EMAIL}`} 
              className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors active:scale-[0.98]"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-xs opacity-80 block">Email Us</span>
                <span className="font-semibold text-sm break-all">{EMAIL}</span>
              </div>
            </a>
          </div>
        </div>
        
        <nav className="flex flex-col items-start p-4">
          {data.map((item:any, index:any) => (
            <MobileHeaderLink key={index} item={item} onNavigate={closeMobileNav} />
          ))}
          <div className="mt-4 w-full">
            <Link
              href="/contact"
              className="block w-full text-center bg-[#016aac] text-white px-4 py-2.5 rounded-lg hover:bg-[#015a94] transition-colors font-medium shadow-md"
              onClick={() => {
                setNavbarOpen(false);
              }}
            >
              {t('getQuote')}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
