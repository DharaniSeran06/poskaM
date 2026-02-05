"use client";
import { useState, useEffect, useRef } from 'react';
import { HeaderItem } from '../../../../types/layout/menu';
import { usePathname, useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const path = usePathname();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (submenuOpen) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 10);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [submenuOpen]);

  // Close dropdown with animation
  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSubmenuOpen(false);
      setIsClosing(false);
    }, 200);
  };

  // Toggle dropdown
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (submenuOpen) {
      closeDropdown();
    } else {
      setSubmenuOpen(true);
    }
  };

  // Navigate to link
  const handleNav = () => {
    if (item.href && item.href !== "#") {
      router.push(item.href);
    }
  };

  // Handle main button click
  const handleMainClick = (e: React.MouseEvent) => {
    if (item.submenu && item.submenu.length > 0) {
      e.preventDefault();
      if (!submenuOpen) {
        setSubmenuOpen(true);
      }
    } else {
      handleNav();
    }
  };

  const isActive = path === item.href || path.startsWith(`/${item.label.toLowerCase()}`);

  return (
    <div ref={dropdownRef} className="relative w-full mb-1">
      {/* Main Button */}
      <div className="flex items-center w-full">
        <button
          onClick={handleMainClick}
          className={`
            flex-1 flex items-center py-3 px-4 rounded-xl
            text-left font-medium
            transition-all duration-300 ease-out
            cursor-pointer
            ${isActive 
              ? 'bg-[#016aac] text-white shadow-md shadow-[#016aac]/25' 
              : 'text-gray-800 dark:text-gray-100 hover:bg-[#016aac]/8 dark:hover:bg-[#016aac]/15 hover:text-[#016aac] dark:hover:text-[#016aac]'
            }
          `}
        >
          <span>{item.label}</span>
        </button>
        
        {/* Separate toggle button for items with submenu */}
        {item.submenu && item.submenu.length > 0 && (
          <button
            onClick={handleToggle}
            className={`
              p-3 ml-1 rounded-xl
              transition-all duration-300 ease-out
              cursor-pointer
              ${isActive 
                ? 'bg-[#016aac] text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-[#016aac]/10 dark:hover:bg-[#016aac]/20 hover:text-[#016aac]'
              }
            `}
            aria-label="Toggle submenu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="1.25em" 
              height="1.25em" 
              viewBox="0 0 24 24"
              className={`transition-transform duration-300 ${submenuOpen ? 'rotate-180' : ''}`}
            >
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10l5 5l5-5" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown Submenu */}
      {submenuOpen && item.submenu && (
        <div 
          className={`
            relative bg-white/98 dark:bg-darklight/98 
            backdrop-blur-xl py-2 px-2 w-full 
            rounded-xl mt-2 
            border border-gray-100 dark:border-gray-700/40
            overflow-hidden
            ${isClosing ? 'animate-fadeOutUp' : 'animate-fadeInDown'}
          `}
          style={{
            boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
          }}
        >
          {/* Accent line at top */}
          <div className="absolute top-0 left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-[#016aac]/50 to-transparent"></div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#016aac]/3 via-transparent to-transparent dark:from-[#016aac]/8 pointer-events-none z-0"></div>
          
          {/* Submenu Items */}
          <div className="relative z-10 pt-1">
            {item.submenu.map((subItem, index) => {
              const isSubActive = subItem.href === path;
              return (
                <Link 
                  key={index} 
                  href={subItem.href}
                  onClick={() => closeDropdown()}
                  className={`
                    group relative flex items-center justify-between py-3 px-4 my-0.5
                    rounded-xl 
                    transition-all duration-300 ease-out
                    cursor-pointer
                    font-medium
                    ${isSubActive 
                      ? 'text-white bg-gradient-to-r from-[#016aac] to-[#015a94] shadow-md shadow-[#016aac]/20' 
                      : 'text-gray-700 dark:text-gray-200 hover:text-[#016aac] dark:hover:text-[#016aac] hover:bg-[#016aac]/8 dark:hover:bg-[#016aac]/15 active:scale-[0.98]'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 0.04}s`
                  }}
                >
                  <span className="flex items-center gap-3">
                    {/* Indicator dot */}
                    <span className={`
                      w-1.5 h-1.5 rounded-full transition-all duration-300
                      ${isSubActive 
                        ? 'bg-white' 
                        : 'bg-[#016aac]/30 group-hover:bg-[#016aac] group-hover:scale-125'
                      }
                    `}></span>
                    {subItem.label}
                  </span>
                  
                  {/* Active checkmark or hover arrow */}
                  {isSubActive ? (
                    <svg 
                      className="w-4 h-4 text-white flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  ) : (
                    <svg 
                      className="w-4 h-4 text-[#016aac] opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-8px);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fadeOutUp {
          animation: fadeOutUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default MobileHeaderLink;
