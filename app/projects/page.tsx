import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProjectList } from '@/lib/contentful/api';
import { getContentfulImageUrl } from '@/lib/contentful/image';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects from the portfolio.'
};

export default async function ProjectsPage() {
  const projects = await getProjectList();

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
        <p className="text-lg text-muted-foreground">
          A selection of recent work and experiments.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => {
          const imageUrl = getContentfulImageUrl(project.coverImage);
          return (
            <Link
              key={project.sys.id}
              href={`/projects/${project.slug}`}
              className="group rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1"
            >
              {imageUrl && project.coverImage?.width && project.coverImage?.height ? (
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <Image
                    src={imageUrl}
                    alt={project.coverImage.description ?? ''}
                    width={project.coverImage.width}
                    height={project.coverImage.height}
                    className="h-48 w-full object-cover transition group-hover:scale-[1.02]"
                  />
                </div>
              ) : null}
              <h2 className="text-lg font-semibold">{project.title}</h2>
              {project.excerpt ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.excerpt}
                </p>
              ) : null}
              {project.techCollection?.items?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techCollection.items.map((tech) => (
                    <span
                      key={tech.sys.id}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
