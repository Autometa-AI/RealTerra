import { cache } from 'react';
import { getSupabase } from './supabase';

const PAGES = ['site', 'home', 'about', 'markets', 'projects', 'insights', 'contact'];

export const getContent = cache(async function getContent(page) {
  if (!PAGES.includes(page)) {
    throw new Error(`Unknown content page "${page}". Expected one of: ${PAGES.join(', ')}`);
  }
  const { data, error } = await getSupabase()
    .from('cms_content')
    .select('content')
    .eq('page', page)
    .single();

  if (error) throw new Error(`Failed to load "${page}" content: ${error.message}`);
  return data.content;
});

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

export { PAGES as CONTENT_PAGES };
