import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import { getProjectBySlug, getProjectSlugs } from '@/lib/contentful/api';
import { getContentfulImageUrl } from '@/lib/contentful/image';

export const revalidate = 60;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.excerpt ?? undefined
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const imageUrl = getContentfulImageUrl(project.coverImage);
  const techItems = project.techCollection?.items ?? [];

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Project
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            {project.title}
          </h1>
        </div>
        {project.excerpt ? (
          <p className="text-lg text-muted-foreground">{project.excerpt}</p>
        ) : null}
        {project.projectUrl ? (
          <Link
            href={project.projectUrl}
            className="inline-flex items-center text-sm font-medium text-foreground underline decoration-foreground/40 underline-offset-4"
          >
            Visit project
          </Link>
        ) : null}
        {project.githubUrl ? (
          <Link
            href={project.githubUrl}
            className="inline-flex items-center text-sm font-medium text-foreground underline decoration-foreground/40 underline-offset-4"
          >
            GitHub repo
          </Link>
        ) : null}
      </header>
      {imageUrl && project.coverImage?.width && project.coverImage?.height ? (
        <Image
          src={imageUrl}
          alt={project.coverImage.description ?? ''}
          width={project.coverImage.width}
          height={project.coverImage.height}
          className="h-96 w-full rounded-3xl object-cover"
        />
      ) : null}
      <RichText document={project.description?.json} />
      {techItems.length ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Tech used</h2>
          <div className="flex flex-wrap gap-2">
            {techItems.map((tech) => (
              <span
                key={tech.sys.id}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
