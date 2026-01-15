import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import { getProjectBySlug, getProjectSlugs } from '@/lib/contentful/api';
import { getContentfulImageUrl } from '@/lib/contentful/image';
import { LuExternalLink, LuGithub } from 'react-icons/lu';

export const revalidate = 60;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
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
        {techItems.length ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Tech used</h2>
            <div className="flex flex-wrap gap-2">
              {techItems.map((tech) => (
                <span
                  key={tech.sys.id}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {tech.icon?.url && tech.icon.width && tech.icon.height ? (
                    <Image
                      src={getContentfulImageUrl(tech.icon) ?? tech.icon.url}
                      alt={tech.icon.description ?? tech.name}
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                  ) : null}
                  {tech.name}
                </span>
              ))}
            </div>
          </section>
        ) : null}
      </header>
      {project.projectUrl || project.githubUrl ? (
        <div className="flex flex-wrap justify-center gap-6">
          {project.projectUrl ? (
            <Link
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-lg font-medium text-foreground underline decoration-foreground/40 underline-offset-4"
            >
              <LuExternalLink size={20} />
              Visit project
            </Link>
          ) : null}
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-lg font-medium text-foreground underline decoration-foreground/40 underline-offset-4"
            >
              <LuGithub size={20} />
              GitHub repo
            </Link>
          ) : null}
        </div>
      ) : null}
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
    </article>
  );
}
