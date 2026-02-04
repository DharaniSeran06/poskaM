"use client"
import { useState } from 'react';
import { HeaderItem } from '../../../../types/layout/menu';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname()
  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (item.href === "#" || !item.href) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={`${item.submenu ? "relative" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.href === "#" || !item.href ? (
        <span className={`text-base flex py-3 font-normal text-midnight_text hover:text-[#016aac] dark:text-white dark:hover:text-[#016aac] cursor-pointer transition-colors ${path.startsWith(`/${item.label.toLowerCase()}`) ? "!text-[#016aac] " : null}`}>
          {item.label}
          {item.submenu && (
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
            </svg>
          )}
        </span>
      ) : (
        <Link href={item.href} onClick={handleClick} className={`text-base flex py-3 font-normal text-midnight_text hover:text-[#016aac] dark:text-white dark:hover:text-[#016aac] transition-colors ${path === item.href ? '!text-[#016aac]' : ' text-black dark:text-white '} ${path.startsWith(`/${item.label.toLowerCase()}`) ? "!text-[#016aac] " : null} ${path === '/projects' && item.href === '/projects' ? '!text-[#016aac]' : ''}`}>
          {item.label}
          {item.submenu && (
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
            </svg>
          )}
        </Link>
      )}
      {submenuOpen && (
        <div 
          className="absolute py-2 top-9 left-0 mt-0.5 w-64 bg-white dark:bg-darkmode shadow-xl dark:shadow-darkmd rounded-lg border border-gray-100 dark:border-dark_border z-50"
          style={{
            animation: 'fadeInDown 0.3s ease-out'
          }}
        >
          {item.submenu?.map((subItem, index) => (
            <Link 
              key={index} 
              href={subItem.href} 
              className={`block px-4 py-3 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${
                path === subItem.href 
                  ? 'text-white bg-[#016aac] hover:bg-[#015a94]' 
                  : 'text-midnight_text dark:text-white hover:bg-[#f1f5f9] dark:hover:bg-semidark hover:text-[#016aac] dark:hover:text-[#016aac]'
              }`}
              style={{
                animation: `fadeInDown 0.3s ease-out ${index * 0.05}s both`
              }}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )
      }
    </div >
  );
};

export default HeaderLink;