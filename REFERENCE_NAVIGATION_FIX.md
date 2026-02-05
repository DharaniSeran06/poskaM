# Reference Section Navigation Fix

## ✅ All Navigation Links Updated

All navigation links have been successfully updated from `/projects` to `/reference` across the website.

## 📋 Navigation Components Fixed

### 1. **Navbar Link** ✅
- **File**: `src/app/api/layoutdata/route.ts`
- **Status**: Updated to `/reference`
- **Component**: Uses `@/i18n/routing` Link (correct for i18n)
- **Translation**: Header component now handles both "References" and "Projects" labels

### 2. **Home Page "View All References" Button** ✅
- **File**: `src/app/components/home/projects/index.tsx`
- **Line**: 130
- **Status**: Updated to `href="/reference"`
- **Component**: Uses `@/i18n/routing` Link (correct for i18n)

### 3. **Reference Listing Page "Learn More" Buttons** ✅

#### For Sanity-based pages (with locale):
- **File**: `src/app/[locale]/(site)/projects/page.tsx`
- **Line**: 233
- **Status**: Updated to `href={`/reference/${project.slug || project._id}`}`
- **Component**: Uses `@/i18n/routing` Link (correct for i18n)

#### For static data pages:
- **File**: `src/app/(site)/projects/page.tsx`
- **Line**: 106
- **Status**: Updated to `href={`/reference/${project.id}`}`
- **Component**: Uses `next/link` (correct for non-i18n routes)

### 4. **Home Page Reference Cards** ✅
- **File**: `src/app/components/home/projects/index.tsx`
- **Line**: 114
- **Status**: Updated to `href={`/reference/${project.slug || project._id}`}`
- **Component**: Uses `@/i18n/routing` Link (correct for i18n)

### 5. **Footer Links** ✅
- **File**: `src/app/components/layout/footer/index.tsx`
- **Status**: Updated to `/reference`
- **Component**: Uses translations (already updated)

### 6. **Breadcrumbs** ✅
- **File**: `src/app/[locale]/(site)/projects/page.tsx`
- **Line**: 112
- **Status**: Updated to `/reference`

## ⚠️ IMPORTANT: Folder Renaming Required

The route folders still need to be manually renamed:

1. **Rename**: `src/app/(site)/projects` → `src/app/(site)/reference`
2. **Rename**: `src/app/[locale]/(site)/projects` → `src/app/[locale]/(site)/reference`

### Steps to Rename:
1. Close your IDE/editor
2. In Windows Explorer, navigate to:
   - `Property-nextjs-pro/package/src/app/(site)/`
   - `Property-nextjs-pro/package/src/app/[locale]/(site)/`
3. Rename `projects` folders to `reference`
4. Reopen your IDE

**OR** rename directly in your IDE:
- Right-click the folder → Rename → `reference`

## 🔍 Verification Checklist

- [x] Navbar "References" link points to `/reference`
- [x] Home page "View All References" button points to `/reference`
- [x] Reference listing page "Learn More" buttons use `/reference/[id]` or `/reference/[slug]`
- [x] Home page reference cards link to `/reference/[slug]`
- [x] Footer links updated to `/reference`
- [x] Breadcrumbs updated to `/reference`
- [x] All Link components use correct imports (`next/link` or `@/i18n/routing`)
- [ ] **Folders renamed from `projects` to `reference`** (Manual step required)

## 📝 Code Snippets

### Navbar Link (Already Fixed)
The navbar automatically fetches from `/api/layoutdata` which returns:
```typescript
{ label: "References", href: "/reference" }
```

### Home Page "View All References" Button
```tsx
<Link
  href="/reference"
  className="inline-flex items-center px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-lg shadow-md hover:scale-105"
>
  {t('viewAllProjects')}
  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</Link>
```

### Reference Listing Page "Learn More" Button (Sanity)
```tsx
<Link
  href={`/reference/${project.slug || project._id}`}
  className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-sm shadow-md hover:scale-[1.02] group/btn"
>
  {t('learnMore')}
  <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</Link>
```

### Reference Listing Page "Learn More" Button (Static)
```tsx
<Link
  href={`/reference/${project.id}`}
  className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-sm shadow-md hover:scale-[1.02] group/btn"
>
  LEARN MORE
  <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</Link>
```

## 🚀 After Folder Rename

Once the folders are renamed, all navigation will work correctly:
- Navbar "References" link → `/reference`
- Home page button → `/reference`
- Reference cards → `/reference/[slug]`
- "Learn More" buttons → `/reference/[id]` or `/reference/[slug]`

No page refreshes will occur as all components use Next.js Link components for client-side navigation.
