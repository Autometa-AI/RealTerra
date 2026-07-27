import { unstable_cache } from 'next/cache';
import { getSupabase } from './supabase';

const PAGES = ['site', 'home', 'about', 'markets', 'projects', 'insights', 'contact'];
const CACHE_TAG = 'cms-content';

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
  return fetchContent(page);
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
