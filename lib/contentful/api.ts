import { fetchGraphQL } from './client';
import {
  NAVIGATION_QUERY,
  PAGE_BY_SLUG_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECT_LIST_QUERY,
  PROJECT_SLUGS_QUERY,
  SITE_SETTINGS_QUERY,
  TECH_LIST_QUERY,
  EXPERIENCE_LIST_QUERY
} from './queries';
import type {
  Experience,
  NavigationItem,
  Page,
  Project,
  SiteSettings,
  TechItem
} from './types';

type CollectionResponse<T> = {
  items: T[];
};

export async function getNavigationItems(revalidate = 60) {
  const data = await fetchGraphQL<{ navigationItemCollection: CollectionResponse<NavigationItem> }>(
    NAVIGATION_QUERY,
    undefined,
    { revalidate, tags: ['navigation'] }
  );
  return data.navigationItemCollection.items;
}

export async function getSiteSettings(revalidate = 60) {
  const data = await fetchGraphQL<{ siteSettingsCollection: CollectionResponse<SiteSettings> }>(
    SITE_SETTINGS_QUERY,
    undefined,
    { revalidate, tags: ['site-settings'] }
  );
  return data.siteSettingsCollection.items[0] ?? null;
}

export async function getPageBySlug(slug: string, revalidate = 60) {
  const data = await fetchGraphQL<{ pageCollection: CollectionResponse<Page> }>(
    PAGE_BY_SLUG_QUERY,
    { slug },
    { revalidate, tags: [`page:${slug}`] }
  );
  return data.pageCollection.items[0] ?? null;
}

export async function getProjectList(revalidate = 60) {
  const data = await fetchGraphQL<{ projectCollection: CollectionResponse<Project> }>(
    PROJECT_LIST_QUERY,
    undefined,
    { revalidate, tags: ['projects'] }
  );
  return data.projectCollection.items;
}

export async function getProjectBySlug(slug: string, revalidate = 60) {
  if (!slug) {
    return null;
  }
  const data = await fetchGraphQL<{ projectCollection: CollectionResponse<Project> }>(
    PROJECT_BY_SLUG_QUERY,
    { slug },
    { revalidate, tags: [`project:${slug}`] }
  );
  return data.projectCollection.items[0] ?? null;
}

export async function getProjectSlugs() {
  const data = await fetchGraphQL<{ projectCollection: CollectionResponse<{ slug: string | null }> }>(
    PROJECT_SLUGS_QUERY
  );
  return data.projectCollection.items
    .map((item) => item.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export async function getTechList(revalidate = 60) {
  const data = await fetchGraphQL<{ techCollection: CollectionResponse<TechItem> }>(
    TECH_LIST_QUERY,
    undefined,
    { revalidate, tags: ['tech'] }
  );
  return data.techCollection.items;
}

export async function getExperienceList(revalidate = 60) {
  const data = await fetchGraphQL<{ experienceCollection: CollectionResponse<Experience> }>(
    EXPERIENCE_LIST_QUERY,
    undefined,
    { revalidate, tags: ['experience'] }
  );
  return data.experienceCollection.items;
}
