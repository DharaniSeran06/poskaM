import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import { getFooterData } from '@/sanity/lib/footer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Fetch footer data from Sanity
  const footerData = await getFooterData(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      {children}
      <Footer footerData={footerData} />
    </NextIntlClientProvider>
  );
}
