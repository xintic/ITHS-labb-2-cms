import type { PageSection } from '@/lib/contentful/types';
import { HeroSection } from './HeroSection';
import { ImageTextSection } from './ImageTextSection';
import { ProjectGridSection } from './ProjectGridSection';
import { TextSection } from './TextSection';

type SectionRendererProps = {
  sections: PageSection[];
};

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <div className="space-y-12">
      {sections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <HeroSection key={section.sys.id} section={section} />;
          case 'text':
            return <TextSection key={section.sys.id} section={section} />;
          case 'image':
            return <ImageTextSection key={section.sys.id} section={section} />;
          case 'projects':
            return <ProjectGridSection key={section.sys.id} section={section} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
