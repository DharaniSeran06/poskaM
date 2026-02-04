"use client";
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
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
    // Navigate to new locale using router.push
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
    setIsOpen(false);
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
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkmode shadow-xl dark:shadow-darkmd rounded-lg border border-gray-100 dark:border-dark_border z-50 overflow-hidden">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLanguage(loc)}
              className={`w-full px-4 py-3 text-left transition-all duration-200 ${
                locale === loc
                  ? 'bg-[#016aac] text-white'
                  : 'text-midnight_text dark:text-white hover:bg-[#f1f5f9] dark:hover:bg-semidark hover:text-[#016aac] dark:hover:text-[#016aac]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{languageNames[loc]}</span>
                <span className="text-xs opacity-70">({loc.toUpperCase()})</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
