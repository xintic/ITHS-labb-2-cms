import Link from 'next/link';
import { FaTerminal } from 'react-icons/fa';
import { getNavigationItems } from '@/lib/contentful/api';
import { NavMenu } from '@/components/NavMenu';

export async function Header() {
  const items = await getNavigationItems();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <div>
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight flex items-center"
          >
            <FaTerminal size={20} className="mr-1" />
            Oskar Sjöbeck Berglund
          </Link>
        </div>
        <NavMenu items={items} />
      </div>
    </header>
  );
}
