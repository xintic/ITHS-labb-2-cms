import Image from 'next/image';
import Link from 'next/link';
import type { Section } from '@/lib/contentful/types';
import { getContentfulImageUrl } from '@/lib/contentful/image';

type ProjectGridSectionProps = {
  section: Section;
};

export function ProjectGridSection({ section }: ProjectGridSectionProps) {
  const projects = section.linkedProjects ? [section.linkedProjects] : [];

  return (
    <section className="space-y-6">
      {section.headline ? (
        <h2 className="text-2xl font-semibold tracking-tight">
          {section.headline}
        </h2>
      ) : null}
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => {
          const imageUrl = getContentfulImageUrl(project.coverImage);
          return (
            <Link
              key={project.sys.id}
              href={`/projects/${project.slug}`}
              className="group rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1"
            >
              {imageUrl &&
              project.coverImage?.width &&
              project.coverImage?.height ? (
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
              <h3 className="text-lg font-semibold">{project.title}</h3>
              {project.excerpt ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.excerpt}
                </p>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
