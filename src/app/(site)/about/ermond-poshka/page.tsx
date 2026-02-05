import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import HeroSub from "@/components/shared/hero-sub";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ermond Poshka - Managing Director | POSKA MANOLITO AG",
  description: "Learn about Ermond Poshka, Managing Director of POSKA MANOLITO AG, and the company's history, mission, and values.",
};

export default function ErmondPoshkaPage() {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About Us" },
    { href: "/about/ermond-poshka", text: "Ermond Poshka" },
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSub
        title="Ermond Poshka"
        description="Managing Director - POSKA MANOLITO AG"
        breadcrumbLinks={breadcrumbLinks}
      />

      {/* Section 1: Why Poska Manolito S.A.? */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-8" data-aos="fade-up">
              Why Poska Manolito S.A.?
            </h2>
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We know our customers and their needs.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We offer the best selection of services.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We are proud of our experienced and loyal employees, with their human and professional strengths.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We guarantee the best value for money of our services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Company Timeline */}
      <section className="py-16 lg:py-24 bg-section dark:bg-darklight">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Timeline Content */}
            <div className="order-2 lg:order-1" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-12">
                Company Timeline
              </h2>
              
              <div className="space-y-10 relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#016aac]/20 dark:bg-[#016aac]/30"></div>
                
                {/* 2003 */}
                <div className="relative pl-16" data-aos="fade-up" data-aos-delay="100">
                  <div className="absolute left-0 top-2 w-12 h-12 bg-[#016aac] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2003</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-[#016aac] mb-3">2003</h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      Poshka Ermond realises his dream of having his own company and founds the sole proprietorship
                      «Gipsergeschäft POSKA» in Zurich. Little by little, he can expand his services, which his customers are very happy to use.
                    </p>
                  </div>
                </div>

                {/* 2009 */}
                <div className="relative pl-16" data-aos="fade-up" data-aos-delay="200">
                  <div className="absolute left-0 top-2 w-12 h-12 bg-[#016aac] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2009</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-[#016aac] mb-3">2009</h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      The company "Manolito AG", which has specialised in concrete separation for 30 years, is acquired.
                      Poska Ermond will also take over the management of the company here.
                    </p>
                  </div>
                </div>

                {/* 2012 */}
                <div className="relative pl-16" data-aos="fade-up" data-aos-delay="300">
                  <div className="absolute left-0 top-2 w-12 h-12 bg-[#016aac] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2012</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-[#016aac] mb-3">2012</h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      The sole proprietorship «Gipsergeschäft POSKA» and the joint-stock company «Manolito AG» are merged.
                      This results in the new public limited company "Poska Manolito AG" based in Winterthur.
                    </p>
                  </div>
                </div>

                {/* 2020 */}
                <div className="relative pl-16" data-aos="fade-up" data-aos-delay="400">
                  <div className="absolute left-0 top-2 w-12 h-12 bg-[#016aac] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2020</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-[#016aac] mb-3">2020</h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      The concrete drilling and milling department is sold.
                      The company focuses mainly on plastering, facades and painting.
                    </p>
                  </div>
                </div>

                {/* Final Note */}
                <div className="relative pl-16 pt-4" data-aos="fade-up" data-aos-delay="500">
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    Our highly experienced employees have remained loyal to the company for years and provide high-quality construction services every day.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Owner Image */}
            <div className="order-1 lg:order-2" data-aos="fade-left">
              <div className="sticky top-24">
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src="/images/owner-picture.jpeg"
                      alt="Ermond Poshka - Managing Director"
                      fill
                      className="object-contain rounded-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Mission Statement */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-12 text-center" data-aos="fade-up">
              Mission Statement
            </h2>
            
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Since 2003, Poska Manolito has been operating in the construction industry market, offering various plastering, façade and painting works.
                To complete the offer, we also provide small demolition, builder and service listings.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We are an independent and established company in the canton of Zurich.
                Our focus is on customer-oriented behaviour, friendliness, solution orientation and adherence to deadlines.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We attach great importance to long-term partnerships with suppliers, customers and partners.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                To ensure impeccable results, we use only high-quality products.
                We follow trends, stay open to innovation, and introduce improvements after careful evaluation.
                Regular quality checks ensure consistently high standards.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Our goal is long-term stability rather than short-term profit.
                We guarantee fair, market-oriented pricing.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We are proud of our loyal, experienced and competent employees.
                We cultivate a family-oriented company culture based on respect, support and teamwork.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Environmental responsibility is important to us.
                We use resources sparingly and dispose of unavoidable waste safely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
