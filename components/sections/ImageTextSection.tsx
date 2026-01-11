import Image from 'next/image';
import type { Section as SectionType } from '@/lib/contentful/types';
import { getContentfulImageUrl } from '@/lib/contentful/image';
import { RichText } from '@/components/RichText';

type ImageTextSectionProps = {
  section: SectionType;
};

export function ImageTextSection({ section }: ImageTextSectionProps) {
  const imageUrl = getContentfulImageUrl(section.image);
  return (
    <section className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        {section.headline ? (
          <h2 className="text-2xl font-semibold tracking-tight">
            {section.headline}
          </h2>
        ) : null}
        <RichText document={section.body?.json} />
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
