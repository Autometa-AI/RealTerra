import Link from 'next/link';
import './about.css';
import Media from '../../../components/Media';
import { getContent } from '../../../lib/content';
import Lines from '../../../components/Lines';

export const metadata = {
  title: 'About',
};

// Same block, mirrored. `flip` only moves the photo to the other side —
// the column widths and portrait box stay identical for both founders.
const FOUNDERS = [
  { key: 'gaurav', flip: false },
  { key: 'ruchika', flip: true },
];

export default async function About() {
  const c = await getContent('about');

  return (
    <main className="page">
      <div className="about-hero">
        <div className="about-hero-left">
          <p className="eyebrow eyebrow-dark reveal">{c.hero.eyebrow}</p>
          <h1 className="reveal d1"><Lines text={c.hero.headline} /></h1>
          <p className="reveal d2">{c.hero.subhead}</p>
        </div>
        <div className="about-hero-right">
          <Media src={c.hero.image} alt="" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>

      {/* PHILOSOPHY */}
      <div className="philosophy-full">
        <div className="reveal"><p className="eyebrow">{c.methodology.eyebrow}</p><h2>{c.methodology.headline}</h2></div>
        <div className="philosophy-full-grid">
          <div className="reveal d1">
            {c.methodology.paragraphs.map((p, i) => (
              <p key={i} style={i ? { marginTop: '1.2rem' } : undefined}>{p}</p>
            ))}
          </div>
          <div className="reveal d2">
            {c.methodology.pillars.map((pillar, i) => (
              <div className="pillar-full" key={pillar.title}>
                <span className="pillar-full-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="pillar-full-title">{pillar.title}</div>
                  <p className="pillar-full-text">{pillar.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOUNDERS */}
      <div className="founders-section">
        <div className="reveal" style={{ marginBottom: '4rem' }}><p className="eyebrow">{c.founders.eyebrow}</p><h2>{c.founders.headline}</h2></div>

        {FOUNDERS.map(({ key, flip }) => {
          const f = c.founders[key];
          return (
            <div className={`founder-full${flip ? ' flip' : ''}`} key={key}>
              <div className="founder-full-img reveal">
                <Media src={f.image} alt={f.name} fill sizes="(max-width: 900px) 100vw, 34vw" />
              </div>
              <div className="founder-full-text reveal d1">
                <p className="founder-role-tag">{f.roleTag}</p>
                <h2 className="founder-full-name"><Lines text={f.name.replace(' ', '\n')} /></h2>
                <div className="founder-full-bio">
                  {f.bio.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className="founder-capabilities">
                  {f.capabilities.map((cap) => (
                    <div className="cap-row" key={cap}><span className="cap-label">{cap}</span></div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SERVICES */}
      <div className="section">
        <div className="reveal" style={{ marginBottom: '3rem' }}><p className="eyebrow">{c.services.eyebrow}</p><h2>{c.services.headline}</h2></div>
        <div className="services-grid-about reveal d1">
          {c.services.items.map((item, i) => (
            <div className="service-item" key={item.title}>
              <div className="service-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="service-title-about">{item.title}</div>
              <p className="service-desc-about">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-band">
        <div className="reveal"><p className="eyebrow eyebrow-dark">{c.closingCta.eyebrow}</p><h2 style={{ color: 'var(--white)' }}><Lines text={c.closingCta.headline} /></h2></div>
        <Link href="/contact" className="btn btn-outline-light reveal d1">{c.closingCta.buttonLabel}</Link>
      </div>
    </main>
  );
}
