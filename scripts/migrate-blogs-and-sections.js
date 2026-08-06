// One-off migration. Usage:
//   node --env-file=.env.local scripts/migrate-blogs-and-sections.js
//
// The live copy in Supabase is the source of truth (the client has been
// editing it, and uploaded their own images), so this reshapes the rows in
// place rather than overwriting them from content/*.json. Defaults for the
// brand-new sections are read from the repo files.
//
// Idempotent: re-running detects already-migrated rows and leaves them be.
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const contentDir = path.join(__dirname, '..', 'content');
const defaults = (name) => JSON.parse(fs.readFileSync(path.join(contentDir, `${name}.json`), 'utf-8'));

/**
 * Copy any top-level section the live row is missing out of the repo
 * defaults.
 *
 * A section added to the code and to content/*.json but never to the database
 * row renders as nothing at all in production — the partner logo band went
 * out that way — and the failure is silent, because a component handed
 * `undefined` just returns null. Backfilling every absent key means a new
 * section only has to be listed in the repo copy once.
 */
function fillMissingSections(live, repoDefaults) {
  const next = { ...live };
  for (const [key, value] of Object.entries(repoDefaults)) {
    if (next[key] === undefined) next[key] = value;
  }
  return next;
}

function migrateSite(site, siteDefaults) {
  const next = fillMissingSections(site, siteDefaults);

  next.nav = { ...site.nav };
  next.nav.links = (site.nav.links || []).map((l) =>
    l.href === '/insights' ? { href: '/blogs', label: 'Blogs' } : l
  );
  // The nav CTA is now the Ask Us Question button, configured separately.
  delete next.nav.ctaLabel;

  next.askUs = site.askUs || siteDefaults.askUs;
  next.ebook = site.ebook || siteDefaults.ebook;
  next.social = site.social || siteDefaults.social;

  // The WhatsApp link is derived from askUs.phone now, so the duplicated
  // copies in dock/contactInfo would only drift out of sync.
  next.dock = { ...site.dock };
  delete next.dock.ctaLabel;
  delete next.dock.whatsappUrl;

  next.contactInfo = { ...site.contactInfo };
  delete next.contactInfo.whatsappUrl;
  next.contactInfo.phoneDisplay = '+971 55 508 4911';

  return next;
}

function migrateHome(home, homeDefaults) {
  const next = fillMissingSections(home, homeDefaults);
  const h = home.hero || {};

  // Old hero was a two-part headline plus a split eyebrow and mini stats.
  // The full-bleed hero has one headline, one eyebrow, and no stats.
  if (h.labelLine1 !== undefined || h.headlineEm !== undefined) {
    next.hero = {
      eyebrow: [h.labelLine1, h.labelLine2].filter(Boolean).join(' · '),
      headline: [h.headline, h.headlineEm].filter(Boolean).join('\n'),
      subhead: h.subhead || '',
      ctaPrimary: h.ctaPrimary || '',
      ctaSecondary: h.ctaSecondary || '',
      image: h.image || '',
    };
  }

  delete next.statRow;

  if (home.insightsPreview && !home.blogsPreview) {
    next.blogsPreview = home.insightsPreview;
    delete next.insightsPreview;
  }

  next.reviews = home.reviews || homeDefaults.reviews;
  next.faq = home.faq || homeDefaults.faq;

  return next;
}

function migrateBlogs(insights) {
  const next = { ...insights };
  if (insights.reports && !insights.posts) {
    next.posts = insights.reports;
    delete next.reports;
  }
  return next;
}

function migrateProjects(projects, projectDefaults) {
  return { ...projects, search: projects.search || projectDefaults.search };
}

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.');
    process.exit(1);
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const { data: rows, error } = await supabase.from('cms_content').select('page, content');
  if (error) throw new Error(error.message);
  const byPage = Object.fromEntries(rows.map((r) => [r.page, r.content]));

  const writes = [];

  if (byPage.site) writes.push(['site', migrateSite(byPage.site, defaults('site'))]);
  if (byPage.home) writes.push(['home', migrateHome(byPage.home, defaults('home'))]);
  if (byPage.projects) writes.push(['projects', migrateProjects(byPage.projects, defaults('projects'))]);

  // insights becomes blogs. Prefer the live insights row; fall back to an
  // already-migrated blogs row so a re-run is harmless.
  const blogsSource = byPage.insights || byPage.blogs;
  if (blogsSource) writes.push(['blogs', migrateBlogs(blogsSource)]);

  for (const [page, content] of writes) {
    const { error: upsertError } = await supabase
      .from('cms_content')
      .upsert({ page, content, updated_by: 'migration', updated_at: new Date().toISOString() });
    if (upsertError) throw new Error(`${page}: ${upsertError.message}`);
    console.log(`Migrated "${page}"`);
  }

  if (byPage.insights) {
    const { error: deleteError } = await supabase.from('cms_content').delete().eq('page', 'insights');
    if (deleteError) throw new Error(`delete insights: ${deleteError.message}`);
    console.log('Removed the old "insights" row');
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
