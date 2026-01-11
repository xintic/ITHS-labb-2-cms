import Link from 'next/link';
import { getNavigationItems } from '@/lib/contentful/api';

function resolveSlug(slug: string) {
  return slug === 'home' ? '/' : `/${slug}`;
}

export async function Header() {
  const items = await getNavigationItems();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Oskar
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {items.map((item) => {
            const slug = item.page?.slug ?? '';
            const href = slug ? resolveSlug(slug) : '/';
            return (
              <Link key={item.sys.id} href={href}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
