import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSub from "@/app/components/shared/hero-sub";
import { allProjects } from "@/app/data/projects";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Our Projects | POSKA MANOLITO AG",
  description: "Explore our portfolio of completed construction, renovation, and building projects. Showcasing our expertise and commitment to quality across Switzerland.",
};

export default function ProjectsPage() {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/projects", text: "Projects" },
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSub
        title="Our Projects"
        description="Showcasing our expertise through completed projects. Each project reflects our commitment to quality and excellence."
        breadcrumbLinks={breadcrumbLinks}
      />

      {/* Projects Grid Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-darklight rounded-xl overflow-hidden border border-gray-200 dark:border-dark_border shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  {/* Property ID */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Property ID:
                    </p>
                    <p className="text-sm font-bold text-[#016aac]">
                      {project.propertyId}
                    </p>
                  </div>

                  {/* Object */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Object:
                    </p>
                    <p className="text-base font-semibold text-midnight_text dark:text-white">
                      {project.object}
                    </p>
                  </div>

                  {/* Works */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Works:
                    </p>
                    <ul className="space-y-1.5">
                      {project.works.map((work, workIndex) => (
                        <li key={workIndex} className="flex items-start">
                          <span className="text-[#016aac] mr-2 mt-1.5">•</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {work}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture and planning */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Architecture and planning:
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.architectureAndPlanning}
                    </p>
                  </div>

                  {/* LEARN MORE Button */}
                  <div className="pt-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-sm shadow-md hover:scale-[1.02] group/btn"
                    >
                      LEARN MORE
                      <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-section dark:bg-darklight">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 text-center">
          <div className="max-w-2xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Let's discuss how we can bring your vision to life with our professional construction services.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-lg shadow-md hover:scale-105"
            >
              Get a Free Quote
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
