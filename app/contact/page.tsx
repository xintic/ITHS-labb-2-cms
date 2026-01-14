import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { RichText } from '@/components/RichText';
import { ContactForm } from '@/components/ContactForm';
import { getPageBySlug, getSiteSettings } from '@/lib/contentful/api';
import { getContentfulImageUrl } from '@/lib/contentful/image';
import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu';

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
      <header className="space-y-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          {page.heroTitle ?? page.title}
        </h1>
        {page?.heroText ? (
          <p className="text-lg text-muted-foreground">{page.heroText}</p>
        ) : null}
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
      <ContactForm email={settings?.email ?? null} />
      <section className="rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold text-center">Contact details</h2>
        <div className="mt-4 flex flex-row justify-evenly gap-2 text-sm text-muted-foreground">
          {settings?.email ? (
            <a
              href={`mailto:${settings.email}`}
              className="hover:text-foreground text-base flex items-center"
            >
              <LuMail className="mr-1" size={18} />
              E-mail
            </a>
          ) : null}
          {settings?.githubUrl ? (
            <Link
              href={settings.githubUrl}
              className="hover:text-foreground text-base flex items-center"
            >
              <LuGithub className="mr-1" size={18} />
              GitHub
            </Link>
          ) : null}
          {settings?.linkedinUrl ? (
            <Link
              href={settings.linkedinUrl}
              className="hover:text-foreground text-base flex items-center"
            >
              <LuLinkedin className="mr-1" size={18} />
              LinkedIn
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
