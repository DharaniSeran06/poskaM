"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

/**
 * SessionProviderWrapper - Client-side session provider
 * 
 * IMPORTANT: Do NOT use dynamic import with ssr: false here!
 * That causes blank screen on mobile because children don't render
 * until JS loads completely.
 * 
 * SessionProvider from next-auth/react is designed to work with SSR.
 * It gracefully handles the case when session is undefined during SSR.
 */
export default function SessionProviderWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
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
