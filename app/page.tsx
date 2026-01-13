import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
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

  const heroImageUrl = getContentfulImageUrl(page.heroImage);
  const profileImageUrl = getContentfulImageUrl(settings?.profileImage ?? null);

  return (
    <div className="space-y-12">
      <header className="space-y-6">
        {profileImageUrl &&
        settings?.profileImage?.width &&
        settings.profileImage.height ? (
          <Image
            src={profileImageUrl}
            alt={settings.profileImage.description ?? ''}
            width={settings.profileImage.width}
            height={settings.profileImage.height}
            className="h-80 w-80 rounded-full object-cover object-[center_30%]"
            priority
          />
        ) : null}
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
            priority
          />
        ) : null}
      </header>
      <RichText document={page.body?.json} />
    </div>
  );
}
