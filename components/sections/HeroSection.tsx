import Image from 'next/image';
import type { Section as SectionType } from '@/lib/contentful/types';
import { getContentfulImageUrl } from '@/lib/contentful/image';
import { RichText } from '@/components/RichText';

type HeroSectionProps = {
  section: SectionType;
};

export function HeroSection({ section }: HeroSectionProps) {
  const imageUrl = getContentfulImageUrl(section.image);

  return (
    <section className="grid gap-8 rounded-3xl bg-muted/40 px-8 py-12 md:grid-cols-[1.2fr_1fr]">
      <div className="space-y-4">
        {section.headline ? (
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {section.headline}
          </h1>
        ) : null}
        {section.body?.json ? <RichText document={section.body.json} /> : null}
      </div>
      {imageUrl && section.image?.width && section.image?.height ? (
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={section.image.description ?? ''}
            width={section.image.width}
            height={section.image.height}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
    </section>
  );
}
