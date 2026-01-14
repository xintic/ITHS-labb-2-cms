import type { Document } from '@contentful/rich-text-types';

export type ContentfulSys = {
  id: string;
};

export type ContentfulAsset = {
  url: string;
  width?: number | null;
  height?: number | null;
  description?: string | null;
  fileName?: string | null;
  contentType?: string | null;
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
};

export type TechItem = {
  sys: ContentfulSys;
  name: string;
  category?: string | null;
  slug?: string | null;
  url?: string | null;
  icon?: ContentfulAsset | null;
};

export type Experience = {
  sys: ContentfulSys;
  place: string;
  category?: string | null;
  start?: string | null;
  end?: string | null;
  role?: string | null;
  type?: string | null;
  description?: string | null;
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
  order?: number | null;
  coverImage?: ContentfulAsset | null;
  techCollection?: {
    items: TechItem[];
  } | null;
};

export type Page = {
  sys: ContentfulSys;
  title: string;
  slug: string;
  heroTitle?: string | null;
  heroText?: string | null;
  body?: { json: Document } | null;
  heroImage?: ContentfulAsset | null;
  mediaCollection?: {
    items: ContentfulAsset[];
  } | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};
