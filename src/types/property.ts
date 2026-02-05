export interface propertyData {
  id: string;
  propertyId?: string;
  property_title: string;
  property_img: string;
  property_price?: string;
  location: string;
  category: string;
  category_img?: string;
  rooms?: number;
  bathrooms?: number;
  livingArea?: string;
  tag: string;
  check?: boolean;
  status?: string;
  type?: string;
  beds?: number;
  garages?: number;
  region?: string;
  name?: string;
  slug: string;
  works?: string[];
  architecturePlanning?: string;
}
