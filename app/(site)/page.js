import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './home.css';
import { getContent } from '../../lib/content';
import Lines from '../../components/Lines';

export default async function Home() {
  const c = await getContent('home');

  return (
    <main className="page">
      {/* HERO */}
      <div className="hero">
        <div className="hero-left">
          <div className="hero-label reveal">
            <span className="hero-label-line"></span>
            <span>{c.hero.labelLine1}</span>
            <span className="hero-label-sep">·</span>
            <span>{c.hero.labelLine2}</span>
          </div>
          <h1 className="reveal d1">{c.hero.headline}<br /><em>{c.hero.headlineEm}</em></h1>
          <p className="large reveal d2">{c.hero.subhead}</p>
          <div className="hero-actions reveal d3">
            <Link href="/markets" className="btn btn-dark">{c.hero.ctaPrimary}</Link>
            <Link href="/insights" className="arrow-link">{c.hero.ctaSecondary}</Link>
          </div>
          <div className="hero-mini-stats reveal d4">
            {c.hero.miniStats.map((s) => (
              <div className="hero-mini-stat" key={s.label}>
                <span className="hero-mini-num">{s.value}</span>
                <span className="hero-mini-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-right-parallax">
            <Image src={c.hero.image} alt="Dubai skyline" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="hero-atmosphere"></div>
          </div>
        </div>
      </div>

      {/* STAT ROW */}
      <div className="stat-row">
        {c.statRow.map((s, i) => (
          <div className={`stat-item reveal${i ? ` d${i}` : ''}`} key={s.label}>
            <div className="stat-num" data-target={s.counterTarget || undefined}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* MARQUEE */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[...c.marquee, ...c.marquee].map((item, i) => (
            <Fragment key={i}>
              <span className={`marquee-item${i % c.marquee.length < 3 ? ' accent' : ''}`}>{item}</span>
              <span className="marquee-item">·</span>
            </Fragment>
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
            <p style={{ color: 'rgba(250,249,246,0.5)', marginTop: '1rem', fontSize: '0.88rem', maxWidth: '340px' }}>{c.philosophyPanel.subtext}</p>
          </div>
          <div className="pillars-mini">
            {c.philosophyPanel.pillars.map((label, i) => (
              <div className="pillar-mini" key={label}><span className="pillar-num">{String(i + 1).padStart(2, '0')}</span><span className="pillar-label">{label}</span></div>
            ))}
          </div>
          <Link href="/about" className="arrow-link arrow-link-light" style={{ marginTop: '2.5rem' }}>{c.philosophyPanel.linkLabel}</Link>
        </div>
        <div className="philosophy-right">
          <div className="philosophy-right-wrap">
            <Image src={c.philosophyPanel.image} alt="Dubai architecture" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
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
            <div className={`area-card-home reveal${i ? ` d${i}` : ''}`} key={card.name}>
              <div className="area-img img-zoom">
                <Image src={card.image} alt={card.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
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
          <div className="founder-strip-parallax">
            <Image src={c.foundersStrip.image} alt="RealTerra advisory" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
        <div className="founder-strip-text">
          <p className="eyebrow reveal">{c.foundersStrip.eyebrow}</p>
          <h2 className="reveal d1"><Lines text={c.foundersStrip.headline} /></h2>
          <p className="reveal d2">{c.foundersStrip.body}</p>
          <Link href="/about" className="arrow-link reveal d3">{c.foundersStrip.linkLabel}</Link>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="insight-preview">
        <div className="insight-preview-header reveal">
          <div><p className="eyebrow">{c.insightsPreview.eyebrow}</p><h2>{c.insightsPreview.headline}</h2></div>
          <Link href="/insights" className="arrow-link">{c.insightsPreview.linkLabel}</Link>
        </div>
        <div className="insight-cards-row">
          {c.insightsPreview.cards.map((card, i) => (
            <div className={`insight-card-home reveal${i ? ` d${i}` : ''}`} key={card.title}>
              <div className="insight-img img-zoom">
                <Image src={card.image} alt={card.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
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
