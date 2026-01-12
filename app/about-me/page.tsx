import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { getPageBySlug } from '@/lib/contentful/api';
import { getContentfulImageUrl } from '@/lib/contentful/image';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about-me');
  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? undefined
  };
}

export default async function AboutPage() {
  const page = await getPageBySlug('about-me');

  if (!page) {
    notFound();
  }

  const heroImageUrl = getContentfulImageUrl(page.heroImage);
  const mediaItems = page.mediaCollection?.items ?? [];
  const downloads = mediaItems.filter(
    (item) => item.contentType === 'application/pdf'
  );

  return (
    <div className="space-y-12">
      <header className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">
          {page.heroTitle ?? page.title}
        </h1>
        {heroImageUrl && page.heroImage?.width && page.heroImage?.height ? (
          <Image
            src={heroImageUrl}
            alt={page.heroImage.description ?? ''}
            width={page.heroImage.width}
            height={page.heroImage.height}
            className="h-80 w-full rounded-3xl object-cover"
          />
        ) : null}
      </header>
      {page.sectionsCollection?.items?.length ? (
        <SectionRenderer sections={page.sectionsCollection.items} />
      ) : (
        <RichText document={page.body?.json} />
      )}
      {downloads.length ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Download resume</h2>
          <div className="flex flex-wrap gap-3">
            {downloads.map((item) => {
              const url = getContentfulImageUrl(item);
              if (!url) {
                return null;
              }
              const label = item.description ?? item.fileName ?? 'Download';
              return (
                <a
                  key={url}
                  href={url}
                  className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                  target="_blank"
                  rel="noreferrer"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
