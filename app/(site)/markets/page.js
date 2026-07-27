import Link from 'next/link';
import Image from 'next/image';
import './markets.css';
import { getContent } from '../../../lib/content';
import Lines from '../../../components/Lines';

export const metadata = {
  title: 'Markets',
};

export default async function Markets() {
  const c = await getContent('markets');

  return (
    <main className="page">
      {/* HERO */}
      <div className="markets-hero page-hero-split">
        <div className="page-hero-split-left dark">
          <p className="eyebrow reveal" style={{ color: 'var(--text-2)' }}>{c.hero.eyebrow}</p>
          <h1 className="reveal d1"><Lines text={c.hero.headline} /></h1>
          <p className="reveal d2" style={{ maxWidth: '360px', marginTop: '1rem' }}>{c.hero.subhead}</p>
          <div className="markets-hero-meta reveal d3">
            {c.hero.stats.map((s) => (
              <div key={s.label}>
                <span className="markets-hero-stat-val">{s.value}</span>
                <span className="markets-hero-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="page-hero-split-right">
          <Image src={c.hero.image} alt="UAE skyline" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>

      {/* MACRO STRIP */}
      <div className="macro-strip">
        <div className="reveal">
          <p className="eyebrow">{c.macro.eyebrow}</p>
          <h2>{c.macro.headline}</h2>
        </div>
        <div className="macro-points reveal d1">
          {c.macro.points.map((point, i) => (
            <div className="macro-point" key={i}><span className="macro-dot"></span><p>{point}</p></div>
          ))}
        </div>
      </div>

      {/* MARKETS */}
      {c.markets.map((m) => (
        <div className="market-full" key={m.name}>
          <div className="market-img img-zoom">
            <Image src={m.image} alt={m.name} fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="market-text reveal">
            <p className="market-location">{m.location}</p>
            <h2 className="market-name">{m.name}</h2>
            <p className="market-desc">{m.description}</p>
            <div className="market-metrics">
              <div className="market-metric"><span className="metric-lbl">Capital Growth (3yr)</span><span className="metric-val metric-up">{m.capitalGrowth}</span></div>
              <div className="market-metric"><span className="metric-lbl">Gross Rental Yield</span><span className="metric-val">{m.rentalYield}</span></div>
              <div className="market-metric"><span className="metric-lbl">Entry Point</span><span className="metric-val">{m.entryPoint}</span></div>
              <div className="market-metric"><span className="metric-lbl">RealTerra Conviction</span><span className="metric-val">{m.conviction}</span></div>
            </div>
            <Link href="/contact" className="arrow-link" style={{ marginTop: '1.5rem' }}>{c.requestLinkLabel}</Link>
          </div>
        </div>
      ))}

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
