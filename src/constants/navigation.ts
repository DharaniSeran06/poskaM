// Navigation menu items - customize as needed
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
] as const;

// Footer navigation
export const FOOTER_NAV = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/about/our-story' },
    { label: 'Careers', href: '/vacancies' },
  ],
  services: [
    { label: 'Construction', href: '/services/construction' },
    { label: 'Renovation', href: '/services/renovation' },
    { label: 'Facades', href: '/services/facades' },
  ],
  support: [
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
} as const;
