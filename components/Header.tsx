import Link from 'next/link';
import { LuTerminal } from 'react-icons/lu';
import { getNavigationItems, getSiteSettings } from '@/lib/contentful/api';
import { NavMenu } from '@/components/NavMenu';
import { ModeToggle } from './ThemeToggle';

export async function Header() {
  const [items, settings] = await Promise.all([
    getNavigationItems(),
    getSiteSettings()
  ]);
  const siteName = settings?.siteName ?? 'Portfolio';

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <div>
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight flex items-center"
          >
            <LuTerminal size={24} className="mr-1" />
            {siteName}
          </Link>
        </div>
        <div className="flex gap-1">
          <NavMenu items={items} />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
