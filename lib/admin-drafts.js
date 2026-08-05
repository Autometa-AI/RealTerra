'use client';

/**
 * Draft store for the CMS editor.
 *
 * The editor used to hold edits in React state only, so moving from Home to
 * About to Markets and then pressing "Save changes" published Markets and
 * silently threw away the other two — the images uploaded on the way had
 * already been written to storage, but nothing pointed at them any more.
 *
 * Edits are now written here on every keystroke, keyed by page, and survive
 * navigation and reloads. "Save changes" publishes every page holding a
 * draft, not just the one on screen, which is what a Publish button means
 * everywhere else.
 *
 * Only text and media URLs are stored — uploads go straight to Supabase
 * Storage and come back as a URL — so a full set of drafts is a few KB.
 */

const KEY = 'realterra-cms-drafts-v1';

/** Fired on the window whenever the draft set changes, so the sidebar and
 *  the save bar can both react without threading state through the tree. */
export const DRAFTS_EVENT = 'realterra:drafts';

function readAll() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    // Corrupt or unavailable storage is not worth failing the editor over.
    return {};
  }
}

function writeAll(map) {
  if (typeof window === 'undefined') return true;
  let ok = true;
  try {
    if (Object.keys(map).length === 0) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    ok = false;
  }
  window.dispatchEvent(new Event(DRAFTS_EVENT));
  return ok;
}

/** Every page holding unsaved edits, with the time they were last touched. */
export function listDrafts() {
  const all = readAll();
  return Object.keys(all)
    .filter((page) => all[page] && typeof all[page].content === 'object')
    .map((page) => ({ page, content: all[page].content, updatedAt: all[page].updatedAt }));
}

export function getDraft(page) {
  const entry = readAll()[page];
  return entry && typeof entry.content === 'object' ? entry.content : null;
}

export function putDraft(page, content) {
  const all = readAll();
  all[page] = { content, updatedAt: new Date().toISOString() };
  return writeAll(all);
}

export function dropDraft(page) {
  const all = readAll();
  if (!(page in all)) return true;
  delete all[page];
  return writeAll(all);
}

export function dropDrafts(pages) {
  const all = readAll();
  pages.forEach((page) => delete all[page]);
  return writeAll(all);
}
