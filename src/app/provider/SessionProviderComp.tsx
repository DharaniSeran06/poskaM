"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function SessionProviderComp({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  // Since this component is dynamically imported with ssr: false,
  // it only loads on the client side, so we can always render SessionProvider
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
