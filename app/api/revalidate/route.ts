import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (!secret || secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const topic = req.headers.get('x-contentful-topic') ?? 'unknown';

  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/about-me');
  revalidatePath('/contact');

  revalidateTag('navigation');
  revalidateTag('siteSettings');
  revalidateTag('projects');
  revalidateTag('pages');

  const slug =
    body?.fields?.slug?.['en-US'] ?? body?.fields?.slug?.['sv-SE'] ?? null;

  if (typeof slug === 'string' && slug.length > 0) {
    revalidatePath(`/projects/${slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    topic,
    slug,
    timestamp: new Date().toISOString()
  });
}
