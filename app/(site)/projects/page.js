import Link from 'next/link';
import { Suspense } from 'react';
import './projects.css';
import Media from '../../../components/Media';
import Lines from '../../../components/Lines';
import PageHero from '../../../components/PageHero';
import ProjectSearch from '../../../components/ProjectSearch';
import SharedSections from '../../../components/SharedSections';
import { getContent } from '../../../lib/content';

export const metadata = {
  title: 'Projects',
};

export default async function Projects() {
  const c = await getContent('projects');

  return (
    <main className="page">
      {/* HERO */}
      <PageHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        subhead={c.hero.subhead}
        image={c.hero.image}
        poster={c.hero.poster}
      >
        <div className="projects-hero-criteria reveal d3">
          {c.hero.criteriaTags.map((tag, i) => (
            <span className="projects-hero-tag" key={`${tag}-${i}`}>{tag}</span>
          ))}
        </div>
      </PageHero>

      <div className="projects-main" id="project-search">
        {/* FEATURED */}
        <div className="featured-project reveal">
          <div className="fp-img">
            <Media src={c.featured.image} alt={c.featured.name} fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="fp-body">
            <p className="fp-tag">{c.featured.tag}</p>
            <h2 className="fp-name">{c.featured.name}</h2>
            <p className="fp-desc">{c.featured.description}</p>
            <div className="fp-stats">
              {c.featured.stats.map((s, i) => (
                <div key={`${s.label}-${i}`}><div className="fp-stat-val">{s.value}</div><div className="fp-stat-lbl">{s.label}</div></div>
              ))}
            </div>
            <Link href="/contact" className="arrow-link">{c.featured.linkLabel}</Link>
          </div>
        </div>

        {/* SEARCH + FILTERS + GRID
            Suspended because it reads ?q= from the URL: without a boundary
            that read would opt the whole page out of static rendering. */}
        <Suspense fallback={null}>
          <ProjectSearch projects={c.projects} filters={c.filters} search={c.search} />
        </Suspense>
      </div>

      <SharedSections />

      {/* CTA */}
      <div className="cta-band">
        <div className="reveal">
          <p className="eyebrow">{c.closingCta.eyebrow}</p>
          <h2 style={{ color: 'var(--white)' }}><Lines text={c.closingCta.headline} /></h2>
        </div>
        <Link href="/contact" className="btn btn-outline-light reveal d1">{c.closingCta.buttonLabel}</Link>
      </div>
    </main>
  );
}
