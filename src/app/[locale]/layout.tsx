import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getFooterData } from '@/sanity/lib/footer';
import { unstable_cache } from 'next/cache';

// Generate static params for all locales at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Cache footer data for 1 hour to prevent refetching on every navigation
const getCachedFooterData = unstable_cache(
  async (locale: string) => getFooterData(locale),
  ['footer-data'],
  { revalidate: 3600, tags: ['footer'] }
);

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Fetch messages and footer data in parallel for faster loading
  const [messages, footerData] = await Promise.all([
    getMessages(),
    getCachedFooterData(locale)
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      {children}
      <Footer footerData={footerData} />
    </NextIntlClientProvider>
  );
}
