import type { Document } from '@contentful/rich-text-types';

export type ContentfulSys = {
  id: string;
};

export type ContentfulAsset = {
  url: string;
  width?: number | null;
  height?: number | null;
  description?: string | null;
};

export type NavigationItem = {
  sys: ContentfulSys;
  label: string;
  order?: number | null;
  page?: {
    slug?: string | null;
  } | null;
};

export type SiteSettings = {
  sys: ContentfulSys;
  siteName?: string | null;
  email?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  profileImage?: ContentfulAsset | null;
  footerText?: string | null;
};

export type TechItem = {
  sys: ContentfulSys;
  name: string;
  category?: string | null;
  slug?: string | null;
  url?: string | null;
  icon?: ContentfulAsset | null;
};

export type Project = {
  sys: ContentfulSys;
  title: string;
  slug: string;
  excerpt?: string | null;
  description?: { json: Document } | null;
  projectUrl?: string | null;
  githubUrl?: string | null;
  featured?: boolean | null;
  coverImage?: ContentfulAsset | null;
  techCollection?: {
    items: TechItem[];
  } | null;
};

export type Section = {
  __typename: 'Section';
  sys: ContentfulSys;
  type?: string | null;
  headline?: string | null;
  body?: { json: Document } | null;
  image?: ContentfulAsset | null;
  linkedProjects?: Project | null;
};

export type PageSection = Section;

export type Page = {
  sys: ContentfulSys;
  title: string;
  slug: string;
  heroTitle?: string | null;
  body?: { json: Document } | null;
  heroImage?: ContentfulAsset | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  sectionsCollection?: {
    items: PageSection[];
  } | null;
};
