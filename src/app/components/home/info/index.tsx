"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import AnimatedCounter from '@/app/components/shared/animated-counter';
import type { HomeStatsData } from '@/sanity/lib/homeStats';

interface CompanyInfoProps {
    homeStats: HomeStatsData | null;
}

export default function CompanyInfo({ homeStats }: CompanyInfoProps) {
    const t = useTranslations('home.about');
    
    // Fallback to default stats if Sanity data is not available
    const defaultStats = [
        { label: t('projectsCompleted'), value: 500, suffix: '+', order: 0 },
        { label: t('yearsExperience'), value: 15, suffix: '+', order: 1 },
        { label: t('clientSatisfaction'), value: 98, suffix: '%', order: 2 },
    ];

    const stats = homeStats?.stats && homeStats.stats.length > 0 
        ? homeStats.stats 
        : defaultStats;

    // Don't render if inactive and no fallback
    if (homeStats && !homeStats.isActive && homeStats.stats.length === 0) {
        return null;
    }
    
    return (
        <div className='dark:bg-darkmode bg-[#016aac] py-16'>
            <div className='container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4'>
                {homeStats?.title && (
                    <h2 className='text-3xl md:text-4xl font-bold text-white text-center mb-12' data-aos="fade-up">
                        {homeStats.title}
                    </h2>
                )}
                <div className={`grid grid-cols-1 ${stats.length === 2 ? 'md:grid-cols-2' : stats.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-1'} gap-8`}>
                    {stats.map((stat, index) => (
                        <div 
                            key={`${stat.label}-${index}`}
                            className={`flex flex-col justify-center items-center text-center py-8 px-4 ${
                                index > 0 && index < stats.length - 1 && stats.length === 3 
                                    ? 'border-l border-r border-white/20' 
                                    : ''
                            }`}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <p className='text-[60px] leading-[1.2] mb-2 text-white font-bold'>
                                <AnimatedCounter 
                                    end={stat.value} 
                                    suffix={stat.suffix || ''} 
                                    duration={1800}
                                />
                            </p>
                            <p className='text-xl text-white/90'>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
