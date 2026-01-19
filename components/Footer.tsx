import Link from 'next/link';
import { getSiteSettings } from '@/lib/contentful/api';
import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu';

export async function Footer() {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName ?? 'Portfolio';
  const footerText = `© ${new Date().getFullYear()} ${siteName}`;

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-row gap-4 px-6 py-8 text-sm text-muted-foreground sm:items-center justify-between">
        <p>{footerText}</p>
        <div className="flex flex-wrap items-center gap-4">
          {settings?.email ? (
            <a
              href={`mailto:${settings.email}`}
              className="hover:text-foreground flex items-center"
              aria-label="E-Mail"
            >
              <LuMail size={20} />
            </a>
          ) : null}
          {settings?.githubUrl ? (
            <Link
              href={settings.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground flex items-center"
              aria-label="GitHub"
            >
              <LuGithub size={20} />
            </Link>
          ) : null}
          {settings?.linkedinUrl ? (
            <Link
              href={settings.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground flex items-center"
              aria-label="LinkedIn"
            >
              <LuLinkedin size={20} />
            </Link>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
