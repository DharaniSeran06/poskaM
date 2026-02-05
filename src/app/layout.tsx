import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Aoscompo from "@/utils/aos";
import type { Metadata } from "next";

// Optimized font loading with display swap and preload
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap", // Prevents invisible text during font load
  preload: true, // Preloads font for faster rendering
  fallback: ["system-ui", "arial"], // Fallback fonts
});

import { AppContextProvider } from "@/context/PropertyContext";
import ScrollToTop from "@/components/scroll-to-top";
import SessionProviderWrapper from "@/providers/SessionProviderWrapper";

// Metadata configuration - favicon.ico in app folder is auto-detected by Next.js
export const metadata: Metadata = {
  title: {
    default: "POSKA MANOLITO AG",
    template: "%s | POSKA MANOLITO AG",
  },
  description: "POSKA MANOLITO AG - Professional construction services with Swiss precision. Specializing in construction, plastering, facades, painting, and renovation.",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session?: any;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${montserrat.className} ${montserrat.variable}`}>
      <AppContextProvider>
      <SessionProviderWrapper session={session || null}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
          disableTransitionOnChange // Prevents flash on theme change
        >
          <Aoscompo>
            {children}
          </Aoscompo>
          <ScrollToTop />
        </ThemeProvider>
        </SessionProviderWrapper>
        </AppContextProvider>
      </body>
    </html>
  );
}
