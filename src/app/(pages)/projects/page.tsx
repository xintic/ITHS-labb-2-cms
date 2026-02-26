import type { Metadata } from 'next';
import { ProjectsFilter } from '@/src/components/ProjectsFilter';
import { RichText } from '@/src/components/RichText';
import { getPageBySlug, getProjectList } from '@/src/lib/contentful/api';

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('projects');
  if (!page) {
    return {};
  }

  return {
    title: page.title ?? undefined,
    description: page.seoDescription ?? undefined
  };
}

export default async function ProjectsPage() {
  const [projects, page] = await Promise.all([
    getProjectList(),
    getPageBySlug('projects')
  ]);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">
          {page?.heroTitle ?? page.title}
        </h1>
        {page?.heroText ? (
          <p className="text-lg text-muted-foreground">{page.heroText}</p>
        ) : null}
      </header>
      <RichText document={page.body?.json} />
      <ProjectsFilter projects={projects} />
    </div>
  );
}
