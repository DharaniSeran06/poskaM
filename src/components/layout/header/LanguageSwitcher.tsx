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
  const [isClosing, setIsClosing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 180);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      setIsOpen(true);
    }
  };

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    closeDropdown();
    
    startTransition(() => {
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
        onClick={toggleDropdown}
        className={`
          flex h-9 w-9 items-center justify-center rounded-lg
          text-slate-600 dark:text-slate-300
          hover:text-[#016aac] dark:hover:text-[#016aac]
          hover:bg-slate-100/80 dark:hover:bg-slate-800/50
          transition-all duration-250 ease-out cursor-pointer
          ${isOpen ? 'text-[#016aac] bg-slate-100/80 dark:bg-slate-800/50' : ''}
        `}
        aria-label="Change language"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className={`
            absolute right-0 mt-3 w-48
            bg-white/[0.97] dark:bg-slate-900/[0.97]
            backdrop-blur-xl backdrop-saturate-150
            rounded-2xl
            z-50 overflow-hidden
            border-0
            ${isClosing ? 'dropdown-exit' : 'dropdown-enter'}
          `}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 12px 24px -8px rgba(1, 106, 172, 0.1)',
          }}
        >
          {/* Subtle top accent */}
          <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#016aac]/60 to-transparent rounded-full"></div>
          
          {/* Content */}
          <div className="py-3 px-2">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLanguage(loc)}
                className={`
                  group w-full flex items-center justify-between
                  px-4 py-3 mx-1 my-0.5
                  rounded-xl
                  transition-all duration-200 ease-out
                  cursor-pointer
                  font-medium text-[15px] tracking-tight
                  ${locale === loc
                    ? 'bg-[#016aac] text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-[#016aac] dark:hover:text-[#3b9edd]'
                  }
                `}
                style={{ width: 'calc(100% - 8px)' }}
              >
                <span>{languageNames[loc]}</span>
                <span className={`
                  text-xs font-semibold tracking-wider px-2 py-0.5 rounded-md
                  ${locale === loc 
                    ? 'text-white/80 bg-white/20' 
                    : 'text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/60'
                  }
                `}>
                  {loc.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Animations */}
      <style jsx>{`
        @keyframes dropdownEnter {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes dropdownExit {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-6px) scale(0.97);
          }
        }
        .dropdown-enter {
          animation: dropdownEnter 0.22s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
        .dropdown-exit {
          animation: dropdownExit 0.18s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;
