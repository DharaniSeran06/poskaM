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
          {/* Section Header */}
          <div className="text-center mb-14" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full
              bg-primary/5 dark:bg-primary/10 border border-primary/15 dark:border-primary/25
              text-primary dark:text-cyan text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-cyan" />
              POSKA MANOLITO AG
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white">
              Why Poska Manolito S.A.?
            </h2>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Card 1: Customer Knowledge */}
            <div
              className="group relative bg-section dark:bg-darklight rounded-2xl p-8 border border-border dark:border-dark_border
                hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5
                transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl
                bg-primary/10 dark:bg-primary/15 mb-5
                group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <svg className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <p className="text-base md:text-lg font-medium text-midnight_text dark:text-white leading-relaxed">
                We know our customers and their needs.
              </p>
            </div>

            {/* Card 2: Best Selection */}
            <div
              className="group relative bg-section dark:bg-darklight rounded-2xl p-8 border border-border dark:border-dark_border
                hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5
                transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl
                bg-primary/10 dark:bg-primary/15 mb-5
                group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <svg className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <p className="text-base md:text-lg font-medium text-midnight_text dark:text-white leading-relaxed">
                We offer the best selection of services.
              </p>
            </div>

            {/* Card 3: Experienced Employees */}
            <div
              className="group relative bg-section dark:bg-darklight rounded-2xl p-8 border border-border dark:border-dark_border
                hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5
                transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl
                bg-primary/10 dark:bg-primary/15 mb-5
                group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <svg className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <p className="text-base md:text-lg font-medium text-midnight_text dark:text-white leading-relaxed">
                We are proud of our experienced and loyal employees, with their human and professional strengths.
              </p>
            </div>

            {/* Card 4: Best Value */}
            <div
              className="group relative bg-section dark:bg-darklight rounded-2xl p-8 border border-border dark:border-dark_border
                hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5
                transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl
                bg-primary/10 dark:bg-primary/15 mb-5
                group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <svg className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-base md:text-lg font-medium text-midnight_text dark:text-white leading-relaxed">
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
