import { slugify } from './slug';

/**
 * The subheadings inside a CMS `body` array, with the ids <ArticleBody />
 * stamps on them.
 *
 * Derived in one place because two things have to agree on them: the markup
 * that renders the headings and the contents rail that scrolls to them. A
 * second implementation of "how is this heading turned into an anchor" is a
 * broken link waiting to happen.
 */
export function articleHeadings(body) {
  const seen = new Map();
  return (body || [])
    .map((block) => String(block || '').trim())
    .filter((text) => text.startsWith('## '))
    .map((text) => {
      const label = text.slice(3).trim();
      const base = slugify(label) || 'section';
      const n = seen.get(base) || 0;
      seen.set(base, n + 1);
      return { id: n === 0 ? base : `${base}-${n + 1}`, label };
    });
}
