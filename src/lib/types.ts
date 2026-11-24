export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
  published: boolean;
};

export type Activity = {
  id: string;
  title: string;
  summary: string;
  details: string;
  image: string;
  published: boolean;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

export type EnquiryStatus = "Pending" | "Contacted" | "Completed";

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  interest: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
};

export type Director = {
  id: string;
  name: string;
  designation: string;
  note: string;
};

export type HomeSections = {
  intro: boolean;
  activities: boolean;
  products: boolean;
  commitment: boolean;
  gallery: boolean;
  whyChoose: boolean;
  visionMission: boolean;
  cta: boolean;
  contact: boolean;
};

export type SiteContent = {
  heroHeading: string;
  heroDescription: string;
  heroImage: string;
  aboutIntro: string;
  whoWeAre: string;
  vision: string;
  mission: string;
  values: string;
  commitmentAgriculture: string;
  commitmentFarmers: string;
  sections: HomeSections;
};

export type SocialLinks = {
  facebook: string;
  instagram: string;
  youtube: string;
  x: string;
};

export type CompanySettings = {
  companyName: string;
  shortName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  social: SocialLinks;
};

export type AppData = {
  version: 1;
  products: Product[];
  activities: Activity[];
  gallery: GalleryItem[];
  enquiries: Enquiry[];
  directors: Director[];
  productCategories: string[];
  galleryCategories: string[];
  content: SiteContent;
  settings: CompanySettings;
};
