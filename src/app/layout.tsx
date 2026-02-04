import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Aoscompo from "@/utils/aos";
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});
import NextTopLoader from 'nextjs-toploader';
import { AppContextProvider } from "../context-api/PropertyContext";
import ScrollToTop from "./components/scroll-to-top";
import SessionProviderWrapper from "./provider/SessionProviderWrapper";

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session?: any;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="description" content="POSKA MANOLITO AG - Professional construction services with Swiss precision. Specializing in construction, plastering, facades, painting, and renovation." />
      </head>
      <body className={`${montserrat.className} ${montserrat.variable}`}>
      <AppContextProvider>
      <SessionProviderWrapper session={session || null}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <Aoscompo>
            <NextTopLoader />
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
