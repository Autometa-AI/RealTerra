import Link from 'next/link';
import Image from 'next/image';
import './projects.css';
import { getContent } from '../../../lib/content';
import Lines from '../../../components/Lines';

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
            {c.hero.criteriaTags.map((tag) => (
              <span className="projects-hero-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="page-hero-split-right">
          <Image src={c.hero.image} alt="Dubai luxury development" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>

      {/* FILTER */}
      <div className="filter-bar">
        {c.filters.map((f, i) => (
          <button className={`filter-btn${i === 0 ? ' active' : ''}`} key={f}>{f}</button>
        ))}
      </div>

      <div className="projects-main">
        {/* FEATURED */}
        <div className="featured-project reveal">
          <div className="fp-img">
            <Image src={c.featured.image} alt={c.featured.name} fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="fp-body">
            <p className="fp-tag">{c.featured.tag}</p>
            <h2 className="fp-name">{c.featured.name}</h2>
            <p className="fp-desc">{c.featured.description}</p>
            <div className="fp-stats">
              {c.featured.stats.map((s) => (
                <div key={s.label}><div className="fp-stat-val">{s.value}</div><div className="fp-stat-lbl">{s.label}</div></div>
              ))}
            </div>
            <Link href="/contact" className="arrow-link">{c.featured.linkLabel}</Link>
          </div>
        </div>

        {/* GRID */}
        <div className="projects-grid">
          {c.projects.map((p, i) => (
            <div className={`project-card-full reveal${i % 3 ? ` d${i % 3}` : ''}`} key={p.name}>
              <div className="project-img img-zoom">
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
                <span className="project-badge">{p.badge}</span>
              </div>
              <div className="project-body-full">
                <p className="project-developer">{p.developer}</p>
                <h3 className="project-name-full">{p.name}</h3>
                <p className="project-location-text">{p.location}</p>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '0.5rem' }}>{p.description}</p>
                <div className="project-stats-row">
                  <div className="p-stat"><div className="p-stat-val">{p.from}</div><div className="p-stat-label">From</div></div>
                  <div className="p-stat"><div className="p-stat-val">{p.yield}</div><div className="p-stat-label">Yield</div></div>
                  <div className="p-stat"><div className="p-stat-val">{p.handover}</div><div className="p-stat-label">Handover</div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
