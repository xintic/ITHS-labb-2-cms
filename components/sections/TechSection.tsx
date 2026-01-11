import type { Section } from '@/lib/contentful/types';

type TechSectionProps = {
  section: Section;
};

export function TechSection({ section }: TechSectionProps) {
  const items = section.linkedProjects ? [section.linkedProjects] : [];

  return (
    <section className="space-y-6">
      {section.headline ? (
        <h2 className="text-2xl font-semibold tracking-tight">
          {section.headline}
        </h2>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.sys.id}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <p className="text-sm font-semibold text-foreground">
              {item.title}
            </p>
            {item.excerpt ? (
              <p className="text-xs text-muted-foreground">{item.excerpt}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
