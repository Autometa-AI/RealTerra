import Link from 'next/link';
import './insights.css';

export const metadata = {
  title: 'Insights',
};

export default function Insights() {
  return (
    <main className="page">
      {/* HERO */}
      <div className="insights-hero">
        <div className="insights-hero-inner">
          <div>
            <p className="eyebrow reveal" style={{ color: 'var(--text-2)' }}>Market Intelligence</p>
            <h1 className="reveal d1">Research &amp;<br />Insights</h1>
          </div>
          <div className="reveal d2">
            <p>We publish independently-produced research on UAE real estate — area analyses, developer comparisons, and investment frameworks for serious allocators. All available on request.</p>
          </div>
        </div>
      </div>

      {/* FEATURED */}
      <div className="featured-insight">
        <div className="fi-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1546412414-e1885259563a?w=1200&q=80&auto=format&fit=crop" alt="Al Marjan Report" />
        </div>
        <div className="fi-body reveal">
          <p className="fi-type">Flagship Report · 2025</p>
          <h2 className="fi-title">The Al Marjan Inflection: Why the Wynn Effect Will Permanently Reprice RAK Residential</h2>
          <p className="fi-excerpt">A 42-page deep-dive into the supply-demand dynamics, infrastructure commitments, and comparable case studies — Macau, Singapore Marina Bay — that make Al Marjan one of the clearest asymmetric real estate bets in the GCC this decade. Covers entry windows, developer selection, and projected 5-year IRR bands.</p>
          <Link href="/contact" className="arrow-link">Request this report</Link>
          <p className="fi-meta">42 pages · Available to qualified investors</p>
        </div>
      </div>

      {/* GRID */}
      <div className="insights-main">
        <div className="insights-grid-full">
          <div className="insight-card-full reveal">
            <div className="ic-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80&auto=format&fit=crop" alt="Dubai South" />
            </div>
            <div className="ic-body">
              <p className="ic-type">Market Brief</p>
              <h3 className="ic-title">Dubai South: Reading the Airport Signal Before the Market Does</h3>
              <p className="ic-excerpt">Al Maktoum&apos;s expansion timeline decoded — what it means for residential demand, which sub-zones sit in the appreciation corridor, and how to size a position today.</p>
              <div className="ic-meta"><span>Area Analysis</span><Link href="/contact" className="arrow-link" style={{ fontSize: '0.65rem' }}>Request</Link></div>
            </div>
          </div>

          <div className="insight-card-full reveal d1">
            <div className="ic-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80&auto=format&fit=crop" alt="Developer analysis" />
            </div>
            <div className="ic-body">
              <p className="ic-type">Developer Analysis</p>
              <h3 className="ic-title">DAMAC vs Emaar: Completion Rate and Yield Comparison Across 12 Projects</h3>
              <p className="ic-excerpt">A forensic comparison of handover performance, escrow compliance, and secondary market behaviour across the UAE&apos;s two largest off-plan developers.</p>
              <div className="ic-meta"><span>Comparative · 2025</span><Link href="/contact" className="arrow-link" style={{ fontSize: '0.65rem' }}>Request</Link></div>
            </div>
          </div>

          <div className="insight-card-full reveal d2">
            <div className="ic-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=900&q=80&auto=format&fit=crop" alt="Maritime City" />
            </div>
            <div className="ic-body">
              <p className="ic-type">Area Spotlight</p>
              <h3 className="ic-title">Dubai Maritime City: The Waterfront District the Market Hasn&apos;t Priced Yet</h3>
              <p className="ic-excerpt">Infrastructure convergence, zoning history, and our forward price model for the Maritime City precinct through 2029. The case for early entry.</p>
              <div className="ic-meta"><span>Area Analysis · 2025</span><Link href="/contact" className="arrow-link" style={{ fontSize: '0.65rem' }}>Request</Link></div>
            </div>
          </div>

          <div className="insight-card-full reveal">
            <div className="ic-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop" alt="Portfolio guide" />
            </div>
            <div className="ic-body">
              <p className="ic-type">Investor Guide</p>
              <h3 className="ic-title">Building a UAE Portfolio Across Three Horizons: Yield, Growth &amp; Off-Plan Value</h3>
              <p className="ic-excerpt">A framework for structuring property exposure across short, medium, and long time horizons — using the UAE&apos;s unique tax environment to compound returns.</p>
              <div className="ic-meta"><span>Framework · 2025</span><Link href="/contact" className="arrow-link" style={{ fontSize: '0.65rem' }}>Request</Link></div>
            </div>
          </div>

          <div className="insight-card-full reveal d1">
            <div className="ic-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=900&q=80&auto=format&fit=crop" alt="Saadiyat" />
            </div>
            <div className="ic-body">
              <p className="ic-type">Area Spotlight</p>
              <h3 className="ic-title">Saadiyat Island: Why Abu Dhabi&apos;s Cultural District Is an Institutional-Grade Bet</h3>
              <p className="ic-excerpt">Louvre, Guggenheim, Formula 1 — and a government-linked developer track record that reduces completion risk to near zero. The full investment case.</p>
              <div className="ic-meta"><span>Area Analysis · 2025</span><Link href="/contact" className="arrow-link" style={{ fontSize: '0.65rem' }}>Request</Link></div>
            </div>
          </div>

          <div className="insight-card-full reveal d2">
            <div className="ic-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&auto=format&fit=crop" alt="UAE macro" />
            </div>
            <div className="ic-body">
              <p className="ic-type">Macro Brief</p>
              <h3 className="ic-title">UAE Real Estate in 2025: The Four Structural Tailwinds Every Investor Should Understand</h3>
              <p className="ic-excerpt">Zero CGT, Golden Visa demand lock-in, infrastructure pipeline, and HNI inflows. The macro case for UAE real estate — written for allocators, not speculators.</p>
              <div className="ic-meta"><span>Macro · Q1 2025</span><Link href="/contact" className="arrow-link" style={{ fontSize: '0.65rem' }}>Request</Link></div>
            </div>
          </div>
        </div>
      </div>

      {/* REQUEST BAND */}
      <div className="request-band">
        <div className="reveal">
          <p className="eyebrow">Stay Informed</p>
          <h2>Receive our research<br />as it&apos;s published.</h2>
          <p style={{ marginTop: '1rem' }}>Quarterly briefings, area reports, and developer analyses — delivered directly. No spam. Unsubscribe anytime.</p>
        </div>
        <div className="request-form-mini reveal d1">
          <div className="request-input-row">
            <input type="email" placeholder="your@email.com" />
            <button type="button">Subscribe</button>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: '0.8rem' }}>We respect your privacy. No third-party sharing.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="reveal">
          <p className="eyebrow">Custom Research</p>
          <h2 style={{ color: 'var(--white)' }}>Need a bespoke market<br />analysis? We do that.</h2>
        </div>
        <Link href="/contact" className="btn btn-outline-light reveal d1">Request a Bespoke Analysis</Link>
      </div>
    </main>
  );
}
