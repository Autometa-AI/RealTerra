import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '../../../../lib/auth';
import { CMS_PAGES } from '../../../../lib/cms-schema';
import { saveContent } from '../../../../lib/content';

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

  const { page, content } = body || {};
  if (!CMS_PAGES.some((p) => p.key === page) || typeof content !== 'object') {
    return NextResponse.json({ error: 'Invalid page or content.' }, { status: 400 });
  }

  try {
    await saveContent(page, content, session.name);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
}
