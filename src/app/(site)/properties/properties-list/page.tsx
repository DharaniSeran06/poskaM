import React from 'react';
import { Metadata } from "next";
import AdvanceSearch from '@/app/components/property-list/search';

export const metadata: Metadata = {
  title: "Properties List",
};

export const dynamic = 'force-dynamic';

const Page = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const resolvedSearchParams = await searchParams;
  const category = (typeof resolvedSearchParams?.category === 'string' ? resolvedSearchParams.category : '') || ''; 

  return (
    <>
      <AdvanceSearch category={category} />
    </>
  );
};

export default Page;
