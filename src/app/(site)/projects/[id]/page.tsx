import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allProjects } from "@/app/data/projects";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = allProjects.find(p => p.id === parseInt(id));
  
  if (!project) {
    return {
      title: "Project Not Found | POSKA MANOLITO AG",
    };
  }

  return {
    title: `${project.title} | POSKA MANOLITO AG`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = allProjects.find(p => p.id === parseInt(id));

  if (!project) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#016aac]/85 via-[#016aac]/75 to-[#016aac]/85"></div>
        </div>

        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md relative z-10 px-4">
          <div className="max-w-3xl" data-aos="fade-up">
            <div className="mb-4">
              <p className="text-sm font-semibold text-white/90 uppercase tracking-wide mb-2">
                Property ID: <span className="text-white font-bold">{project.propertyId}</span>
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow-md">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Project Overview Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="space-y-6" data-aos="fade-up">
                {/* Property ID */}
                <div className="bg-white dark:bg-darklight rounded-xl p-6 shadow-md border border-gray-200 dark:border-dark_border">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Property ID:
                  </p>
                  <p className="text-lg font-bold text-[#016aac]">
                    {project.propertyId}
                  </p>
                </div>

                {/* Object */}
                <div className="bg-white dark:bg-darklight rounded-xl p-6 shadow-md border border-gray-200 dark:border-dark_border">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Object:
                  </p>
                  <p className="text-xl font-semibold text-midnight_text dark:text-white">
                    {project.object}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
                {/* Works */}
                <div className="bg-white dark:bg-darklight rounded-xl p-6 shadow-md border border-gray-200 dark:border-dark_border">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                    Works:
                  </p>
                  <ul className="space-y-3">
                    {project.works.map((work, workIndex) => (
                      <li key={workIndex} className="flex items-start">
                        <span className="text-[#016aac] mr-3 mt-1 text-lg font-bold">•</span>
                        <span className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                          {work}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture and planning */}
                <div className="bg-white dark:bg-darklight rounded-xl p-6 shadow-md border border-gray-200 dark:border-dark_border">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Architecture and planning:
                  </p>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.architectureAndPlanning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Images Section */}
      {project.galleryImages.length > 0 && (
        <section className="py-16 lg:py-24 bg-section dark:bg-darklight">
          <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-4">
                Project Gallery
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Visual documentation of our work on this project
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
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

      {/* Additional Details Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-6">
              Project Details
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {project.description}
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                This project showcases our commitment to quality craftsmanship and attention to detail. 
                Our team worked diligently to ensure every aspect of the project met the highest standards, 
                from initial planning through final completion. The result is a testament to our expertise 
                in {project.category.toLowerCase()} and our dedication to delivering exceptional results for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 lg:py-24 bg-[#016aac]">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 text-center">
          <div className="max-w-2xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Interested in a Similar Project?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us today to discuss your project requirements and get a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#016aac] rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:scale-105"
              >
                Get a Quote
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all duration-300 font-semibold text-lg"
              >
                Contact Us
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
