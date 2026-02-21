'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { getContentfulImageUrl } from '@/lib/contentful/image';
import type { Project } from '@/lib/contentful/types';

type FeaturedProjectsCarouselProps = {
  projects: Project[];
};

export function FeaturedProjectsCarousel({
  projects
}: FeaturedProjectsCarouselProps) {
  const autoplay = React.useMemo(
    () =>
      Autoplay({
        delay: 6000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      }),
    []
  );

  return (
    <Carousel
      opts={{ align: 'start', loop: true }}
      plugins={[autoplay]}
      className="w-full"
      aria-label="Featured projects"
    >
      <CarouselContent className="ml-0 pt-1 pb-2">
        {projects.map((project) => {
          const imageUrl = getContentfulImageUrl(project.coverImage);
          return (
            <CarouselItem key={project.sys.id} className="basis-full px-4">
              <Link
                href={`/projects/${project.slug}`}
                className="group block h-full rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:shadow-sm"
              >
                {imageUrl &&
                project.coverImage?.width &&
                project.coverImage?.height ? (
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <Image
                      src={imageUrl}
                      alt={project.coverImage.description ?? ''}
                      width={project.coverImage.width}
                      height={project.coverImage.height}
                      className="h-48 w-full object-cover transition group-hover:scale-[1.02]"
                    />
                  </div>
                ) : null}
                <h3 className="text-xl font-semibold">{project.title}</h3>
                {project.techCollection?.items?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.techCollection.items.map((tech) => (
                      <span
                        key={tech.sys.id}
                        className="rounded-full border border-border px-2 py-0.5 text-sm text-muted-foreground"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                ) : null}
                {project.excerpt ? (
                  <p className="mt-2 text-sm">{project.excerpt}</p>
                ) : null}
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
