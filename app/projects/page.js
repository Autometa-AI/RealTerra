import Link from 'next/link';
import './projects.css';

export const metadata = {
  title: 'Projects',
};

export default function Projects() {
  return (
    <main className="page">
      {/* HERO */}
      <div className="projects-hero page-hero-split">
        <div className="page-hero-split-left light">
          <p className="eyebrow reveal">Curated Developments</p>
          <h1 className="reveal d1" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}>Developments<br />We Recommend</h1>
          <p className="reveal d2" style={{ maxWidth: '360px', marginTop: '1rem' }}>Every project passes our five-point screening: developer track record, completion risk, yield floor, exit liquidity, and growth thesis. We show fewer projects. That is the point.</p>
          <div className="projects-hero-criteria reveal d3">
            <span className="projects-hero-tag">Developer track record</span>
            <span className="projects-hero-tag">Yield floor verified</span>
            <span className="projects-hero-tag">Exit liquidity assessed</span>
          </div>
        </div>
        <div className="page-hero-split-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&q=80&auto=format&fit=crop" alt="Dubai luxury development" />
        </div>
      </div>

      {/* FILTER */}
      <div className="filter-bar">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Emaar</button>
        <button className="filter-btn">DAMAC</button>
        <button className="filter-btn">Binghatti</button>
        <button className="filter-btn">Villas</button>
        <button className="filter-btn">Apartments</button>
        <button className="filter-btn">Off-Plan</button>
      </div>

      <div className="projects-main">
        {/* FEATURED */}
        <div className="featured-project reveal">
          <div className="fp-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80&auto=format&fit=crop" alt="Wynn Al Marjan" />
          </div>
          <div className="fp-body">
            <p className="fp-tag">Featured · Al Marjan Island · RAK</p>
            <h2 className="fp-name">Wynn Al Marjan Precinct</h2>
            <p className="fp-desc">The residential precinct surrounding the UAE&apos;s first integrated gaming resort. Infrastructure spend, hospitality footfall, and employment density are converging to create one of the decade&apos;s clearest appreciation plays. Entry windows at current pricing are narrowing.</p>
            <div className="fp-stats">
              <div><div className="fp-stat-val">AED 800K+</div><div className="fp-stat-lbl">Starting Price</div></div>
              <div><div className="fp-stat-val">8.8%</div><div className="fp-stat-lbl">Gross Yield</div></div>
              <div><div className="fp-stat-val">2027</div><div className="fp-stat-lbl">Handover</div></div>
            </div>
            <Link href="/contact" className="arrow-link">Enquire about this project</Link>
          </div>
        </div>

        {/* GRID */}
        <div className="projects-grid">
          <div className="project-card-full reveal">
            <div className="project-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=900&q=80&auto=format&fit=crop" alt="The Valley Emaar" />
              <span className="project-badge">Off-Plan</span>
            </div>
            <div className="project-body-full">
              <p className="project-developer">Emaar Properties</p>
              <h3 className="project-name-full">The Valley</h3>
              <p className="project-location-text">Dubai–Al Ain Road · Villas &amp; Townhouses</p>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '0.5rem' }}>Masterplanned villa community at entry price below replacement cost. Strong capital growth underpinned by family-driven rental demand from the expanding Dubai South corridor.</p>
              <div className="project-stats-row">
                <div className="p-stat"><div className="p-stat-val">AED 1.2M+</div><div className="p-stat-label">From</div></div>
                <div className="p-stat"><div className="p-stat-val">6.4%</div><div className="p-stat-label">Yield</div></div>
                <div className="p-stat"><div className="p-stat-val">2026</div><div className="p-stat-label">Handover</div></div>
              </div>
            </div>
          </div>

          <div className="project-card-full reveal d1">
            <div className="project-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=80&auto=format&fit=crop" alt="DAMAC Islands 2" />
              <span className="project-badge">Off-Plan</span>
            </div>
            <div className="project-body-full">
              <p className="project-developer">DAMAC Properties</p>
              <h3 className="project-name-full">DAMAC Islands 2</h3>
              <p className="project-location-text">Dubailand · Waterfront Villas</p>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '0.5rem' }}>Island-living concept with private lagoon access. Phase 2 captures demand from investors priced out of Palm Jumeirah — at a fraction of the cost, with comparable lifestyle credentials.</p>
              <div className="project-stats-row">
                <div className="p-stat"><div className="p-stat-val">AED 2.1M+</div><div className="p-stat-label">From</div></div>
                <div className="p-stat"><div className="p-stat-val">7.1%</div><div className="p-stat-label">Yield</div></div>
                <div className="p-stat"><div className="p-stat-val">2028</div><div className="p-stat-label">Handover</div></div>
              </div>
            </div>
          </div>

          <div className="project-card-full reveal d2">
            <div className="project-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80&auto=format&fit=crop" alt="Binghatti Skyrise" />
              <span className="project-badge">Off-Plan</span>
            </div>
            <div className="project-body-full">
              <p className="project-developer">Binghatti</p>
              <h3 className="project-name-full">Binghatti Skyrise</h3>
              <p className="project-location-text">Business Bay · Apartments</p>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '0.5rem' }}>Binghatti&apos;s signature architectural density in Business Bay. Short handover timelines and Bugatti / Mercedes co-branded residences redefining branded living in Dubai.</p>
              <div className="project-stats-row">
                <div className="p-stat"><div className="p-stat-val">AED 950K+</div><div className="p-stat-label">From</div></div>
                <div className="p-stat"><div className="p-stat-val">7.4%</div><div className="p-stat-label">Yield</div></div>
                <div className="p-stat"><div className="p-stat-val">2026</div><div className="p-stat-label">Handover</div></div>
              </div>
            </div>
          </div>

          <div className="project-card-full reveal">
            <div className="project-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop" alt="Creek Harbour" />
              <span className="project-badge">Off-Plan</span>
            </div>
            <div className="project-body-full">
              <p className="project-developer">Emaar Properties</p>
              <h3 className="project-name-full">Creek Harbour</h3>
              <p className="project-location-text">Dubai Creek · Apartments</p>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '0.5rem' }}>The city&apos;s next downtown. The Creek Tower — when completed — will shift Dubai&apos;s iconic skyline. Early-mover advantage on apartments here is compressing rapidly as global awareness builds.</p>
              <div className="project-stats-row">
                <div className="p-stat"><div className="p-stat-val">AED 1.5M+</div><div className="p-stat-label">From</div></div>
                <div className="p-stat"><div className="p-stat-val">6.0%</div><div className="p-stat-label">Yield</div></div>
                <div className="p-stat"><div className="p-stat-val">2026</div><div className="p-stat-label">Handover</div></div>
              </div>
            </div>
          </div>

          <div className="project-card-full reveal d1">
            <div className="project-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop" alt="DAMAC Lagoons" />
              <span className="project-badge">Off-Plan</span>
            </div>
            <div className="project-body-full">
              <p className="project-developer">DAMAC Properties</p>
              <h3 className="project-name-full">DAMAC Lagoons</h3>
              <p className="project-location-text">Dubailand · Mediterranean Villas</p>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '0.5rem' }}>Mediterranean-themed villa clusters with private lagoon access. Proven sellout record and secondary market liquidity make this one of DAMAC&apos;s most investable masterplans.</p>
              <div className="project-stats-row">
                <div className="p-stat"><div className="p-stat-val">AED 1.8M+</div><div className="p-stat-label">From</div></div>
                <div className="p-stat"><div className="p-stat-val">6.8%</div><div className="p-stat-label">Yield</div></div>
                <div className="p-stat"><div className="p-stat-val">2027</div><div className="p-stat-label">Handover</div></div>
              </div>
            </div>
          </div>

          <div className="project-card-full reveal d2">
            <div className="project-img img-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=900&q=80&auto=format&fit=crop" alt="Emaar Beachfront" />
              <span className="project-badge">Limited Inventory</span>
            </div>
            <div className="project-body-full">
              <p className="project-developer">Emaar Properties</p>
              <h3 className="project-name-full">Emaar Beachfront</h3>
              <p className="project-location-text">Dubai Harbour · Waterfront Apartments</p>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '0.5rem' }}>Private beach access, marina views, and proximity to Dubai Marina. One of the most liquid residential addresses in the emirate — holds value in any market cycle.</p>
              <div className="project-stats-row">
                <div className="p-stat"><div className="p-stat-val">AED 2.4M+</div><div className="p-stat-label">From</div></div>
                <div className="p-stat"><div className="p-stat-val">5.8%</div><div className="p-stat-label">Yield</div></div>
                <div className="p-stat"><div className="p-stat-val">Ready</div><div className="p-stat-label">Status</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="reveal">
          <p className="eyebrow">Off-market access</p>
          <h2 style={{ color: 'var(--white)' }}>Some of our best projects<br />never appear here.</h2>
        </div>
        <Link href="/contact" className="btn btn-outline-light reveal d1">Request Off-Market Access</Link>
      </div>
    </main>
  );
}
