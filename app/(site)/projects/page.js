import Link from 'next/link';
import './projects.css';
import Media from '../../../components/Media';
import Lines from '../../../components/Lines';
import ProjectSearch from '../../../components/ProjectSearch';
import { getContent } from '../../../lib/content';

export const metadata = {
  title: 'Projects',
};

export default async function Projects() {
  const c = await getContent('projects');

  return (
    <main className="page">
      {/* HERO */}
      <div className="projects-hero page-hero-split">
        <div className="page-hero-split-left light">
          <p className="eyebrow reveal">{c.hero.eyebrow}</p>
          <h1 className="reveal d1" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}><Lines text={c.hero.headline} /></h1>
          <p className="reveal d2" style={{ maxWidth: '360px', marginTop: '1rem' }}>{c.hero.subhead}</p>
          <div className="projects-hero-criteria reveal d3">
            {c.hero.criteriaTags.map((tag, i) => (
              <span className="projects-hero-tag" key={`${tag}-${i}`}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="page-hero-split-right">
          <Media src={c.hero.image} alt="" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>

      <div className="projects-main">
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

        {/* SEARCH + FILTERS + GRID */}
        <ProjectSearch projects={c.projects} filters={c.filters} search={c.search} />
      </div>

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
