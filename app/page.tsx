import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import { Button } from '@/components/ui/button';
import { getPageBySlug, getSiteSettings } from '@/lib/contentful/api';
import { getContentfulImageUrl } from '@/lib/contentful/image';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home');
  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? undefined
  };
}

export default async function Home() {
  const [page, settings] = await Promise.all([
    getPageBySlug('home'),
    getSiteSettings()
  ]);

  if (!page) {
    notFound();
  }

  const profileImageUrl = getContentfulImageUrl(settings?.profileImage ?? null);

  return (
    <div className="space-y-12">
      <header className="flex flex-col items-center gap-8 md:flex-row">
        {profileImageUrl &&
        settings?.profileImage?.width &&
        settings.profileImage.height ? (
          <Image
            src={profileImageUrl}
            alt={settings.profileImage.description ?? ''}
            width={settings.profileImage.width}
            height={settings.profileImage.height}
            className="h-48 w-48 flex-none rounded-full object-cover object-[center_30%] sm:h-64 sm:w-64 lg:h-80 lg:w-80"
            priority
          />
        ) : null}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-4xl lg:text-7xl">
            {page.heroTitle ?? page.title}
          </h1>
          {page?.heroText ? (
            <p className="text-lg text-muted-foreground">{page.heroText}</p>
          ) : null}
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </header>
      <RichText document={page.body?.json} />
    </div>
  );
}
