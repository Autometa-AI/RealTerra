// Detail pages are addressed by slug. The CMS has an optional slug field,
// but content the client already wrote has none, so we derive one from the
// title as a fallback. Same function on both sides, so the link a card
// renders always matches the route that gets generated.

export function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

/** Slug for one item, preferring an explicit CMS value. */
export function itemSlug(item, titleKey = 'title') {
  return slugify(item?.slug || item?.[titleKey]);
}

/**
 * Slugs for a whole list, de-duplicated. Two posts titled the same would
 * otherwise both resolve to one URL and the second would be unreachable.
 */
export function uniqueSlugs(items, titleKey = 'title') {
  const seen = new Map();
  return (items || []).map((item) => {
    const base = itemSlug(item, titleKey) || 'item';
    const n = seen.get(base) || 0;
    seen.set(base, n + 1);
    return n === 0 ? base : `${base}-${n + 1}`;
  });
}

/** Finds an item by slug, matching the same de-duplication rule. */
export function findBySlug(items, slug, titleKey = 'title') {
  const slugs = uniqueSlugs(items, titleKey);
  const i = slugs.indexOf(slug);
  return i === -1 ? null : { item: items[i], index: i };
}
