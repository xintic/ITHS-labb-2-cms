'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getContentfulImageUrl } from '@/lib/contentful/image';
import type { Project } from '@/lib/contentful/types';

type ProjectsFilterProps = {
  projects: Project[];
};

export function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [selectedTechs, setSelectedTechs] = React.useState<string[]>([]);

  const techs = React.useMemo(() => {
    const techMap = new Map<string, { id: string; name: string }>();
    projects.forEach((project) => {
      project.techCollection?.items?.forEach((tech) => {
        if (!techMap.has(tech.name)) {
          techMap.set(tech.name, { id: tech.sys.id, name: tech.name });
        }
      });
    });
    return Array.from(techMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    if (!selectedTechs.length) {
      return projects;
    }
    return projects.filter((project) => {
      const projectTechs = project.techCollection?.items ?? [];
      return projectTechs.some((tech) => selectedTechs.includes(tech.name));
    });
  }, [projects, selectedTechs]);

  const toggleTech = (name: string) => {
    setSelectedTechs((prev) =>
      prev.includes(name) ? prev.filter((tech) => tech !== name) : [...prev, name]
    );
  };

  const clearFilters = () => {
    setSelectedTechs([]);
  };

  return (
    <div className="space-y-8">
      {techs.length ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={clearFilters}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              selectedTechs.length
                ? 'border-border text-muted-foreground hover:bg-muted'
                : 'border-foreground bg-foreground text-background'
            }`}
          >
            All
          </button>
          {techs.map((tech) => {
            const isSelected = selectedTechs.includes(tech.name);
            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => toggleTech(tech.name)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  isSelected
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {tech.name}
              </button>
            );
          })}
        </div>
      ) : null}
      <div className="grid gap-6 sm:grid-cols-2">
        {filteredProjects.map((project) => {
          const imageUrl = getContentfulImageUrl(project.coverImage);
          return (
            <Link
              key={project.sys.id}
              href={`/projects/${project.slug}`}
              className="group rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1"
            >
              {imageUrl && project.coverImage?.width && project.coverImage?.height ? (
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
              <h2 className="text-lg font-semibold">{project.title}</h2>
              {project.excerpt ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.excerpt}
                </p>
              ) : null}
              {project.techCollection?.items?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techCollection.items.map((tech) => (
                    <span
                      key={tech.sys.id}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          );
        })}
      </div>
      {!filteredProjects.length ? (
        <p className="text-sm text-muted-foreground">
          No projects match the selected technologies.
        </p>
      ) : null}
    </div>
  );
}
