"use client";
import React, { useEffect, useState } from "react";

/**
 * SessionProviderWrapper - Client-side session provider
 * 
 * Conditionally loads SessionProvider only when NextAuth is configured.
 * This prevents errors when NEXTAUTH_URL is not set.
 */
export default function SessionProviderWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [SessionProvider, setSessionProvider] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Only load SessionProvider if we're likely using auth
    // This prevents Invalid URL errors when NEXTAUTH_URL is not set
    const loadSessionProvider = async () => {
      try {
        const { SessionProvider: SP } = await import("next-auth/react");
        setSessionProvider(() => SP);
      } catch (e) {
        // NextAuth not properly configured, skip session provider
        console.warn('NextAuth not configured, skipping session provider');
      }
    };

    loadSessionProvider();
  }, []);

  // During SSR and initial load, just render children
  if (!isClient || !SessionProvider) {
    return <>{children}</>;
  }

  return (
    <SessionProvider 
      session={session || undefined}
      basePath="/api/auth"
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}
