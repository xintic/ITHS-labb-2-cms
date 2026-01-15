import type { Metadata } from 'next';
import { ProjectsFilter } from '@/components/ProjectsFilter';
import { RichText } from '@/components/RichText';
import { getPageBySlug, getProjectList } from '@/lib/contentful/api';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects from the portfolio.'
};

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
