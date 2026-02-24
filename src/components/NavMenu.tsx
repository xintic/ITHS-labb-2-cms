'use client';

import Link from 'next/link';
import { MenuIcon } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/src/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/src/components/ui/sheet';
import { cn } from '@/src/lib/utils';
import type { NavigationItem } from '@/src/lib/contentful/types';
import { useIsMobile } from '@/src/hooks/use-mobile';

function resolveSlug(slug: string) {
  return slug === 'home' ? '/' : `/${slug}`;
}

type NavMenuProps = {
  items: NavigationItem[];
};

export function NavMenu({ items }: NavMenuProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <nav aria-label="Primary">
        <Sheet>
          <SheetTrigger
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-[3px]"
            aria-label="Open menu"
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-6">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2">
              {items.map((item) => {
                const slug = item.page?.slug ?? '';
                const href = slug ? resolveSlug(slug) : '/';
                return (
                  <SheetClose key={item.sys.id} asChild>
                    <Link
                      href={href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'h-10 w-full justify-start px-3'
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    );
  }

  return (
    <nav aria-label="Primary">
      <NavigationMenu viewport className="w-full justify-end max-w-max">
        <NavigationMenuList className="text-sm font-medium items-center">
          {items.map((item) => {
            const slug = item.page?.slug ?? '';
            const href = slug ? resolveSlug(slug) : '/';
            return (
              <NavigationMenuItem key={item.sys.id}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
        <NavigationMenuIndicator />
      </NavigationMenu>
    </nav>
  );
}
