import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { RichText } from '@/components/RichText';
import { getPageBySlug, getSiteSettings } from '@/lib/contentful/api';
import { getContentfulImageUrl } from '@/lib/contentful/image';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('contact');
  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? undefined
  };
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([
    getPageBySlug('contact'),
    getSiteSettings()
  ]);

  if (!page) {
    notFound();
  }

  const heroImageUrl = getContentfulImageUrl(page.heroImage);

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
      <RichText document={page.body?.json} />
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Contact details</h2>
        <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
          {settings?.email ? (
            <a
              href={`mailto:${settings.email}`}
              className="hover:text-foreground"
            >
              {settings.email}
            </a>
          ) : null}
          {settings?.githubUrl ? (
            <Link href={settings.githubUrl} className="hover:text-foreground">
              GitHub
            </Link>
          ) : null}
          {settings?.linkedinUrl ? (
            <Link href={settings.linkedinUrl} className="hover:text-foreground">
              LinkedIn
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
