"use client";
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import SessionProviderComp with ssr: false to prevent SSR issues
const SessionProviderComp = dynamic(
  () => import('./SessionProviderComp'),
  { ssr: false }
);

export default function SessionProviderWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProviderComp session={session}>
      {children}
    </SessionProviderComp>
  );
}
