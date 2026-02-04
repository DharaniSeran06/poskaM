"use client";
import { useState } from 'react';
import { HeaderItem } from '../../../../types/layout/menu';
import { usePathname, useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };
  const router = useRouter();

  const handlenav = () => {
    if (item.href && item.href !== "#") {
      router.push(item.href);
    }
  }

  const path = usePathname();

  return (
    <div className="relative w-full">
      <button
        onClick={item.submenu ? handleToggle : handlenav}
        className={`flex items-center justify-between w-full py-2 px-3 rounded-md text-black focus:outline-none dark:text-white dark:text-opacity-60 ${path === item.href ? 'bg-primary text-white dark:bg-primary dark:text-white dark:text-opacity-100' : ' text-black dark:text-white '} ${path.startsWith(`/${item.label.toLowerCase()}`) ? "bg-primary text-white dark:bg-primary dark:text-white dark:text-opacity-100 " : null}`}
      >
        {item.label}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
          </svg>
        )}
      </button>
      {submenuOpen && item.submenu && (
        <div className="bg-white dark:bg-darkmode py-2 px-3 w-full transition-all duration-300">
          {item.submenu.map((subItem, index) => (
            <Link 
              key={index} 
              href={subItem.href} 
              className={`block py-2 px-3 rounded-md transition-all duration-200 ${
                subItem.href === path 
                  ? '!text-[#016aac] dark:text-[#016aac] bg-[#016aac]/10 font-semibold' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-[#016aac] hover:bg-[#016aac]/5'
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
