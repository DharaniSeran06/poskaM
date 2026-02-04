import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BeforeAfterSlider from "@/app/components/shared/before-after-slider";

export const dynamic = 'force-dynamic';

// Service data mapping
const servicesData: Record<string, {
  title: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  beforeImage?: string;
  afterImage?: string;
  metaDescription: string;
}> = {
  "plaster-casts": {
    title: "Plaster casts",
    description: "Professional interior and exterior plastering services. Smooth finishes, textured surfaces, and decorative plasterwork to enhance your space. Our expert team delivers precision plaster casting work for both residential and commercial projects, ensuring durable and aesthetically pleasing results.",
    heroImage: "/images/services/plaster.png",
    beforeImage: "/images/leranmore services/plaster/01.jpg",
    afterImage: "/images/leranmore services/plaster/after.jpg",
    galleryImages: [
      "/images/leranmore services/plaster/01.jpg",
      "/images/leranmore services/plaster/02.jpg",
      "/images/leranmore services/plaster/03.jpg",
      "/images/leranmore services/plaster/04.jpg",
      "/images/leranmore services/plaster/05.jpg",
      "/images/leranmore services/plaster/06.jpg",
    ],
    metaDescription: "Professional plaster casting services with Swiss precision. Expert interior and exterior plastering for residential and commercial projects."
  },
  "drywall": {
    title: "Drywall",
    description: "Complete drywall installation and finishing services. Professional drywalling solutions for interior spaces, including framing, installation, taping, and finishing. We provide smooth, seamless walls and ceilings that meet the highest quality standards.",
    heroImage: "/images/services/drywall.jpg",
    beforeImage: "/images/leranmore services/drywalling learn more/img1.jpg",
    afterImage: "/images/leranmore services/drywalling learn more/img6.jpg",
    galleryImages: [
      "/images/leranmore services/drywalling learn more/img1.jpg",
      "/images/leranmore services/drywalling learn more/img2.jpg",
      "/images/leranmore services/drywalling learn more/img3.jpg",
      "/images/leranmore services/drywalling learn more/img4.jpg",
      "/images/leranmore services/drywalling learn more/img5.jpg",
      "/images/leranmore services/drywalling learn more/img6.jpg",
    ],
    metaDescription: "Professional drywall installation and finishing services. Expert drywalling solutions for interior spaces with Swiss precision."
  },
  "painting": {
    title: "Painting",
    description: "Interior and exterior painting services with premium paints and finishes. Professional preparation and application for lasting results. Our skilled painters deliver flawless finishes that protect and beautify your property, using only the highest quality materials and techniques.",
    heroImage: "/images/services/Bathroom and kitchen renovation.jpg",
    beforeImage: "/images/leranmore services/bathroom/before.jpg",
    afterImage: "/images/leranmore services/bathroom/after.jpg",
    galleryImages: [
      "/images/leranmore services/bathroom/gallery/img-01.jpg",
      "/images/leranmore services/bathroom/gallery/img-02.jpg",
      "/images/leranmore services/bathroom/gallery/img-03.jpg",
      "/images/leranmore services/bathroom/gallery/img-04.jpg",
    ],
    metaDescription: "Professional interior and exterior painting services with premium paints. Expert preparation and application for lasting results."
  },
  "facades-and-insulation": {
    title: "Facades and insulation",
    description: "Expert facade design, installation, and renovation. Modern materials and techniques to protect and beautify your building exterior. Comprehensive insulation solutions that improve energy efficiency while enhancing the aesthetic appeal of your property.",
    heroImage: "/images/services/Facades and insulation.jpg",
    beforeImage: "/images/leranmore services/facades before nad after/before.jpg",
    afterImage: "/images/leranmore services/facades before nad after/after.jpg",
    galleryImages: [
      "/images/leranmore services/facades before nad after/facades/img-01.jpg",
      "/images/leranmore services/facades before nad after/facades/img-02.jpg",
      "/images/leranmore services/facades before nad after/facades/img-03.jpg",
      "/images/leranmore services/facades before nad after/facades/img-04.jpg",
      "/images/leranmore services/facades before nad after/facades/img-05.jpg",
      "/images/leranmore services/facades before nad after/facades/img-06.jpg",
    ],
    metaDescription: "Expert facade design, installation, and renovation with modern insulation solutions. Improve energy efficiency and building aesthetics."
  },
  "customer-masons": {
    title: "Customer Masons",
    description: "Professional masonry services for all your construction needs. Expert bricklaying and stonework by skilled masons. We deliver precision masonry work for foundations, walls, facades, and decorative elements, combining traditional craftsmanship with modern techniques.",
    heroImage: "/images/services/Customer bricklayer.png",
    beforeImage: "/images/leranmore services/bricklayering/img-01.jpg",
    afterImage: "/images/leranmore services/bricklayering/img-06.jpg",
    galleryImages: [
      "/images/leranmore services/bricklayering/img-01.jpg",
      "/images/leranmore services/bricklayering/img-02.jpg",
      "/images/leranmore services/bricklayering/img-03.jpg",
      "/images/leranmore services/bricklayering/img-04.jpg",
      "/images/leranmore services/bricklayering/img-05.jpg",
      "/images/leranmore services/bricklayering/img-06.jpg",
    ],
    metaDescription: "Professional masonry and bricklaying services. Expert masons delivering precision stonework and brick construction."
  },
  "bathroom-kitchen-renovation": {
    title: "Bathroom-kitchen renovation",
    description: "Complete renovation services for bathrooms and kitchens. From planning to execution, we transform your space efficiently. Our renovation experts handle everything from plumbing and electrical work to tiling, cabinetry, and finishing touches, ensuring your renovated space meets your exact specifications.",
    heroImage: "/images/services/Bathroom and kitchen renovation.jpg",
    beforeImage: "/images/leranmore services/bathroom/before.jpg",
    afterImage: "/images/leranmore services/bathroom/after.jpg",
    galleryImages: [
      "/images/leranmore services/bathroom/gallery/img-01.jpg",
      "/images/leranmore services/bathroom/gallery/img-02.jpg",
      "/images/leranmore services/bathroom/gallery/img-03.jpg",
      "/images/leranmore services/bathroom/gallery/img-04.jpg",
      "/images/leranmore services/bathroom/gallery/img-05.jpg",
      "/images/leranmore services/bathroom/gallery/img-06.jpg",
    ],
    metaDescription: "Complete bathroom and kitchen renovation services. Expert planning and execution to transform your space efficiently."
  },
  "general-demolition-work": {
    title: "General demolition work",
    description: "Professional demolition services for safe and efficient removal of structures. Expert demolition work for renovations, rebuilds, and site preparation. We handle all aspects of demolition with precision, safety, and environmental responsibility, ensuring proper disposal and site cleanup.",
    heroImage: "/images/services/General demolition work.png",
    beforeImage: "/images/leranmore services/general/before-01.jpg",
    afterImage: "/images/leranmore services/general/after-01.jpg",
    galleryImages: [
      "/images/leranmore services/general/gallery/img-01.jpg",
      "/images/leranmore services/general/gallery/img-02.jpg",
      "/images/leranmore services/general/gallery/img-03.jpg",
      "/images/leranmore services/general/gallery/img-04.jpg",
      "/images/leranmore services/general/gallery/img-05.jpg",
      "/images/leranmore services/general/gallery/img-06.jpg",
    ],
    metaDescription: "Professional demolition services for safe and efficient structure removal. Expert demolition work for renovations and site preparation."
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData[params.slug];
  
  if (!service) {
    return {
      title: "Service Not Found | POSKA MANOLITO AG",
    };
  }

  return {
    title: `${service.title} | POSKA MANOLITO AG`,
    description: service.metaDescription,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#016aac]/85 via-[#016aac]/75 to-[#016aac]/85"></div>
        </div>

        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md relative z-10 px-4">
          <div className="max-w-3xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow-md">
              Professional {service.title.toLowerCase()} services with Swiss precision and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none" data-aos="fade-up">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {service.description}
              </p>
            </div>

            {/* Before/After Slider */}
            {service.beforeImage && service.afterImage && (
              <div className="my-16" data-aos="fade-up" data-aos-delay="100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-midnight_text dark:text-white mb-2">
                    Transformation Showcase
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Drag the handle to see the before and after transformation
                  </p>
                </div>
                <BeforeAfterSlider
                  beforeImage={service.beforeImage}
                  afterImage={service.afterImage}
                  beforeLabel="Before"
                  afterLabel="After"
                  className="w-full"
                />
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-12" data-aos="fade-up" data-aos-delay="200">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-lg shadow-md hover:scale-105"
              >
                Get a Quote
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Images Section */}
      {service.galleryImages.length > 0 && (
        <section className="py-16 lg:py-24 bg-section dark:bg-darklight">
          <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-4">
                Our Work
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                See examples of our {service.title.toLowerCase()} projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Image
                    src={image}
                    alt={`${service.title} project ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA Section */}
      <section className="py-16 lg:py-24 bg-[#016aac]">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 text-center">
          <div className="max-w-2xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us today for a free consultation and quote on your {service.title.toLowerCase()} needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-[#016aac] rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:scale-105"
            >
              Contact Us
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
