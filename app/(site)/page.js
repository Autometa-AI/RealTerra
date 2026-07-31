import Link from 'next/link';
import './home.css';
import Media from '../../components/Media';
import Reviews from '../../components/Reviews';
import Faq from '../../components/Faq';
import Lines from '../../components/Lines';
import { getContent } from '../../lib/content';

export default async function Home() {
  const c = await getContent('home');

  return (
    <main className="page">
      {/* HERO — full-bleed background with the copy overlaid, so a wide
          landscape image is never squeezed into a half-width column. */}
      <div className="hero">
        <div className="hero-media">
          <Media src={c.hero.image} alt="" fill priority sizes="100vw" />
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-label reveal">
              <span className="hero-label-line"></span>
              <span>{c.hero.eyebrow}</span>
            </div>
            <h1 className="reveal d1"><Lines text={c.hero.headline} /></h1>
            <p className="hero-sub reveal d2">{c.hero.subhead}</p>
            <div className="hero-actions reveal d3">
              <Link href="/markets" className="btn btn-light">{c.hero.ctaPrimary}</Link>
              <Link href="/blogs" className="arrow-link arrow-link-light">{c.hero.ctaSecondary}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[...c.marquee, ...c.marquee].map((item, i) => (
            <span className="marquee-cell" key={i}>
              <span className={`marquee-item${i % c.marquee.length < 3 ? ' accent' : ''}`}>{item}</span>
              <span className="marquee-item" aria-hidden="true">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* INTRO */}
      <div className="intro-strip">
        <div className="reveal">
          <p className="eyebrow">{c.philosophyIntro.eyebrow}</p>
          <h2><Lines text={c.philosophyIntro.headline} /></h2>
        </div>
        <div className="reveal d1">
          <p className="large">{c.philosophyIntro.body}</p>
          <div style={{ marginTop: '2rem' }}><Link href="/about" className="arrow-link">{c.philosophyIntro.linkLabel}</Link></div>
        </div>
      </div>

      {/* PHILOSOPHY DARK */}
      <div className="philosophy-preview">
        <div className="philosophy-left reveal">
          <div>
            <p className="eyebrow eyebrow-dark">{c.philosophyPanel.eyebrow}</p>
            <h2 style={{ color: 'var(--white)' }}>{c.philosophyPanel.headline}</h2>
            <p className="philosophy-sub">{c.philosophyPanel.subtext}</p>
          </div>
          <div className="pillars-mini">
            {c.philosophyPanel.pillars.map((label, i) => (
              <div className="pillar-mini" key={`${label}-${i}`}>
                <span className="pillar-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pillar-label">{label}</span>
              </div>
            ))}
          </div>
          <Link href="/about" className="arrow-link arrow-link-light" style={{ marginTop: '2.5rem' }}>{c.philosophyPanel.linkLabel}</Link>
        </div>
        <div className="philosophy-right">
          <Media src={c.philosophyPanel.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>

      {/* AREAS */}
      <div className="areas-preview">
        <div className="areas-preview-header reveal">
          <div><p className="eyebrow">{c.focusMarkets.eyebrow}</p><h2>{c.focusMarkets.headline}</h2></div>
          <Link href="/markets" className="arrow-link">{c.focusMarkets.linkLabel}</Link>
        </div>
        <div className="areas-grid-home">
          {c.focusMarkets.cards.map((card, i) => (
            <div className={`area-card-home reveal${i ? ` d${i}` : ''}`} key={`${card.name}-${i}`}>
              <div className="area-img img-zoom">
                <Media src={card.image} alt={card.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="area-body">
                <div className="tag">{card.tag}</div>
                <div className="area-name">{card.name}</div>
                <div className="area-sub">{card.description}</div>
                <div className="area-pill"><span className="area-pill-dot"></span>{card.yield}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOUNDERS STRIP */}
      <div className="founders-strip">
        <div className="founder-strip-img">
          <Media src={c.foundersStrip.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="founder-strip-text">
          <p className="eyebrow reveal">{c.foundersStrip.eyebrow}</p>
          <h2 className="reveal d1"><Lines text={c.foundersStrip.headline} /></h2>
          <p className="reveal d2">{c.foundersStrip.body}</p>
          <Link href="/about" className="arrow-link reveal d3">{c.foundersStrip.linkLabel}</Link>
        </div>
      </div>

      {/* BLOGS PREVIEW */}
      <div className="insight-preview">
        <div className="insight-preview-header reveal">
          <div><p className="eyebrow">{c.blogsPreview.eyebrow}</p><h2>{c.blogsPreview.headline}</h2></div>
          <Link href="/blogs" className="arrow-link">{c.blogsPreview.linkLabel}</Link>
        </div>
        <div className="insight-cards-row">
          {c.blogsPreview.cards.map((card, i) => (
            <div className={`insight-card-home reveal${i ? ` d${i}` : ''}`} key={`${card.title}-${i}`}>
              <div className="insight-img img-zoom">
                <Media src={card.image} alt={card.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="insight-body">
                <div className="tag">{card.tag}</div>
                <div className="insight-title-home">{card.title}</div>
                <div className="insight-meta">{card.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Faq content={c.faq} />
      <Reviews content={c.reviews} />

      {/* CTA */}
      <div className="cta-band">
        <div className="reveal">
          <p className="eyebrow eyebrow-dark">{c.closingCta.eyebrow}</p>
          <h2 style={{ color: 'var(--white)' }}><Lines text={c.closingCta.headline} /></h2>
        </div>
        <div className="reveal d1"><Link href="/contact" className="btn btn-outline-light">{c.closingCta.buttonLabel}</Link></div>
      </div>
    </main>
  );
}
