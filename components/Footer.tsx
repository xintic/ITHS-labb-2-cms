import Link from 'next/link';
import { getSiteSettings } from '@/lib/contentful/api';

export async function Footer() {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName ?? 'Portfolio';
  const footerText =
    settings?.footerText ?? `© ${new Date().getFullYear()} ${siteName}`;

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>{footerText}</p>
        <div className="flex flex-wrap items-center gap-4">
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
      </div>
    </footer>
  );
}
