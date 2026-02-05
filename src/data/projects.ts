// Shared projects data for use across project pages
export interface Project {
  id: number;
  propertyId: string;
  title: string;
  category: string;
  object: string;
  works: string[];
  architectureAndPlanning: string;
  description: string;
  image: string;
  galleryImages: string[];
}

export const allProjects: Project[] = [
  {
    id: 1,
    propertyId: "PRO-001",
    title: "Modern Residential Complex",
    category: "Construction",
    object: "Modern Residential Complex",
    works: [
      "Complete construction",
      "Foundation work",
      "Structural framework",
      "Energy-efficient systems installation"
    ],
    architectureAndPlanning: "Contemporary design with modern architectural planning and energy-efficient systems.",
    description: "Complete construction of a modern residential complex with 50 units, featuring contemporary design and energy-efficient systems.",
    image: "/images/leranmore services/general/gallery/img-01.jpg",
    galleryImages: [
      "/images/leranmore services/general/gallery/img-01.jpg",
      "/images/leranmore services/general/gallery/img-02.jpg",
      "/images/leranmore services/general/gallery/img-03.jpg",
      "/images/leranmore services/general/gallery/img-04.jpg",
      "/images/leranmore services/general/gallery/img-05.jpg",
      "/images/leranmore services/general/gallery/img-06.jpg",
    ]
  },
  {
    id: 2,
    propertyId: "PRO-002",
    title: "Historic Building Renovation",
    category: "Renovation",
    object: "Historic Building Renovation",
    works: [
      "Building restoration",
      "Interior modernization",
      "System upgrades",
      "Preservation of original architecture"
    ],
    architectureAndPlanning: "Comprehensive renovation preserving original architecture while modernizing interior systems.",
    description: "Comprehensive renovation of a historic building, preserving original architecture while modernizing interior systems.",
    image: "/images/leranmore services/bathroom/gallery/img-01.jpg",
    galleryImages: [
      "/images/leranmore services/bathroom/gallery/img-01.jpg",
      "/images/leranmore services/bathroom/gallery/img-02.jpg",
      "/images/leranmore services/bathroom/gallery/img-03.jpg",
      "/images/leranmore services/bathroom/gallery/img-04.jpg",
      "/images/leranmore services/bathroom/gallery/img-05.jpg",
      "/images/leranmore services/bathroom/gallery/img-06.jpg",
    ]
  },
  {
    id: 3,
    propertyId: "PRO-003",
    title: "Commercial Facade Upgrade",
    category: "Facades",
    object: "Commercial Facade Upgrade",
    works: [
      "Facade renovation",
      "Insulation installation",
      "Modern materials application",
      "Aesthetic enhancement"
    ],
    architectureAndPlanning: "Complete facade renovation using modern materials and insulation systems for improved aesthetics and energy efficiency.",
    description: "Complete facade renovation using modern materials and insulation systems, improving both aesthetics and energy efficiency.",
    image: "/images/leranmore services/facades before nad after/facades/img-01.jpg",
    galleryImages: [
      "/images/leranmore services/facades before nad after/facades/img-01.jpg",
      "/images/leranmore services/facades before nad after/facades/img-02.jpg",
      "/images/leranmore services/facades before nad after/facades/img-03.jpg",
      "/images/leranmore services/facades before nad after/facades/img-04.jpg",
      "/images/leranmore services/facades before nad after/facades/img-05.jpg",
      "/images/leranmore services/facades before nad after/facades/img-06.jpg",
    ]
  },
  {
    id: 4,
    propertyId: "PRO-004",
    title: "Interior Plastering Project",
    category: "Plastering",
    object: "Interior Plastering Project",
    works: [
      "Interior plastering",
      "Decorative finishes",
      "Surface preparation",
      "Quality finishing work"
    ],
    architectureAndPlanning: "Professional interior plastering with decorative finishes throughout a luxury residential property.",
    description: "Professional interior plastering with decorative finishes throughout a luxury residential property.",
    image: "/images/leranmore services/plaster/01.jpg",
    galleryImages: [
      "/images/leranmore services/plaster/01.jpg",
      "/images/leranmore services/plaster/02.jpg",
      "/images/leranmore services/plaster/03.jpg",
      "/images/leranmore services/plaster/04.jpg",
      "/images/leranmore services/plaster/05.jpg",
      "/images/leranmore services/plaster/06.jpg",
    ]
  },
  {
    id: 5,
    propertyId: "PRO-005",
    title: "Exterior Painting & Coating",
    category: "Painting",
    object: "Exterior Painting & Coating",
    works: [
      "Exterior painting",
      "Protective coating",
      "Surface preparation",
      "Multi-story application"
    ],
    architectureAndPlanning: "Complete exterior painting and protective coating system for a multi-story commercial building.",
    description: "Complete exterior painting and protective coating system for a multi-story commercial building.",
    image: "/images/leranmore services/bathroom/gallery/img-02.jpg",
    galleryImages: [
      "/images/leranmore services/bathroom/gallery/img-02.jpg",
      "/images/leranmore services/bathroom/gallery/img-03.jpg",
      "/images/leranmore services/bathroom/gallery/img-04.jpg",
      "/images/leranmore services/bathroom/gallery/img-05.jpg",
      "/images/leranmore services/bathroom/gallery/img-06.jpg",
      "/images/leranmore services/bathroom/gallery/img-07.jpg",
    ]
  },
  {
    id: 6,
    propertyId: "PRO-006",
    title: "Mixed-Use Development",
    category: "Construction",
    object: "Mixed-Use Development",
    works: [
      "Large-scale construction",
      "Residential units",
      "Commercial spaces",
      "Retail integration"
    ],
    architectureAndPlanning: "Large-scale mixed-use development project combining residential, commercial, and retail spaces.",
    description: "Large-scale mixed-use development project combining residential, commercial, and retail spaces.",
    image: "/images/leranmore services/general/gallery/img-02.jpg",
    galleryImages: [
      "/images/leranmore services/general/gallery/img-02.jpg",
      "/images/leranmore services/general/gallery/img-03.jpg",
      "/images/leranmore services/general/gallery/img-04.jpg",
      "/images/leranmore services/general/gallery/img-05.jpg",
      "/images/leranmore services/general/gallery/img-06.jpg",
    ]
  }
];
