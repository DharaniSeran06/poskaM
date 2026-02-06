import { Montserrat } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import ClientProviders from "@/components/providers/ClientProviders";

// Optimized font loading with display swap and preload
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Viewport configuration for proper mobile rendering
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#016aac',
};

// Metadata configuration
export const metadata: Metadata = {
  title: {
    default: "POSKA MANOLITO AG",
    template: "%s | POSKA MANOLITO AG",
  },
  description: "POSKA MANOLITO AG - Professional construction services with Swiss precision. Specializing in construction, plastering, facades, painting, and renovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${montserrat.className} ${montserrat.variable}`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
