import fs from 'node:fs/promises';
import path from 'node:path';
import { unstable_cache } from 'next/cache';
import { getSupabase } from './supabase';

const PAGES = ['site', 'home', 'about', 'markets', 'projects', 'blogs', 'contact'];
const CACHE_TAG = 'cms-content';

// Local development without database credentials falls back to the
// content/*.json snapshot in the repo (kept current by scripts/pull-content.js),
// so `npm run dev` works on a fresh clone. Never allowed in production: there a
// missing credential is a misconfiguration, not something to paper over.
const USE_LOCAL_CONTENT =
  process.env.NODE_ENV !== 'production' && !process.env.SUPABASE_URL;

async function readLocal(page) {
  const file = path.join(process.cwd(), 'content', `${page}.json`);
  return JSON.parse(await fs.readFile(file, 'utf-8'));
}

// Pages render statically and are served from cache (fast TTFB, good for
// SEO) until a CMS save calls revalidateTag/revalidatePath — see
// /api/admin/save — at which point the next visit re-fetches and re-caches.
const fetchContent = unstable_cache(
  async (page) => {
    const { data, error } = await getSupabase()
      .from('cms_content')
      .select('content')
      .eq('page', page)
      .single();

    if (error) throw new Error(`Failed to load "${page}" content: ${error.message}`);
    return data.content;
  },
  ['cms-content-by-page'],
  { tags: [CACHE_TAG] }
);

export async function getContent(page) {
  if (!PAGES.includes(page)) {
    throw new Error(`Unknown content page "${page}". Expected one of: ${PAGES.join(', ')}`);
  }
  // Uncached in local mode: the JSON on disk is the thing being edited, and a
  // cached copy would survive every save until the dev server restarts.
  if (USE_LOCAL_CONTENT) return readLocal(page);
  return fetchContent(page);
}

/**
 * Uncached read, for the admin editor only.
 *
 * The editor loads a copy, the user edits it, and the whole object is
 * written back on save. If it ever loaded a stale copy it would quietly
 * overwrite whatever changed in the meantime, so the authoring surface
 * always reads straight from the database.
 */
export async function getContentFresh(page) {
  if (!PAGES.includes(page)) {
    throw new Error(`Unknown content page "${page}".`);
  }
  if (USE_LOCAL_CONTENT) return readLocal(page);

  const { data, error } = await getSupabase()
    .from('cms_content')
    .select('content')
    .eq('page', page)
    .single();

  if (error) throw new Error(`Failed to load "${page}" content: ${error.message}`);
  return data.content;
}

export async function saveContent(page, content, updatedBy) {
  if (!PAGES.includes(page)) {
    throw new Error(`Unknown content page "${page}".`);
  }
  const { error } = await getSupabase()
    .from('cms_content')
    .upsert({ page, content, updated_by: updatedBy, updated_at: new Date().toISOString() });

  if (error) throw new Error(`Failed to save "${page}" content: ${error.message}`);
}

export async function getAllContent() {
  const entries = await Promise.all(PAGES.map(async (page) => [page, await getContent(page)]));
  return Object.fromEntries(entries);
}

export { PAGES as CONTENT_PAGES, CACHE_TAG };
