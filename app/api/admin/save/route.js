import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidateTag, revalidatePath } from 'next/cache';
import { SESSION_COOKIE, verifySessionToken } from '../../../../lib/auth';
import { CMS_PAGES } from '../../../../lib/cms-schema';
import { saveContent, CACHE_TAG } from '../../../../lib/content';

export async function POST(request) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // One press of "Save changes" publishes every page the editor has touched,
  // not just the one on screen — `updates` is the batch. The single-page
  // shape is still accepted so an older tab left open keeps working.
  const updates = Array.isArray(body?.updates)
    ? body.updates
    : body?.page
      ? [{ page: body.page, content: body.content }]
      : null;

  if (!updates?.length) {
    return NextResponse.json({ error: 'Nothing to save.' }, { status: 400 });
  }

  const invalid = updates.find(
    (u) => !CMS_PAGES.some((p) => p.key === u?.page) || !u?.content || typeof u.content !== 'object'
  );
  if (invalid) {
    return NextResponse.json({ error: 'Invalid page or content.' }, { status: 400 });
  }

  // Written one at a time and tracked, so a failure part-way through still
  // tells the editor exactly which pages made it — the ones that did not are
  // kept as drafts in the browser rather than being quietly dropped.
  const saved = [];
  try {
    for (const { page, content } of updates) {
      await saveContent(page, content, session.name);
      saved.push(page);
    }
  } catch (err) {
    if (saved.length) {
      revalidateTag(CACHE_TAG);
      revalidatePath('/', 'layout');
    }
    return NextResponse.json({ error: err.message, saved }, { status: 502 });
  }

  // Clear the cached data and the pre-rendered pages so the next visit
  // gets the new content, then re-caches — every page shares nav/footer
  // content, so revalidate the whole site rather than trying to work out
  // which single route was affected.
  revalidateTag(CACHE_TAG);
  revalidatePath('/', 'layout');

  return NextResponse.json({ ok: true, saved });
}
