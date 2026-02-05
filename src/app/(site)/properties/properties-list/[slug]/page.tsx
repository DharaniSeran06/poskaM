"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"

import CompanyInfo from "@/components/home/info"
import Availability from "@/components/property-details/availability"
import Tabbar from "@/components/property-details/tabbar"
import TextSection from "@/components/property-details/text-section"
import DiscoverProperties from "@/components/home/property-option"

import type { HomeStatsData } from "@/sanity/lib/homeStats"

export default function Details() {
  const { slug } = useParams<{ slug: string }>()

  const [properties, setProperties] = useState<any[]>([])
  const [homeStats, setHomeStats] = useState<HomeStatsData | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch property data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/propertydata")
        if (!res.ok) throw new Error("Failed to fetch property data")

        const data = await res.json()
        setProperties(data || [])
      } catch (error) {
        console.error("❌ Error fetching properties:", error)
      }
    }

    fetchProperties()
  }, [])

  // Fetch home stats (CLIENT SIDE ONLY – SAFE)
  useEffect(() => {
    const fetchHomeStats = async () => {
      try {
        const res = await fetch("/api/home-stats")
        if (!res.ok) throw new Error("Failed to fetch home stats")

        const data = await res.json()
        setHomeStats(data)
      } catch (error) {
        console.error("❌ Error fetching home stats:", error)
        setHomeStats(null)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeStats()
  }, [])

  const item = properties.find((item) => item.slug === slug)

  if (!item && !loading) {
    return (
      <div className="pt-40 text-center text-gray-500">
        Property not found
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-cover pt-36 pb-20 relative bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-darklight overflow-x-hidden">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
          <h2 className="text-midnight_text text-4xl lg:text-[50px] leading-[1.2] md:mx-auto md:max-w-[60%] text-center font-bold dark:text-white">
            {item?.property_title}
          </h2>
        </div>
      </section>

      {/* Image Section */}
      <section>
        <div className="container mx-auto dark:bg-darkmode">
          <div className="h-[580px] max-w-5xl mx-auto w-full">
            {item?.property_img && (
              <Image
                src={item.property_img}
                alt={item.property_title}
                width={1000}
                height={600}
                className="h-full w-full object-cover rounded-lg"
                priority
              />
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <TextSection />

      {/* Home stats (safe client-side API usage) */}
      <CompanyInfo homeStats={homeStats} />

      <Tabbar />
      <Availability />
      <DiscoverProperties />
    </div>
  )
}
