"use client";
import { useState, useEffect, useRef } from 'react';
import { HeaderItem } from '@/types';
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
    }, 180);
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
    <div ref={dropdownRef} className="relative w-full mb-1.5">
      {/* Main Button */}
      <div className="flex items-center w-full gap-1">
        <button
          onClick={handleMainClick}
          className={`
            flex-1 flex items-center py-3.5 px-5 rounded-xl
            text-left font-medium text-[15px] tracking-tight
            transition-all duration-250 ease-out
            cursor-pointer
            ${isActive 
              ? 'bg-[#016aac] text-white' 
              : 'text-slate-700 dark:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 hover:text-[#016aac] dark:hover:text-[#3b9edd]'
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
              p-3 rounded-xl
              transition-all duration-250 ease-out
              cursor-pointer
              ${isActive 
                ? 'bg-[#016aac] text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 hover:text-[#016aac]'
              }
            `}
            aria-label="Toggle submenu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="1.25em" 
              height="1.25em" 
              viewBox="0 0 24 24"
              className={`transition-transform duration-300 ease-out ${submenuOpen ? 'rotate-180' : ''}`}
            >
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10l5 5l5-5" />
            </svg>
          </button>
        )}
      </div>

      {/* Premium Dropdown Submenu */}
      {submenuOpen && item.submenu && (
        <div 
          className={`
            relative w-full mt-2
            bg-white/[0.97] dark:bg-slate-900/[0.97]
            backdrop-blur-xl backdrop-saturate-150
            rounded-2xl
            overflow-hidden
            border-0
            ${isClosing ? 'dropdown-exit' : 'dropdown-enter'}
          `}
          style={{
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 8px 20px -8px rgba(1, 106, 172, 0.08)',
          }}
        >
          {/* Subtle top accent */}
          <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#016aac]/60 to-transparent rounded-full"></div>
          
          {/* Submenu Items */}
          <div className="py-3 px-2">
            {item.submenu.map((subItem, index) => {
              const isSubActive = subItem.href === path;
              return (
                <Link 
                  key={index} 
                  href={subItem.href}
                  onClick={() => closeDropdown()}
                  className={`
                    group flex items-center justify-between
                    py-3.5 px-4 mx-1 my-0.5
                    rounded-xl
                    transition-all duration-200 ease-out
                    cursor-pointer
                    font-medium text-[15px] leading-relaxed tracking-tight
                    active:scale-[0.98]
                    ${isSubActive 
                      ? 'bg-[#016aac] text-white' 
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-[#016aac] dark:hover:text-[#3b9edd]'
                    }
                  `}
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
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dropdownExit {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-4px);
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

export default MobileHeaderLink;
