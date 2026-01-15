import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import { Button } from '@/components/ui/button';
import { FeaturedProjectsCarousel } from '@/components/FeaturedProjectsCarousel';
import {
  getPageBySlug,
  getProjectList,
  getSiteSettings
} from '@/lib/contentful/api';
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
  const [page, settings, projects] = await Promise.all([
    getPageBySlug('home'),
    getSiteSettings(),
    getProjectList()
  ]);

  if (!page) {
    notFound();
  }

  const profileImageUrl = getContentfulImageUrl(settings?.profileImage ?? null);
  const featuredProjects = projects.filter((project) => project.featured);

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
            className="h-48 w-48 flex-none rounded-full object-cover object-[center_5%] sm:h-64 sm:w-64 lg:h-80 lg:w-80"
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
              <Link href="/about-me">About Me</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </header>
      {featuredProjects.length ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Projects
            </h2>
            <Button variant="ghost" asChild>
              <Link href="/projects">View all</Link>
            </Button>
          </div>
          <FeaturedProjectsCarousel projects={featuredProjects} />
        </section>
      ) : null}
      <RichText document={page.body?.json} />
    </div>
  );
}
