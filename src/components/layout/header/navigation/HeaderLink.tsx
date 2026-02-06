"use client"
import { useState, useEffect, useRef, useCallback } from 'react';
import { HeaderItem } from '@/types';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const path = usePathname();

  // Memoize the close handler to prevent stale closures
  const closeDropdown = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSubmenuOpen(false);
      setIsClosing(false);
    }, 180);
  }, []);

  // Handle click/touch outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (submenuOpen) {
      // Small delay to prevent immediate close on the same touch
      const timer = setTimeout(() => {
        // Add both mouse and touch events for cross-device support
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside, { passive: true });
      }, 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [submenuOpen, closeDropdown]);

  // Toggle dropdown on click/touch
  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (submenuOpen) {
      closeDropdown();
    } else {
      setSubmenuOpen(true);
    }
  };

  // Handle main link click
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
    <div ref={dropdownRef} className={`${item.submenu ? "relative" : ""}`} style={{ pointerEvents: 'auto' }}>
      {/* Main Link/Label */}
      {item.href === "#" || !item.href ? (
        <button
          onClick={handleToggleDropdown}
          onTouchEnd={(e) => { e.preventDefault(); handleToggleDropdown(e as unknown as React.MouseEvent); }}
          className={`
            text-base flex items-center gap-1.5 py-3 font-medium
            text-midnight_text hover:text-[#016aac] 
            dark:text-white dark:hover:text-[#016aac] 
            cursor-pointer transition-all duration-300
            ${isActive ? "!text-[#016aac]" : ""}
          `}
          style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
        >
          <span>{item.label}</span>
          {item.submenu && (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="1.1em" 
              height="1.1em" 
              viewBox="0 0 24 24"
              className={`transition-transform duration-300 ease-out ${submenuOpen ? 'rotate-180' : ''}`}
            >
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10l5 5l5-5" />
            </svg>
          )}
        </button>
      ) : (
        <div className="flex items-center" style={{ pointerEvents: 'auto' }}>
          <Link 
            href={item.href} 
            onClick={handleLinkClick}
            className={`
              text-base flex items-center gap-1.5 py-3 font-medium
              text-midnight_text hover:text-[#016aac] 
              dark:text-white dark:hover:text-[#016aac] 
              transition-all duration-300
              ${isActive ? '!text-[#016aac]' : ''}
              ${item.submenu ? 'cursor-pointer' : ''}
            `}
            style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
          >
            <span>{item.label}</span>
          </Link>
          {item.submenu && (
            <button
              onClick={handleToggleDropdown}
              onTouchEnd={(e) => { e.preventDefault(); handleToggleDropdown(e as unknown as React.MouseEvent); }}
              className={`
                p-1 ml-0.5 rounded-md
                text-midnight_text hover:text-[#016aac]
                dark:text-white dark:hover:text-[#016aac]
                transition-all duration-300 cursor-pointer
                ${isActive ? '!text-[#016aac]' : ''}
              `}
              style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
              aria-label="Toggle dropdown"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="1.1em" 
                height="1.1em" 
                viewBox="0 0 24 24"
                className={`transition-transform duration-300 ease-out ${submenuOpen ? 'rotate-180' : ''}`}
              >
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10l5 5l5-5" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Premium Dropdown Menu */}
      {submenuOpen && (
        <div 
          className={`
            absolute top-full left-0 mt-3 w-72
            bg-white/[0.97] dark:bg-slate-900/[0.97]
            backdrop-blur-xl backdrop-saturate-150
            rounded-2xl
            z-50
            overflow-hidden
            border-0
            ${isClosing ? 'dropdown-exit' : 'dropdown-enter'}
          `}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 12px 24px -8px rgba(1, 106, 172, 0.1)',
            pointerEvents: 'auto',
          }}
        >
          {/* Subtle top accent */}
          <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#016aac]/60 to-transparent rounded-full"></div>
          
          {/* Content Container */}
          <div className="py-3 px-2">
            {item.submenu?.map((subItem, index) => {
              const isSubActive = path === subItem.href;
              return (
                <Link 
                  key={index} 
                  href={subItem.href}
                  onClick={() => closeDropdown()}
                  className={`
                    group flex items-center justify-between
                    px-4 py-3.5 mx-1 my-0.5
                    rounded-xl
                    transition-all duration-200 ease-out
                    cursor-pointer
                    font-medium text-[15px] leading-relaxed tracking-tight
                    ${isSubActive 
                      ? 'bg-[#016aac] text-white' 
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-[#016aac] dark:hover:text-[#3b9edd]'
                    }
                  `}
                  style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
                >
                  <span>{subItem.label}</span>
                  
                  {/* Hover arrow indicator */}
                  <svg 
                    className={`
                      w-4 h-4 flex-shrink-0 transition-all duration-200
                      ${isSubActive 
                        ? 'text-white/90 opacity-100' 
                        : 'text-[#016aac] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                      }
                    `}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
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

export default HeaderLink;
