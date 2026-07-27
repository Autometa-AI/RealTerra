import Link from 'next/link';
import Image from 'next/image';
import './insights.css';
import { getContent } from '../../../lib/content';
import Lines from '../../../components/Lines';
import NewsletterForm from '../../../components/NewsletterForm';

export const metadata = {
  title: 'Insights',
};

export default async function Insights() {
  const c = await getContent('insights');

  return (
    <main className="page">
      {/* HERO */}
      <div className="insights-hero">
        <div className="insights-hero-inner">
          <div>
            <p className="eyebrow reveal" style={{ color: 'var(--text-2)' }}>{c.hero.eyebrow}</p>
            <h1 className="reveal d1"><Lines text={c.hero.headline} /></h1>
          </div>
          <div className="reveal d2">
            <p>{c.hero.intro}</p>
          </div>
        </div>
      </div>

      {/* FEATURED */}
      <div className="featured-insight">
        <div className="fi-img">
          <Image src={c.featured.image} alt={c.featured.title} fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="fi-body reveal">
          <p className="fi-type">{c.featured.type}</p>
          <h2 className="fi-title">{c.featured.title}</h2>
          <p className="fi-excerpt">{c.featured.excerpt}</p>
          <Link href="/contact" className="arrow-link">{c.featured.linkLabel}</Link>
          <p className="fi-meta">{c.featured.meta}</p>
        </div>
      </div>

      {/* GRID */}
      <div className="insights-main">
        <div className="insights-grid-full">
          {c.reports.map((r, i) => (
            <div className={`insight-card-full reveal${i % 3 ? ` d${i % 3}` : ''}`} key={r.title}>
              <div className="ic-img img-zoom">
                <Image src={r.image} alt={r.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="ic-body">
                <p className="ic-type">{r.type}</p>
                <h3 className="ic-title">{r.title}</h3>
                <p className="ic-excerpt">{r.excerpt}</p>
                <div className="ic-meta"><span>{r.meta}</span><Link href="/contact" className="arrow-link" style={{ fontSize: '0.65rem' }}>{c.requestLinkLabel}</Link></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REQUEST BAND */}
      <div className="request-band">
        <div className="reveal">
          <p className="eyebrow">{c.newsletter.eyebrow}</p>
          <h2><Lines text={c.newsletter.headline} /></h2>
          <p style={{ marginTop: '1rem' }}>{c.newsletter.body}</p>
        </div>
        <NewsletterForm content={c.newsletter} />
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
