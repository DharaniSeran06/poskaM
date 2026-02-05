import React from 'react';
import { getHomeStats } from '@/sanity/lib/homeStats';
import CompanyInfo from './index';

export default async function CompanyInfoWrapper() {
  const homeStats = await getHomeStats();

  return <CompanyInfo homeStats={homeStats} />;
}
