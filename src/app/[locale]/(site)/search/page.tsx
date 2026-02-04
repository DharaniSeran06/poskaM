'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

interface SearchResult {
  type: 'project' | 'service' | 'page';
  id: string;
  title: string;
  description?: string;
  image?: string;
  slug: string;
  href: string;
}

export default function SearchPage() {
  const t = useTranslations('search');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on page load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fetch all searchable content
  useEffect(() => {
    const fetchSearchData = async () => {
      if (!query.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      setHasSearched(true);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&locale=${locale}`);
        if (!response.ok) throw new Error('Search failed');
        
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchSearchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    inputRef.current?.focus();
  };

  return (
    <main className="min-h-screen bg-white dark:bg-darkmode pt-32 pb-16">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        {/* Search Input */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-6 w-6 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('placeholder') || 'Search projects, services, and more...'}
              className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-300 dark:border-dark_border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#016aac] focus:border-transparent bg-white dark:bg-darklight text-midnight_text dark:text-white transition-all duration-300"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Clear search"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#016aac]"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('searching') || 'Searching...'}</p>
          </div>
        )}

        {/* Results */}
        {!isLoading && hasSearched && (
          <>
            {results.length > 0 ? (
              <div className="space-y-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('resultsFound', { count: results.length }) || `${results.length} result${results.length !== 1 ? 's' : ''} found`}
                </div>

                {/* Group results by type */}
                {['project', 'service', 'page'].map((type) => {
                  const typeResults = results.filter((r) => r.type === type);
                  if (typeResults.length === 0) return null;

                  return (
                    <div key={type} className="mb-8">
                      <h2 className="text-xl font-bold text-midnight_text dark:text-white mb-4 capitalize">
                        {type === 'project' && (t('projects') || 'Projects')}
                        {type === 'service' && (t('services') || 'Services')}
                        {type === 'page' && (t('pages') || 'Pages')}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {typeResults.map((result) => (
                          <Link
                            key={result.id}
                            href={result.href}
                            className="group bg-white dark:bg-darklight rounded-xl overflow-hidden border border-gray-200 dark:border-dark_border shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                          >
                            {result.image && (
                              <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <Image
                                  src={result.image}
                                  alt={result.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                  result.type === 'project'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                    : result.type === 'service'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                                }`}>
                                  {result.type}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-midnight_text dark:text-white mb-2 group-hover:text-[#016aac] transition-colors">
                                {result.title}
                              </h3>
                              {result.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {result.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-midnight_text dark:text-white mb-2">
                  {t('noResults') || 'No results found'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('noResultsMessage') || 'Try a different keyword or check your spelling.'}
                </p>
              </div>
            )}
          </>
        )}

        {/* Initial State */}
        {!hasSearched && !isLoading && (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-20 w-20 text-gray-300 dark:text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-midnight_text dark:text-white mb-2">
              {t('startSearching') || 'Start searching'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('startSearchingMessage') || 'Type in the search box above to find projects, services, and pages.'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
