"use client";
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect, useTransition } from 'react';
import { useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    setIsOpen(false);
    
    // Use startTransition for instant UI update without blocking
    startTransition(() => {
      // Use router.replace for instant navigation without adding to history
      router.replace(pathWithoutLocale as any, { locale: newLocale as any });
    });
  };

  const languageNames: Record<string, string> = {
    en: 'English',
    de: 'Deutsch'
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white hover:text-[#016aac] dark:hover:text-[#016aac] transition-colors cursor-pointer"
        aria-label="Change language"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-44 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl z-50 overflow-hidden py-2"
          style={{
            boxShadow: '0 8px 32px rgba(1, 106, 172, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#016aac] via-[#0184d6] to-[#016aac]"></div>
          
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLanguage(loc)}
              className={`group w-full px-4 py-2.5 mx-1.5 text-left transition-all duration-200 rounded-lg cursor-pointer ${
                locale === loc
                  ? 'bg-[#016aac] text-white'
                  : 'text-gray-700 dark:text-gray-100 hover:bg-[#016aac]/10 dark:hover:bg-[#016aac]/20 hover:text-[#016aac] dark:hover:text-[#0184d6]'
              }`}
              style={{ width: 'calc(100% - 12px)' }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-[15px]">
                  <span className={`
                    w-1.5 h-1.5 rounded-full transition-all duration-200
                    ${locale === loc 
                      ? 'bg-white' 
                      : 'bg-[#016aac]/50 group-hover:bg-[#016aac]'
                    }
                  `}></span>
                  {languageNames[loc]}
                </span>
                <span className={`text-xs ${locale === loc ? 'text-white/70' : 'text-gray-400'}`}>
                  {loc.toUpperCase()}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
