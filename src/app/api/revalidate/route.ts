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
  revalidateTag('site-settings');
  revalidateTag('projects');
  revalidateTag('tech');
  revalidateTag('experience');

  const slug =
    body?.fields?.slug?.['en-US'] ?? body?.fields?.slug?.['sv-SE'] ?? null;
  const contentType = body?.sys?.contentType?.sys?.id ?? null;

  if (typeof slug === 'string' && slug.length > 0) {
    if (contentType === 'project') {
      revalidateTag(`project:${slug}`);
      revalidatePath(`/projects/${slug}`);
    }

    if (contentType === 'page') {
      revalidateTag(`page:${slug}`);
      if (slug === 'home') {
        revalidatePath('/');
      } else {
        revalidatePath(`/${slug}`);
      }
    }
  }

  return NextResponse.json({
    revalidated: true,
    topic,
    slug,
    timestamp: new Date().toISOString()
  });
}
