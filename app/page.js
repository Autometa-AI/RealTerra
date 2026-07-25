import Link from 'next/link';
import './home.css';

export default function Home() {
  return (
    <main className="page">
      {/* HERO */}
      <div className="hero">
        <div className="hero-left">
          <div className="hero-label reveal">
            <span className="hero-label-line"></span>
            <span>RealTerra Global Properties</span>
            <span className="hero-label-sep">·</span>
            <span>Dubai, UAE</span>
          </div>
          <h1 className="reveal d1">Off-plan,<br /><em>quantified.</em></h1>
          <p className="large reveal d2">An analytical brokerage for ultra-high-net-worth investors. Every asset, trajectory, and exit window — quantified before it&apos;s sold.</p>
          <div className="hero-actions reveal d3">
            <Link href="/markets" className="btn btn-dark">View the Market Data</Link>
            <Link href="/insights" className="arrow-link">Read the research</Link>
          </div>
          <div className="hero-mini-stats reveal d4">
            <div className="hero-mini-stat">
              <span className="hero-mini-num">AED 528B</span>
              <span className="hero-mini-label">Market Volume 2024</span>
            </div>
            <div className="hero-mini-stat">
              <span className="hero-mini-num">0%</span>
              <span className="hero-mini-label">Capital Gains Tax</span>
            </div>
            <div className="hero-mini-stat">
              <span className="hero-mini-num">17.4%</span>
              <span className="hero-mini-label">Villa Growth YoY</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-right-parallax">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80&auto=format&fit=crop" alt="Dubai skyline" loading="eager" />
            <div className="hero-atmosphere"></div>
          </div>
        </div>
      </div>

      {/* STAT ROW */}
      <div className="stat-row">
        <div className="stat-item reveal"><div className="stat-num" data-target="528B">AED 528B</div><div className="stat-label">Dubai Transactions 2024</div></div>
        <div className="stat-item reveal d1"><div className="stat-num" data-target="17.4%">17.4%</div><div className="stat-label">Avg. Villa Growth YoY</div></div>
        <div className="stat-item reveal d2"><div className="stat-num" data-target="160K+">160K+</div><div className="stat-label">New HNI Residents 2024</div></div>
        <div className="stat-item reveal d3"><div className="stat-num">0%</div><div className="stat-label">Capital Gains Tax</div></div>
      </div>

      {/* MARQUEE */}
      <div className="marquee-bar">
        <div className="marquee-track">
          <span className="marquee-item accent">Al Marjan Island</span><span className="marquee-item">·</span>
          <span className="marquee-item accent">Dubai South</span><span className="marquee-item">·</span>
          <span className="marquee-item accent">Dubai Maritime City</span><span className="marquee-item">·</span>
          <span className="marquee-item">DAMAC Islands 2</span><span className="marquee-item">·</span>
          <span className="marquee-item">Emaar The Valley</span><span className="marquee-item">·</span>
          <span className="marquee-item">Data-Driven Advisory</span><span className="marquee-item">·</span>
          <span className="marquee-item">Ultra-HNI Specialists</span><span className="marquee-item">·</span>
          <span className="marquee-item accent">Al Marjan Island</span><span className="marquee-item">·</span>
          <span className="marquee-item accent">Dubai South</span><span className="marquee-item">·</span>
          <span className="marquee-item accent">Dubai Maritime City</span><span className="marquee-item">·</span>
          <span className="marquee-item">DAMAC Islands 2</span><span className="marquee-item">·</span>
          <span className="marquee-item">Emaar The Valley</span><span className="marquee-item">·</span>
          <span className="marquee-item">Data-Driven Advisory</span><span className="marquee-item">·</span>
          <span className="marquee-item">Ultra-HNI Specialists</span><span className="marquee-item">·</span>
        </div>
      </div>

      {/* INTRO */}
      <div className="intro-strip">
        <div className="reveal">
          <p className="eyebrow">Philosophy</p>
          <h2>An analytics practice<br />first. A luxury one<br />second.</h2>
        </div>
        <div className="reveal d1">
          <p className="large">RealTerra exists for investors who want their real estate decisions underwritten the way a portfolio allocation would be — with a defined trajectory, exit window, and liquidity profile, not a lifestyle narrative.</p>
          <div style={{ marginTop: '2rem' }}><Link href="/about" className="arrow-link">Our approach</Link></div>
        </div>
      </div>

      {/* PHILOSOPHY DARK */}
      <div className="philosophy-preview">
        <div className="philosophy-left reveal">
          <div>
            <p className="eyebrow eyebrow-dark">Four Pillars</p>
            <h2 style={{ color: 'var(--white)' }}>How We Select</h2>
            <p style={{ color: 'rgba(250,249,246,0.5)', marginTop: '1rem', fontSize: '0.88rem', maxWidth: '340px' }}>Every recommendation rests on a documented investment thesis. No exceptions.</p>
          </div>
          <div className="pillars-mini">
            <div className="pillar-mini"><span className="pillar-num">01</span><span className="pillar-label">Thesis-Driven Selection</span></div>
            <div className="pillar-mini"><span className="pillar-num">02</span><span className="pillar-label">Infrastructure Alpha</span></div>
            <div className="pillar-mini"><span className="pillar-num">03</span><span className="pillar-label">Developer Due Diligence</span></div>
            <div className="pillar-mini"><span className="pillar-num">04</span><span className="pillar-label">Portfolio Architecture</span></div>
          </div>
          <Link href="/about" className="arrow-link arrow-link-light" style={{ marginTop: '2.5rem' }}>Read our methodology</Link>
        </div>
        <div className="philosophy-right">
          <div className="philosophy-right-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80&auto=format&fit=crop" alt="Dubai architecture" />
          </div>
        </div>
      </div>

      {/* AREAS */}
      <div className="areas-preview">
        <div className="areas-preview-header reveal">
          <div><p className="eyebrow">Market Intelligence</p><h2>Focus Markets</h2></div>
          <Link href="/markets" className="arrow-link">All markets</Link>
        </div>
        <div className="areas-grid-home">
          <div className="area-card-home reveal">
            <div className="area-img img-zoom">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80&auto=format&fit=crop" alt="Al Marjan Island" /></div>
            <div className="area-body">
              <div className="tag">Ras Al Khaimah</div>
              <div className="area-name">Al Marjan Island</div>
              <div className="area-sub">The UAE&apos;s most anticipated gaming and hospitality destination. The Wynn effect will permanently reprice this market.</div>
              <div className="area-pill"><span className="area-pill-dot"></span>Yield 7.2 – 9.1%</div>
            </div>
          </div>
          <div className="area-card-home reveal d1">
            <div className="area-img img-zoom">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80&auto=format&fit=crop" alt="Dubai South" /></div>
            <div className="area-body">
              <div className="tag">Dubai</div>
              <div className="area-name">Dubai South</div>
              <div className="area-sub">Al Maktoum International&apos;s expansion makes this the decade&apos;s most significant long-play in the emirate.</div>
              <div className="area-pill"><span className="area-pill-dot"></span>Yield 6.8 – 8.4%</div>
            </div>
          </div>
          <div className="area-card-home reveal d2">
            <div className="area-img img-zoom">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=80&auto=format&fit=crop" alt="Dubai Maritime City" /></div>
            <div className="area-body">
              <div className="tag">Dubai</div>
              <div className="area-name">Dubai Maritime City</div>
              <div className="area-sub">Waterfront living between Port Rashid and Business Bay — the decade&apos;s most underpriced waterfront opportunity.</div>
              <div className="area-pill"><span className="area-pill-dot"></span>Yield 6.2 – 7.8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* FOUNDERS STRIP */}
      <div className="founders-strip">
        <div className="founder-strip-img">
          <div className="founder-strip-parallax">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop" alt="RealTerra advisory" />
          </div>
        </div>
        <div className="founder-strip-text">
          <p className="eyebrow reveal">Leadership</p>
          <h2 className="reveal d1">Two Founders.<br />One Standard.</h2>
          <p className="reveal d2">An investment professional with a lifelong foundation in capital allocation. A former Mrs. India Worldwide who became one of the UAE&apos;s most respected luxury real estate practitioners. RealTerra is where analytical rigour meets market intuition.</p>
          <Link href="/about" className="arrow-link reveal d3">Meet the team</Link>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="insight-preview">
        <div className="insight-preview-header reveal">
          <div><p className="eyebrow">Research</p><h2>Latest Insights</h2></div>
          <Link href="/insights" className="arrow-link">All reports</Link>
        </div>
        <div className="insight-cards-row">
          <div className="insight-card-home reveal">
            <div className="insight-img img-zoom">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://images.unsplash.com/photo-1546412414-e1885259563a?w=900&q=80&auto=format&fit=crop" alt="Al Marjan report" /></div>
            <div className="insight-body">
              <div className="tag">Flagship Report</div>
              <div className="insight-title-home">The Al Marjan Inflection: Why the Wynn Effect Will Permanently Reprice RAK Residential</div>
              <div className="insight-meta">42-page deep-dive · Available on request</div>
            </div>
          </div>
          <div className="insight-card-home reveal d1">
            <div className="insight-img img-zoom">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop" alt="Dubai South" /></div>
            <div className="insight-body">
              <div className="tag">Market Brief</div>
              <div className="insight-title-home">Dubai South: Reading the Airport Signal Before the Market Does</div>
              <div className="insight-meta">Area analysis · 2025</div>
            </div>
          </div>
          <div className="insight-card-home reveal d2">
            <div className="insight-img img-zoom">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80&auto=format&fit=crop" alt="Developer analysis" /></div>
            <div className="insight-body">
              <div className="tag">Developer Analysis</div>
              <div className="insight-title-home">DAMAC vs Emaar: Completion Rate and Yield Comparison Across 12 Projects</div>
              <div className="insight-meta">Comparative · 2025</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="reveal">
          <p className="eyebrow eyebrow-dark">Ready to begin?</p>
          <h2 style={{ color: 'var(--white)' }}>The first conversation<br />is always a listening exercise.</h2>
        </div>
        <div className="reveal d1"><Link href="/contact" className="btn btn-outline-light">Book an Introductory Call</Link></div>
      </div>
    </main>
  );
}
