import type { Section as SectionType } from '@/lib/contentful/types';
import { RichText } from '@/components/RichText';

type TextSectionProps = {
  section: SectionType;
};

export function TextSection({ section }: TextSectionProps) {
  return (
    <section className="space-y-4">
      {section.headline ? (
        <h2 className="text-2xl font-semibold tracking-tight">
          {section.headline}
        </h2>
      ) : null}
      <RichText document={section.body?.json} />
    </section>
  );
}
