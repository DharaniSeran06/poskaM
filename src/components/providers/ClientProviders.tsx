"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState, useRef } from "react";

export default function ClientProviders({
  children,
}: {
  children: ReactNode;
}) {
  // Use refs to track loading state without causing re-renders during SSR
  const [mounted, setMounted] = useState(false);
  const [providersReady, setProvidersReady] = useState(false);
  const loadedRef = useRef(false);
  
  // Components loaded lazily
  const [Components, setComponents] = useState<{
    ContextProvider: any;
    AosComponent: any;
    ScrollComponent: any;
  } | null>(null);

  // Mark mounted immediately on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load providers after mount (prevents hydration issues)
  useEffect(() => {
    if (!mounted || loadedRef.current) return;
    loadedRef.current = true;

    // Use requestIdleCallback for non-critical loading
    const loadProviders = () => {
      Promise.all([
        import("@/context/PropertyContext").then(mod => mod.AppContextProvider),
        import("@/utils/aos").then(mod => mod.default),
        import("@/components/scroll-to-top").then(mod => mod.default),
      ]).then(([Context, Aos, Scroll]) => {
        setComponents({
          ContextProvider: Context,
          AosComponent: Aos,
          ScrollComponent: Scroll,
        });
        setProvidersReady(true);
      }).catch(err => {
        console.warn("Failed to load providers:", err);
        // Still mark as ready so children render
        setProvidersReady(true);
      });
    };

    // Load after a short delay to ensure hydration completes first
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadProviders, { timeout: 100 });
    } else {
      setTimeout(loadProviders, 50);
    }
  }, [mounted]);

  // Always render children immediately - never block content
  // ThemeProvider works server-side, so it's safe to use
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
      disableTransitionOnChange
    >
      {providersReady && Components?.ContextProvider && Components?.AosComponent ? (
        <Components.ContextProvider>
          <Components.AosComponent>
            {children}
          </Components.AosComponent>
          {Components.ScrollComponent && <Components.ScrollComponent />}
        </Components.ContextProvider>
      ) : (
        // Render children immediately during hydration/loading
        <>{children}</>
      )}
    </ThemeProvider>
  );
}
