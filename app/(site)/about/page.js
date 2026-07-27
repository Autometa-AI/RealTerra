import Link from 'next/link';
import Image from 'next/image';
import './about.css';
import { getContent } from '../../../lib/content';
import Lines from '../../../components/Lines';

export const metadata = {
  title: 'About',
};

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
          <Image src={c.hero.image} alt="Dubai skyline" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
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

        {/* GAURAV */}
        <div className="founder-full">
          <div className="founder-full-img reveal">
            <Image src={c.founders.gaurav.image} alt={c.founders.gaurav.name} fill sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
          <div className="founder-full-text reveal d1">
            <p className="founder-role-tag">{c.founders.gaurav.roleTag}</p>
            <h2 className="founder-full-name"><Lines text={c.founders.gaurav.name.replace(' ', '\n')} /></h2>
            <div className="founder-full-bio">
              {c.founders.gaurav.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="founder-capabilities">
              {c.founders.gaurav.capabilities.map((cap) => (
                <div className="cap-row" key={cap}><span className="cap-label">{cap}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* RUCHIKA */}
        <div className="founder-full">
          <div className="founder-full-text founder-full-text reversed reveal">
            <p className="founder-role-tag">{c.founders.ruchika.roleTag}</p>
            <h2 className="founder-full-name"><Lines text={c.founders.ruchika.name.replace(' ', '\n')} /></h2>
            <div className="founder-full-bio">
              {c.founders.ruchika.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="founder-capabilities">
              {c.founders.ruchika.capabilities.map((cap) => (
                <div className="cap-row" key={cap}><span className="cap-label">{cap}</span></div>
              ))}
            </div>
          </div>
          <div className="founder-full-img founder-full-img reversed reveal d1">
            <Image src={c.founders.ruchika.image} alt={c.founders.ruchika.name} fill sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
        </div>
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
