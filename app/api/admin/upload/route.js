import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '../../../../lib/auth';
import { getSupabase, STORAGE_BUCKET } from '../../../../lib/supabase';

function extFromMime(type) {
  if (type === 'image/png') return 'png';
  if (type === 'image/webp') return 'webp';
  if (type === 'image/svg+xml') return 'svg';
  return 'jpg';
}

function slugify(str) {
  return (str || 'image').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40);
}

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

  const { dataUrl, label } = body || {};
  const match = /^data:(image\/[a-zA-Z+]+);base64,(.+)$/.exec(dataUrl || '');
  if (!match) {
    return NextResponse.json({ error: 'Invalid image data.' }, { status: 400 });
  }
  const [, mime, base64] = match;
  const bytes = Buffer.from(base64, 'base64');
  const key = `uploads/${slugify(label)}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${extFromMime(mime)}`;

  const supabase = getSupabase();
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(key, bytes, {
    contentType: mime,
    upsert: false,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(key);
  return NextResponse.json({ ok: true, url: data.publicUrl });
}
