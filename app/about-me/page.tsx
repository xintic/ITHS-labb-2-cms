import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import {
  getExperienceList,
  getPageBySlug,
  getTechList
} from '@/lib/contentful/api';
import { getContentfulImageUrl } from '@/lib/contentful/image';
import { LuDownload } from 'react-icons/lu';

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about-me');
  if (!page) {
    return {};
  }

  return {
    title: page.title ?? undefined,
    description: page.seoDescription ?? undefined
  };
}

export default async function AboutPage() {
  const [page, experiences, techItems] = await Promise.all([
    getPageBySlug('about-me'),
    getExperienceList(),
    getTechList()
  ]);

  if (!page) {
    notFound();
  }

  const heroImageUrl = getContentfulImageUrl(page.heroImage);
  const mediaItems = page.mediaCollection?.items ?? [];
  const downloads = mediaItems.filter(
    (item) => item.contentType === 'application/pdf'
  );
  const sortedExperiences = [...experiences].sort(
    (a, b) => (b.order ?? 0) - (a.order ?? 0)
  );
  const educationExperiences = sortedExperiences.filter((experience) => {
    const type = (experience.category ?? '').toLowerCase();
    return type.includes('education');
  });
  const workExperiences = sortedExperiences.filter((experience) => {
    const type = (experience.category ?? '').toLowerCase();
    return type.includes('work experience');
  });

  return (
    <div className="space-y-12">
      <header className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">
          {page.heroTitle ?? page.title}
        </h1>
      </header>
      <section className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="min-w-0 flex-1">
          <RichText document={page.body?.json} />
        </div>
        {heroImageUrl && page.heroImage?.width && page.heroImage?.height ? (
          <Image
            src={heroImageUrl}
            alt={page.heroImage.description ?? ''}
            width={page.heroImage.width}
            height={page.heroImage.height}
            className="h-90 w-full flex-none rounded-3xl object-cover object-[center_40%] md:w-96"
          />
        ) : null}
      </section>
      {educationExperiences.length ||
      workExperiences.length ||
      techItems.length ? (
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="space-y-10">
            {educationExperiences.length ? (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Education
                </h2>
                <div className="space-y-6 border-l-2 border-border pl-6">
                  {educationExperiences.map((experience) => (
                    <article key={experience.sys.id} className="relative">
                      {experience.start || experience.end ? (
                        <p className="text-sm text-muted-foreground">
                          {experience.start ?? ''}
                          {experience.start && experience.end ? ' — ' : ''}
                          {experience.end ?? ''}
                        </p>
                      ) : null}
                      <h3 className="text-lg font-semibold">
                        {experience.role}
                      </h3>
                      <p className="text-sm font-medium uppercase tracking-wide">
                        {experience.place}
                      </p>
                      {experience.role || experience.type ? (
                        <p className="text-sm">{experience.type}</p>
                      ) : null}
                      {experience.description ? (
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {experience.description}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
            {workExperiences.length ? (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Work experience
                </h2>
                <div className="space-y-6 border-l-2 border-border pl-6">
                  {workExperiences.map((experience) => (
                    <article key={experience.sys.id} className="relative">
                      {experience.start || experience.end ? (
                        <p className="text-sm text-muted-foreground">
                          {experience.start ?? ''}
                          {experience.start && experience.end ? ' — ' : ''}
                          {experience.end ?? ''}
                        </p>
                      ) : null}
                      <h3 className="text-lg font-semibold">
                        {experience.role}
                      </h3>
                      <p className="text-sm font-medium uppercase tracking-wide">
                        {experience.place}
                      </p>
                      {experience.role || experience.type ? (
                        <p className="text-sm">{experience.type}</p>
                      ) : null}
                      {experience.description ? (
                        <p className="text-sm text-muted-foreground">
                          {experience.description}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
          {techItems.length ? (
            <aside className="space-y-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold tracking-tight">
                Technologies
              </h2>
              {(['frontend', 'backend', 'tools'] as const).map((category) => {
                const group = techItems
                  .filter((tech) => tech.category?.toLowerCase() === category)
                  .sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
                if (!group.length) {
                  return null;
                }
                const label =
                  category === 'frontend'
                    ? 'Frontend'
                    : category === 'backend'
                      ? 'Backend'
                      : 'Tools';
                return (
                  <div key={category} className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.map((tech) => (
                        <span
                          key={tech.sys.id}
                          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground"
                        >
                          {tech.icon?.url &&
                          tech.icon.width &&
                          tech.icon.height ? (
                            <Image
                              src={
                                getContentfulImageUrl(tech.icon) ??
                                tech.icon.url
                              }
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
                  </div>
                );
              })}
            </aside>
          ) : null}
        </section>
      ) : null}
      {downloads.length ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Download resume
          </h2>
          <div className="flex flex-wrap gap-3">
            {downloads.map((item) => {
              const url = getContentfulImageUrl(item);
              if (!url) {
                return null;
              }
              const label = item.description ?? item.fileName ?? 'Download';
              return (
                <button
                  key={url}
                  className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                >
                  <LuDownload className="mr-1" />
                  <a href={url} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
