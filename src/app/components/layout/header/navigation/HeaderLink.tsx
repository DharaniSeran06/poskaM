"use client"
import { useState, useEffect, useRef } from 'react';
import { HeaderItem } from '../../../../types/layout/menu';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const path = usePathname();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (submenuOpen) {
      // Add small delay to prevent immediate close on open click
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

  // Toggle dropdown on click
  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (submenuOpen) {
      closeDropdown();
    } else {
      setSubmenuOpen(true);
    }
  };

  // Handle main link click - opens dropdown if has submenu
  const handleLinkClick = (e: React.MouseEvent) => {
    if (item.submenu && item.submenu.length > 0) {
      e.preventDefault();
      if (!submenuOpen) {
        setSubmenuOpen(true);
      }
    }
  };

  const isActive = path === item.href || path.startsWith(`/${item.label.toLowerCase()}`);

  return (
    <div ref={dropdownRef} className={`${item.submenu ? "relative" : ""}`}>
      {/* Main Link/Label */}
      {item.href === "#" || !item.href ? (
        <button
          onClick={handleToggleDropdown}
          className={`
            text-base flex items-center gap-1 py-3 font-medium
            text-midnight_text hover:text-[#016aac] 
            dark:text-white dark:hover:text-[#016aac] 
            cursor-pointer transition-all duration-300
            ${isActive ? "!text-[#016aac]" : ""}
          `}
        >
          <span>{item.label}</span>
          {item.submenu && (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="1.2em" 
              height="1.2em" 
              viewBox="0 0 24 24"
              className={`transition-transform duration-300 ${submenuOpen ? 'rotate-180' : ''}`}
            >
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10l5 5l5-5" />
            </svg>
          )}
        </button>
      ) : (
        <div className="flex items-center">
          <Link 
            href={item.href} 
            onClick={handleLinkClick}
            className={`
              text-base flex items-center gap-1 py-3 font-medium
              text-midnight_text hover:text-[#016aac] 
              dark:text-white dark:hover:text-[#016aac] 
              transition-all duration-300
              ${isActive ? '!text-[#016aac]' : ''}
              ${item.submenu ? 'cursor-pointer' : ''}
            `}
          >
            <span>{item.label}</span>
          </Link>
          {item.submenu && (
            <button
              onClick={handleToggleDropdown}
              className={`
                p-1 ml-0.5 rounded-md
                text-midnight_text hover:text-[#016aac] hover:bg-[#016aac]/10
                dark:text-white dark:hover:text-[#016aac] dark:hover:bg-[#016aac]/20
                transition-all duration-300 cursor-pointer
                ${isActive ? '!text-[#016aac]' : ''}
              `}
              aria-label="Toggle dropdown"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="1.2em" 
                height="1.2em" 
                viewBox="0 0 24 24"
                className={`transition-transform duration-300 ${submenuOpen ? 'rotate-180' : ''}`}
              >
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10l5 5l5-5" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Dropdown Menu */}
      {submenuOpen && (
        <div 
          className={`
            absolute py-3 top-full left-0 mt-2 w-72 
            bg-white/98 dark:bg-darkmode/98
            backdrop-blur-xl
            rounded-2xl 
            z-50
            overflow-hidden
            border border-gray-100 dark:border-gray-700/40
            ${isClosing ? 'animate-fadeOutUp' : 'animate-fadeInDown'}
          `}
          style={{
            boxShadow: '0 10px 40px -8px rgba(0, 0, 0, 0.15), 0 4px 12px -4px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Accent line at top */}
          <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#016aac] to-transparent"></div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#016aac]/3 via-transparent to-transparent dark:from-[#016aac]/8 pointer-events-none z-0"></div>
          
          {/* Content */}
          <div className="relative z-10 pt-1">
            {item.submenu?.map((subItem, index) => {
              const isSubActive = path === subItem.href;
              return (
                <Link 
                  key={index} 
                  href={subItem.href}
                  onClick={() => closeDropdown()}
                  className={`
                    group relative flex items-center justify-between px-5 py-3.5 mx-2.5 my-1
                    rounded-xl
                    transition-all duration-300 ease-out
                    cursor-pointer
                    font-medium
                    ${isSubActive 
                      ? 'text-white bg-gradient-to-r from-[#016aac] to-[#015a94] shadow-lg shadow-[#016aac]/25' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-[#016aac]/8 dark:hover:bg-[#016aac]/15 hover:text-[#016aac] dark:hover:text-[#016aac] hover:translate-x-1'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  <span className="flex items-center gap-3">
                    {/* Optional: Add icon based on label */}
                    <span className={`
                      w-1.5 h-1.5 rounded-full transition-all duration-300
                      ${isSubActive 
                        ? 'bg-white' 
                        : 'bg-[#016aac]/40 group-hover:bg-[#016aac] group-hover:scale-125'
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
                      className="w-4 h-4 text-[#016aac] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0" 
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
            transform: translateY(-10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeOutUp {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
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

export default HeaderLink;