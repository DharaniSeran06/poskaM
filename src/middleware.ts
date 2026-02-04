import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for API routes, static files, Next.js internals, and studio
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.startsWith('/studio') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return;
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only pathnames that should be internationalized
  // Exclude: /api, /_next, /_vercel, /studio, files with extensions
  matcher: [
    // Match all pathnames except for
    // - API routes (/api/*)
    // - Next.js internals (/_next/*)
    // - Vercel internals (/_vercel/*)
    // - Studio routes (/studio/*)
    // - Files with extensions (*.js, *.css, etc.)
    '/((?!api|_next|_vercel|studio|.*\\..*).*)'
  ]
};
