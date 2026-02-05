# Project Restructure Guide: Next.js App Router + Sanity CMS

## ✅ RESTRUCTURE COMPLETED

**Date:** February 5, 2026

All tasks have been successfully completed! The project now follows a clean, professional, and scalable folder structure.

---

## 📋 Issues That Were Fixed

1. **Components inside `app/` folder** - Components should not live inside the app directory
2. **Types scattered inside `app/`** - Types should be centralized at src level
3. **Data folder inside `app/`** - Static data should be in a dedicated folder
4. **Provider folder inside `app/`** - Providers should be at src level
5. **Style folder inside `app/`** - Styles should be consolidated
6. **Duplicate route groups** - `(site)` exists at root and under `[locale]`
7. **Deep nesting in components** - Too many `index.tsx` files creating confusion
8. **Configuration files scattered** - Multiple MD files at root level
9. **No constants folder** - Magic strings/values scattered throughout code
10. **No hooks folder** - Custom hooks not organized

---

## 🎯 Recommended Final Folder Structure

```
Property-nextjs-pro/package/
├── 📄 .env.local                    # Environment variables (gitignored)
├── 📄 .gitignore
├── 📄 next.config.mjs               # Next.js configuration
├── 📄 next-env.d.ts                 # Next.js TypeScript declarations
├── 📄 package.json                  # Dependencies
├── 📄 package-lock.json
├── 📄 postcss.config.mjs            # PostCSS configuration
├── 📄 tailwind.config.ts            # Tailwind configuration
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 sanity.cli.ts                 # Sanity CLI configuration
├── 📄 sanity.config.ts              # Sanity Studio configuration
├── 📄 README.md                     # Project documentation
│
├── 📁 docs/                         # Project documentation (moved from root)
│   ├── CLEANUP_REPORT.md
│   ├── JOB_APPLICATION_SANITY_SETUP.md
│   ├── NEXTJS_15_FIXES.md
│   ├── ONEDRIVE_BUILD_FIX.md
│   ├── PERFORMANCE_OPTIMIZATION_GUIDE.md
│   ├── PERFORMANCE_QUICK_START.md
│   ├── QUOTE_FORM_SETUP.md
│   ├── REFERENCE_NAVIGATION_FIX.md
│   └── RENDER_OPTIMIZATION_GUIDE.md
│
├── 📁 public/                       # Static assets (unchanged)
│   ├── Favicon.ico
│   └── images/
│       └── ...
│
├── 📁 messages/                     # i18n translation files (unchanged)
│   ├── de.json
│   └── en.json
│
├── 📁 markdown/                     # Markdown content (unchanged)
│   └── blogs/
│       └── ...
│
└── 📁 src/                          # Source code
    │
    ├── 📄 middleware.ts             # Next.js middleware
    │
    ├── 📁 app/                      # Next.js App Router (routes only!)
    │   ├── 📄 layout.tsx            # Root layout
    │   ├── 📄 page.tsx              # Root page
    │   ├── 📄 not-found.tsx         # 404 page
    │   ├── 📄 globals.css           # Global styles
    │   │
    │   ├── 📁 [locale]/             # Localized routes
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── 📁 (site)/           # Site pages group
    │   │       ├── about/
    │   │       ├── blogs/
    │   │       ├── company/
    │   │       ├── contact/
    │   │       ├── projects/
    │   │       ├── search/
    │   │       ├── services/
    │   │       └── vacancies/
    │   │
    │   ├── 📁 (site)/               # Non-localized site pages (legacy)
    │   │   ├── (auth)/
    │   │   ├── about/
    │   │   ├── blogs/
    │   │   ├── contact/
    │   │   ├── documentation/
    │   │   ├── projects/
    │   │   ├── properties/
    │   │   └── services/
    │   │
    │   ├── 📁 api/                  # API routes
    │   │   ├── auth/
    │   │   ├── home-stats/
    │   │   ├── job-application/
    │   │   ├── layoutdata/
    │   │   ├── pagedata/
    │   │   ├── propertydata/
    │   │   ├── quote/
    │   │   └── search/
    │   │
    │   └── 📁 studio/               # Sanity Studio route
    │       └── [[...tool]]/
    │
    ├── 📁 components/               # ⭐ All UI components (MOVED FROM app/)
    │   ├── 📁 auth/                 # Authentication components
    │   │   ├── ForgotPassword.tsx
    │   │   ├── SignIn.tsx
    │   │   ├── SignUp.tsx
    │   │   └── SocialButton.tsx
    │   │
    │   ├── 📁 blog/                 # Blog components
    │   │   ├── BlogCard.tsx
    │   │   ├── BlogHeader.tsx
    │   │   └── BlogList.tsx
    │   │
    │   ├── 📁 contact/              # Contact page components
    │   │   ├── ContactForm.tsx
    │   │   ├── ContactInfo.tsx
    │   │   └── OfficeLocation.tsx
    │   │
    │   ├── 📁 documentation/        # Documentation components
    │   │   ├── ColorConfiguration.tsx
    │   │   ├── Configuration.tsx
    │   │   ├── DocNavigation.tsx
    │   │   ├── Introduction.tsx
    │   │   ├── LogoConfiguration.tsx
    │   │   ├── PackageStructure.tsx
    │   │   ├── QuickStart.tsx
    │   │   └── TypographyConfiguration.tsx
    │   │
    │   ├── 📁 home/                 # Homepage section components
    │   │   ├── AboutSection.tsx
    │   │   ├── Calculator.tsx
    │   │   ├── Hero.tsx
    │   │   ├── History.tsx
    │   │   ├── CompanyInfo.tsx
    │   │   ├── CompanyInfoWrapper.tsx
    │   │   ├── ProjectsSection.tsx
    │   │   ├── PropertyCard.tsx
    │   │   ├── PropertyList.tsx
    │   │   ├── PropertyOption.tsx
    │   │   ├── ServicesSection.tsx
    │   │   ├── ServiceCard.tsx
    │   │   ├── Testimonials.tsx
    │   │   ├── TestimonialsWrapper.tsx
    │   │   └── WhyChooseUs.tsx
    │   │
    │   ├── 📁 job-application/      # Job application components
    │   │   └── JobApplicationForm.tsx
    │   │
    │   ├── 📁 layout/               # Layout components
    │   │   ├── Footer.tsx
    │   │   ├── Header.tsx
    │   │   ├── LanguageSwitcher.tsx
    │   │   ├── Logo.tsx
    │   │   ├── HeaderLink.tsx
    │   │   ├── MobileHeaderLink.tsx
    │   │   └── ThemeToggler.tsx
    │   │
    │   ├── 📁 projects/             # Projects components
    │   │   └── ProjectCard.tsx
    │   │
    │   ├── 📁 property/             # Property-related components
    │   │   ├── PropertyDetails.tsx
    │   │   └── PropertyList.tsx
    │   │
    │   ├── 📁 services/             # Services components
    │   │   └── ServiceDetail.tsx
    │   │
    │   └── 📁 shared/               # Reusable UI components
    │       ├── AnimatedCounter.tsx
    │       ├── BeforeAfterSlider.tsx
    │       ├── Breadcrumb.tsx
    │       ├── Features.tsx
    │       ├── FloatingMessageButton.tsx
    │       ├── HeroSub.tsx
    │       ├── ImageSlider.tsx
    │       ├── LazyImage.tsx
    │       ├── Loader.tsx
    │       ├── ModernGallery.tsx
    │       ├── ModernGalleryWrapper.tsx
    │       ├── PreLoader.tsx
    │       ├── ScrollUp.tsx
    │       ├── ScrollToTop.tsx
    │       └── SpotlightCard.tsx
    │
    ├── 📁 context/                  # ⭐ React Context (renamed from context-api)
    │   └── PropertyContext.tsx
    │
    ├── 📁 providers/                # ⭐ React Providers (MOVED FROM app/provider)
    │   ├── SessionProviderComp.tsx
    │   └── SessionProviderWrapper.tsx
    │
    ├── 📁 hooks/                    # ⭐ Custom React hooks (NEW)
    │   └── .gitkeep                 # Placeholder - add custom hooks here
    │
    ├── 📁 lib/                      # Core libraries & configurations
    │   ├── sanity-cache.ts
    │   └── sanity-image-loader.ts
    │
    ├── 📁 sanity/                   # All Sanity-related code
    │   ├── env.ts                   # Sanity environment variables
    │   ├── structure.ts             # Studio structure configuration
    │   │
    │   ├── 📁 lib/                  # Sanity client & queries
    │   │   ├── client.ts
    │   │   ├── writeClient.ts
    │   │   ├── image.ts
    │   │   ├── live.ts
    │   │   └── 📁 queries/          # ⭐ GROQ queries (reorganized)
    │   │       ├── contactPage.ts
    │   │       ├── footer.ts
    │   │       ├── homeStats.ts
    │   │       ├── locale.ts
    │   │       ├── projects.ts
    │   │       └── services.ts
    │   │
    │   ├── 📁 schemas/              # ⭐ Schema types (renamed from schemaTypes)
    │   │   ├── index.ts
    │   │   ├── contactPageType.ts
    │   │   ├── footerType.ts
    │   │   ├── homeStatsType.ts
    │   │   ├── jobApplicationType.ts
    │   │   ├── projectType.ts
    │   │   ├── quoteRequest.ts
    │   │   ├── serviceType.ts
    │   │   ├── testimonialType.ts
    │   │   └── vacancyType.ts
    │   │
    │   ├── 📁 components/           # Sanity Studio components
    │   │   └── .gitkeep
    │   │
    │   └── 📁 scripts/              # Sanity scripts/migrations
    │       └── .gitkeep
    │
    ├── 📁 types/                    # ⭐ TypeScript types (MOVED FROM app/types)
    │   ├── index.ts                 # Re-export all types
    │   ├── blog.ts
    │   ├── breadcrumb.ts
    │   ├── menu.ts
    │   ├── property.ts
    │   └── filters.ts
    │
    ├── 📁 utils/                    # Utility functions
    │   ├── aos.tsx
    │   ├── extendedConfig.ts
    │   ├── markdown.ts
    │   ├── markdownToHtml.ts
    │   └── validateEmail.ts
    │
    ├── 📁 constants/                # ⭐ Constants & config values (NEW)
    │   ├── index.ts
    │   ├── navigation.ts            # Navigation menu items
    │   ├── seo.ts                   # SEO constants
    │   └── site.ts                  # Site-wide constants
    │
    ├── 📁 data/                     # ⭐ Static data (MOVED FROM app/data)
    │   └── projects.ts
    │
    ├── 📁 i18n/                     # Internationalization config
    │   ├── request.ts
    │   └── routing.ts
    │
    └── 📁 styles/                   # ⭐ Additional styles (MOVED FROM app/style)
        └── index.css
```

---

## 📂 Folder Purpose Explanation

| Folder | Purpose |
|--------|---------|
| `docs/` | Project documentation files, guides, and setup instructions |
| `public/` | Static assets served at root URL (images, fonts, favicon) |
| `messages/` | Translation files for next-intl internationalization |
| `markdown/` | Markdown content files (blog posts, etc.) |
| `src/app/` | **Routes only!** Next.js App Router pages and API routes |
| `src/components/` | All React UI components, organized by feature/domain |
| `src/context/` | React Context providers and state management |
| `src/providers/` | Wrapper providers (Session, Theme, etc.) |
| `src/hooks/` | Custom React hooks for reusable logic |
| `src/lib/` | Core libraries, configurations, and third-party integrations |
| `src/sanity/` | All Sanity CMS related code (schemas, queries, client) |
| `src/types/` | TypeScript type definitions and interfaces |
| `src/utils/` | Utility/helper functions |
| `src/constants/` | Application constants, config values, magic strings |
| `src/data/` | Static data files (arrays, objects for UI) |
| `src/i18n/` | Internationalization configuration |
| `src/styles/` | CSS files and style configurations |

---

## 🔄 File Migration Mapping

### 1. Move Components OUT of `app/` → `src/components/`

```
FROM: src/app/components/
TO:   src/components/

Files to move:
├── auth/                    → components/auth/
├── blog/                    → components/blog/
├── breadcrumb/              → components/shared/Breadcrumb.tsx
├── contact/                 → components/contact/
├── documentation/           → components/documentation/
├── home/                    → components/home/
├── job-application/         → components/job-application/
├── layout/                  → components/layout/
├── projects/                → components/projects/
├── property-details/        → components/property/
├── property-list/           → components/property/
├── scroll-to-top/           → components/shared/ScrollToTop.tsx
├── services/                → components/services/
└── shared/                  → components/shared/
```

### 2. Move Types OUT of `app/` → `src/types/`

```
FROM: src/app/types/
TO:   src/types/

├── data/blog.ts             → types/blog.ts
├── data/breadcrumb.ts       → types/breadcrumb.ts
├── layout/menu.ts           → types/menu.ts
├── property/filtertypes.ts  → types/filters.ts
└── property/propertyData.ts → types/property.ts
```

### 3. Move Providers OUT of `app/` → `src/providers/`

```
FROM: src/app/provider/
TO:   src/providers/

├── SessionProviderComp.tsx
└── SessionProviderWrapper.tsx
```

### 4. Move Data OUT of `app/` → `src/data/`

```
FROM: src/app/data/
TO:   src/data/

└── projects.ts
```

### 5. Move Styles OUT of `app/` → `src/styles/`

```
FROM: src/app/style/
TO:   src/styles/

└── index.css
```

### 6. Rename Context Folder

```
FROM: src/context-api/
TO:   src/context/

└── PropertyContext.tsx
```

### 7. Reorganize Sanity Queries

```
FROM: src/sanity/lib/
TO:   src/sanity/lib/queries/

Move these files into queries subfolder:
├── contactPage.ts
├── footer.ts
├── homeStats.ts
├── locale.ts
├── projects.ts
└── services.ts

Keep at lib level:
├── client.ts
├── writeClient.ts
├── image.ts
└── live.ts
```

### 8. Move Documentation Files to `docs/`

```
FROM: Root level
TO:   docs/

├── CLEANUP_REPORT.md
├── JOB_APPLICATION_SANITY_SETUP.md
├── NEXTJS_15_FIXES.md
├── ONEDRIVE_BUILD_FIX.md
├── PERFORMANCE_OPTIMIZATION_GUIDE.md
├── PERFORMANCE_QUICK_START.md
├── QUOTE_FORM_SETUP.md
├── REFERENCE_NAVIGATION_FIX.md
└── RENDER_OPTIMIZATION_GUIDE.md
```

---

## 📝 Required Import Path Updates

After moving files, update these import paths in your codebase:

### Old → New Import Paths

```typescript
// Components
"@/app/components/..."         → "@/components/..."

// Types  
"@/app/types/..."              → "@/types/..."

// Providers
"@/app/provider/..."           → "@/providers/..."

// Context
"@/context-api/..."            → "@/context/..."

// Data
"@/app/data/..."               → "@/data/..."

// Styles
"@/app/style/..."              → "@/styles/..."

// Sanity Queries (if reorganized)
"@/sanity/lib/contactPage"     → "@/sanity/lib/queries/contactPage"
```

### Update `tsconfig.json` paths (if needed)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"],
      "@/context/*": ["./src/context/*"],
      "@/providers/*": ["./src/providers/*"],
      "@/constants/*": ["./src/constants/*"],
      "@/data/*": ["./src/data/*"],
      "@/sanity/*": ["./src/sanity/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/i18n/*": ["./src/i18n/*"]
    }
  }
}
```

---

## ✅ Best Practices for Future Maintenance

### 1. **Keep `app/` Clean - Routes Only!**
The `app/` folder should ONLY contain:
- Page files (`page.tsx`)
- Layout files (`layout.tsx`)
- Loading states (`loading.tsx`)
- Error boundaries (`error.tsx`)
- API routes (`route.ts`)
- Route groups `(groupname)/`

❌ Never put components, types, utils, or data in `app/`

### 2. **Component Naming Conventions**
```
✅ Good: AboutSection.tsx, ContactForm.tsx, BlogCard.tsx
❌ Bad:  index.tsx (inside every folder)
```
Use descriptive file names instead of `index.tsx` everywhere. This makes searching and debugging much easier.

### 3. **Feature-Based Component Organization**
Group components by feature/domain, not by type:
```
✅ Good:
components/
  ├── home/
  │   ├── Hero.tsx
  │   └── Features.tsx
  └── blog/
      ├── BlogCard.tsx
      └── BlogList.tsx

❌ Bad:
components/
  ├── cards/
  │   ├── BlogCard.tsx
  │   └── FeatureCard.tsx
  └── lists/
      └── BlogList.tsx
```

### 4. **Avoid Deep Nesting**
Keep folder depth to maximum 3-4 levels:
```
✅ Good: src/components/home/Hero.tsx
❌ Bad:  src/app/components/home/hero/variants/default/index.tsx
```

### 5. **Co-locate Related Files**
Keep related files together:
```
components/home/
  ├── Hero.tsx
  ├── Hero.types.ts      # Types for this component only
  ├── Hero.test.tsx      # Tests for this component
  └── useHero.ts         # Hook used only by this component
```

### 6. **Use Barrel Exports Sparingly**
Only create `index.ts` barrel files for folders that are frequently imported:
```typescript
// src/components/shared/index.ts
export { LazyImage } from './LazyImage';
export { Loader } from './Loader';
export { Breadcrumb } from './Breadcrumb';
```

### 7. **Sanity Schema Organization**
Keep Sanity schemas in dedicated folder with consistent naming:
```
sanity/schemas/
  ├── index.ts           # Exports all schemas
  ├── documents/         # Document types
  │   └── projectType.ts
  └── objects/           # Reusable object types
      └── seoType.ts
```

### 8. **Type Organization**
- Put shared types in `src/types/`
- Co-locate component-specific types with the component
- Use a central `index.ts` to re-export common types

### 9. **Constants Organization**
```typescript
// constants/site.ts
export const SITE_NAME = 'POSKA MANOLITO AG';
export const SITE_URL = 'https://example.com';

// constants/navigation.ts
export const NAV_ITEMS = [...];
```

### 10. **Import Order Convention**
Maintain consistent import order:
```typescript
// 1. React/Next.js imports
import { useState } from 'react';
import Image from 'next/image';

// 2. Third-party libraries
import { motion } from 'framer-motion';

// 3. Internal imports (absolute paths)
import { Button } from '@/components/shared';
import { useProperty } from '@/hooks/useProperty';

// 4. Types
import type { Property } from '@/types';

// 5. Styles
import styles from './Component.module.css';
```

---

## 🚀 Migration Steps (Manual)

1. **Create new folder structure** - Create empty folders first
2. **Move files one folder at a time** - Start with least dependencies
3. **Update imports** - Use find-and-replace for import paths
4. **Test after each major move** - Run `npm run dev` to catch errors
5. **Update `tsconfig.json`** - If you add path aliases
6. **Commit after each successful step** - Easy rollback if issues arise

### Recommended Migration Order:
1. Move documentation files to `docs/`
2. Create `src/types/` and move types
3. Create `src/constants/` (new)
4. Rename `context-api/` to `context/`
5. Create `src/providers/` and move providers
6. Create `src/data/` and move data
7. Create `src/styles/` and move styles
8. Move `src/app/components/` to `src/components/` (largest change)
9. Reorganize Sanity queries
10. Update all import paths
11. Full test

---

## ⚠️ Important Notes

- **Do NOT change any component code** - Only move files and update imports
- **Keep git history** - Use `git mv` when possible to preserve history
- **Test incrementally** - Don't move everything at once
- **IDE support** - VS Code can auto-update imports when you move files (right-click → Move to...)

---

*This guide was generated based on the current project structure analysis. Last updated: February 2026*
