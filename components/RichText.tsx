import type { ReactNode } from 'react';
import type { Document } from '@contentful/rich-text-types';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_2]: (_: unknown, children: ReactNode) => (
      <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_: unknown, children: ReactNode) => (
      <h3 className="text-xl font-semibold tracking-tight">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (_: unknown, children: ReactNode) => (
      <p className="text-base leading-7 text-muted-foreground">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_: unknown, children: ReactNode) => (
      <ul className="list-disc space-y-2 pl-5 text-muted-foreground">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_: unknown, children: ReactNode) => (
      <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">{children}</ol>
    ),
    [BLOCKS.QUOTE]: (_: unknown, children: ReactNode) => (
      <blockquote className="border-l-2 border-foreground/20 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node: { data: { uri?: string } }, children: ReactNode) => (
      <a
        href={node.data.uri}
        className="text-foreground underline decoration-foreground/30 underline-offset-4"
      >
        {children}
      </a>
    )
  }
};

type RichTextProps = {
  document?: Document | null;
  className?: string;
};

export function RichText({ document, className }: RichTextProps) {
  if (!document) {
    return null;
  }

  return (
    <div className={['space-y-4', className].filter(Boolean).join(' ')}>
      {documentToReactComponents(document, richTextOptions)}
    </div>
  );
}
