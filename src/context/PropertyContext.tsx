'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { client } from '@/sanity/lib/client';

/* ---------------- FILTER TYPES ---------------- */

export interface Filters {
  keyword: string;
  location: string;
  category: string;
  tag: string;
}

/* ---------------- PROPERTY TYPE ---------------- */

export interface propertyData {
  id: string;
  propertyId: string;
  property_title: string;
  property_img: string;
  location: string;
  category: string;
  works: string[];
  architecturePlanning: string;
  tag: string;
  slug: string;
}

/* ---------------- GROQ FILTER BUILDER ---------------- */

const buildSanityFilters = (filters: Filters) => {
  const conditions: string[] = [];

  if (filters.keyword) {
    conditions.push(`property_title match "*${filters.keyword}*"`);
  }
  if (filters.location) {
    conditions.push(`location == "${filters.location}"`);
  }
  if (filters.category) {
    conditions.push(`category == "${filters.category}"`);
  }
  if (filters.tag) {
    conditions.push(`tag == "${filters.tag}"`);
  }

  return conditions.length ? `&& ${conditions.join(' && ')}` : '';
};

/* ---------------- CONTEXT TYPE ---------------- */

interface PropertyContextType {
  properties: propertyData[];
  setProperties: Dispatch<SetStateAction<propertyData[]>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  updateFilter: (key: keyof Filters, value: string) => void;
}

export const PropertyContext =
  createContext<PropertyContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [allProperties, setAllProperties] = useState<propertyData[]>([]);
  const [properties, setProperties] = useState<propertyData[]>([]);

  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    location: '',
    category: '',
    tag: '',
  });

  /* -------- FETCH ALL PROJECTS (LATEST ONLY) -------- */

  useEffect(() => {
    // Check if we have cached data in sessionStorage
    const cacheKey = 'sanity-projects-cache';
    const cachedData = sessionStorage.getItem(cacheKey);
    
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        setAllProperties(parsed);
        setProperties(parsed);
        return; // Use cached data, don't refetch
      } catch (e) {
        // Cache invalid, will fetch fresh data
      }
    }

    const fetchProjects = async () => {
      try {
        const query = `*[
          _type == "project" &&
          !(_id in path("drafts.**")) &&
          defined(slug.current)
        ]{
          "id": _id,
          propertyId,
          property_title,
          "property_img": coalesce(thumbnail.asset->url, ""),
          location,
          category,
          works,
          architecturePlanning,
          tag,
          "slug": slug.current
        }`;

        const data: propertyData[] = await client.fetch(query);
        
        // Cache the data
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        
        setAllProperties(data);
        setProperties(data);
      } catch (err) {
        // Silently fail - the app will work without this data
        console.warn('Failed to fetch projects from Sanity:', err);
      }
    };

    fetchProjects();
  }, []);

  /* -------- APPLY FILTERS -------- */

  useEffect(() => {
    const fetchFiltered = async () => {
      const hasFilters = Object.values(filters).some(Boolean);

      if (!hasFilters) {
        setProperties(allProperties);
        return;
      }

      try {
        const filterStr = buildSanityFilters(filters);

        const query = `*[
          _type == "project" &&
          !(_id in path("drafts.**")) &&
          defined(slug.current)
          ${filterStr}
        ]{
          "id": _id,
          propertyId,
          property_title,
          "property_img": coalesce(thumbnail.asset->url, ""),
          location,
          category,
          works,
          architecturePlanning,
          tag,
          "slug": slug.current
        }`;

        const data: propertyData[] = await client.fetch(query);
        setProperties(data);
      } catch (err) {
        console.error('Sanity filter error:', err);
      }
    };

    fetchFiltered();
  }, [filters, allProperties]);

  /* -------- UPDATE FILTER -------- */

  // Memoize updateFilter to prevent unnecessary re-renders
  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => {
      // Only update if value actually changed
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      properties,
      setProperties,
      filters,
      setFilters,
      updateFilter,
    }),
    [properties, filters, updateFilter]
  );

  return (
    <PropertyContext.Provider value={contextValue}>
      {children}
    </PropertyContext.Provider>
  );
};
