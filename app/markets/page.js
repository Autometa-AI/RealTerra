import Link from 'next/link';
import './markets.css';

export const metadata = {
  title: 'Markets',
};

export default function Markets() {
  return (
    <main className="page">
      {/* HERO */}
      <div className="markets-hero page-hero-split">
        <div className="page-hero-split-left dark">
          <p className="eyebrow reveal" style={{ color: 'var(--text-2)' }}>Market Intelligence</p>
          <h1 className="reveal d1">Six High-<br />Conviction<br />Markets</h1>
          <p className="reveal d2" style={{ maxWidth: '360px', marginTop: '1rem' }}>We concentrate on UAE markets selected for structural growth drivers, not present buzz. Infrastructure, regulation, and demographic flow — assessed before we commit a recommendation.</p>
          <div className="markets-hero-meta reveal d3">
            <div>
              <span className="markets-hero-stat-val">6</span>
              <span className="markets-hero-stat-lbl">Focus Markets</span>
            </div>
            <div>
              <span className="markets-hero-stat-val">AED 528B</span>
              <span className="markets-hero-stat-lbl">Market Volume 2024</span>
            </div>
            <div>
              <span className="markets-hero-stat-val">0%</span>
              <span className="markets-hero-stat-lbl">Capital Gains Tax</span>
            </div>
          </div>
        </div>
        <div className="page-hero-split-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80&auto=format&fit=crop" alt="UAE skyline" />
        </div>
      </div>

      {/* MACRO STRIP */}
      <div className="macro-strip">
        <div className="reveal">
          <p className="eyebrow">Why UAE</p>
          <h2>The structural case for UAE property</h2>
        </div>
        <div className="macro-points reveal d1">
          <div className="macro-point"><span className="macro-dot"></span><p>Zero capital gains tax and zero income tax on rental proceeds — the most investor-friendly property environment of any major global city.</p></div>
          <div className="macro-point"><span className="macro-dot"></span><p>160,000+ new HNI residents relocated to the UAE in 2024 alone, creating sustained demand pressure across all tiers of the residential market.</p></div>
          <div className="macro-point"><span className="macro-dot"></span><p>Government-backed infrastructure spend of over AED 650 billion committed through 2040 — the macro tailwind that underwrites every thesis on this page.</p></div>
          <div className="macro-point"><span className="macro-dot"></span><p>Golden Visa and investor visa pathways creating lock-in demand from long-term residents who buy rather than rent as residency horizons extend.</p></div>
        </div>
      </div>

      {/* MARKET 1 */}
      <div className="market-full">
        <div className="market-img img-zoom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80&auto=format&fit=crop" alt="Al Marjan Island" />
        </div>
        <div className="market-text reveal">
          <p className="market-location">Ras Al Khaimah</p>
          <h2 className="market-name">Al Marjan Island</h2>
          <p className="market-desc">The UAE&apos;s most anticipated gaming and hospitality destination. The Wynn Al Marjan — the region&apos;s first integrated gaming resort — represents a structural inflection point: the moment a market permanently reprices. Comparable case studies from Singapore&apos;s Marina Bay Sands and Macau suggest a 40–60% step-change in surrounding residential values within 36 months of opening. We entered this market early.</p>
          <div className="market-metrics">
            <div className="market-metric"><span className="metric-lbl">Capital Growth (3yr)</span><span className="metric-val metric-up">↑ 68%</span></div>
            <div className="market-metric"><span className="metric-lbl">Gross Rental Yield</span><span className="metric-val">7.2 – 9.1%</span></div>
            <div className="market-metric"><span className="metric-lbl">Entry Point</span><span className="metric-val">From AED 700K</span></div>
            <div className="market-metric"><span className="metric-lbl">RealTerra Conviction</span><span className="metric-val">Very High</span></div>
          </div>
          <Link href="/contact" className="arrow-link" style={{ marginTop: '1.5rem' }}>Request area report</Link>
        </div>
      </div>

      {/* MARKET 2 */}
      <div className="market-full">
        <div className="market-img img-zoom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop" alt="Dubai South" />
        </div>
        <div className="market-text reveal">
          <p className="market-location">Dubai</p>
          <h2 className="market-name">Dubai South</h2>
          <p className="market-desc">Al Maktoum International Airport&apos;s expansion to a planned 150 million passenger capacity makes Dubai South the most significant long-play in the emirate. This is a city within a city — designed from the ground up, with aviation, logistics, and residential living converging around the world&apos;s largest airport. Early-mover advantage here is closing rapidly as institutional capital takes notice.</p>
          <div className="market-metrics">
            <div className="market-metric"><span className="metric-lbl">Capital Growth (3yr)</span><span className="metric-val metric-up">↑ 54%</span></div>
            <div className="market-metric"><span className="metric-lbl">Gross Rental Yield</span><span className="metric-val">6.8 – 8.4%</span></div>
            <div className="market-metric"><span className="metric-lbl">Entry Point</span><span className="metric-val">From AED 650K</span></div>
            <div className="market-metric"><span className="metric-lbl">RealTerra Conviction</span><span className="metric-val">High</span></div>
          </div>
          <Link href="/contact" className="arrow-link" style={{ marginTop: '1.5rem' }}>Request area report</Link>
        </div>
      </div>

      {/* MARKET 3 */}
      <div className="market-full">
        <div className="market-img img-zoom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1200&q=80&auto=format&fit=crop" alt="Dubai Maritime City" />
        </div>
        <div className="market-text reveal">
          <p className="market-location">Dubai</p>
          <h2 className="market-name">Dubai Maritime City</h2>
          <p className="market-desc">Positioned between Port Rashid and Business Bay, this waterfront district is the decade&apos;s most underpriced opportunity. Maritime commerce, superyacht berths, and residential living are converging in a precinct that sits minutes from Downtown Dubai but trades at a meaningful discount. Zoning history and infrastructure commitments point to a step-change in pricing over the next 18–36 months.</p>
          <div className="market-metrics">
            <div className="market-metric"><span className="metric-lbl">Capital Growth (3yr)</span><span className="metric-val metric-up">↑ 41%</span></div>
            <div className="market-metric"><span className="metric-lbl">Gross Rental Yield</span><span className="metric-val">6.2 – 7.8%</span></div>
            <div className="market-metric"><span className="metric-lbl">Entry Point</span><span className="metric-val">From AED 1.1M</span></div>
            <div className="market-metric"><span className="metric-lbl">RealTerra Conviction</span><span className="metric-val">High</span></div>
          </div>
          <Link href="/contact" className="arrow-link" style={{ marginTop: '1.5rem' }}>Request area report</Link>
        </div>
      </div>

      {/* MARKET 4 */}
      <div className="market-full">
        <div className="market-img img-zoom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200&q=80&auto=format&fit=crop" alt="Meydan MBR City" />
        </div>
        <div className="market-text reveal">
          <p className="market-location">Dubai</p>
          <h2 className="market-name">Meydan &amp; MBR City</h2>
          <p className="market-desc">Lifestyle-driven demand from HNIs drawn to space, connectivity, and prestige. Meydan&apos;s racecourse proximity and Mohammed Bin Rashid City&apos;s masterplan density create a compound-growth story built on genuine scarcity. Villa and townhouse products here consistently outperform on secondary market liquidity — a key metric in our selection framework.</p>
          <div className="market-metrics">
            <div className="market-metric"><span className="metric-lbl">Capital Growth (3yr)</span><span className="metric-val metric-up">↑ 59%</span></div>
            <div className="market-metric"><span className="metric-lbl">Gross Rental Yield</span><span className="metric-val">5.5 – 7.0%</span></div>
            <div className="market-metric"><span className="metric-lbl">Entry Point</span><span className="metric-val">From AED 1.8M</span></div>
            <div className="market-metric"><span className="metric-lbl">RealTerra Conviction</span><span className="metric-val">High</span></div>
          </div>
          <Link href="/contact" className="arrow-link" style={{ marginTop: '1.5rem' }}>Request area report</Link>
        </div>
      </div>

      {/* MARKET 5 */}
      <div className="market-full">
        <div className="market-img img-zoom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80&auto=format&fit=crop" alt="Business Bay" />
        </div>
        <div className="market-text reveal">
          <p className="market-location">Dubai</p>
          <h2 className="market-name">Business Bay</h2>
          <p className="market-desc">The nerve centre of new Dubai. Liquidity, density, and demand remain structurally robust — making Business Bay a portfolio anchor for investors who value stable yield with secondary market depth. Not the highest growth story on this page, but among the most reliable. We use it as a ballast in multi-asset portfolios.</p>
          <div className="market-metrics">
            <div className="market-metric"><span className="metric-lbl">Capital Growth (3yr)</span><span className="metric-val metric-up">↑ 38%</span></div>
            <div className="market-metric"><span className="metric-lbl">Gross Rental Yield</span><span className="metric-val">5.9 – 7.2%</span></div>
            <div className="market-metric"><span className="metric-lbl">Entry Point</span><span className="metric-val">From AED 900K</span></div>
            <div className="market-metric"><span className="metric-lbl">RealTerra Conviction</span><span className="metric-val">Moderate–High</span></div>
          </div>
          <Link href="/contact" className="arrow-link" style={{ marginTop: '1.5rem' }}>Request area report</Link>
        </div>
      </div>

      {/* MARKET 6 */}
      <div className="market-full">
        <div className="market-img img-zoom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200&q=80&auto=format&fit=crop" alt="Saadiyat Island" />
        </div>
        <div className="market-text reveal">
          <p className="market-location">Abu Dhabi</p>
          <h2 className="market-name">Saadiyat &amp; Yas Island</h2>
          <p className="market-desc">Abu Dhabi&apos;s cultural and leisure flagship. With the Louvre, the upcoming Guggenheim, and Formula 1 as permanent anchors, the case for capital appreciation here is institutional-grade. A market supported by government-linked developers, Abu Dhabi&apos;s own HNI relocation drive, and some of the most architecturally significant residential product in the GCC.</p>
          <div className="market-metrics">
            <div className="market-metric"><span className="metric-lbl">Capital Growth (3yr)</span><span className="metric-val metric-up">↑ 45%</span></div>
            <div className="market-metric"><span className="metric-lbl">Gross Rental Yield</span><span className="metric-val">6.0 – 7.5%</span></div>
            <div className="market-metric"><span className="metric-lbl">Entry Point</span><span className="metric-val">From AED 1.3M</span></div>
            <div className="market-metric"><span className="metric-lbl">RealTerra Conviction</span><span className="metric-val">High</span></div>
          </div>
          <Link href="/contact" className="arrow-link" style={{ marginTop: '1.5rem' }}>Request area report</Link>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="reveal">
          <p className="eyebrow">Request Research</p>
          <h2 style={{ color: 'var(--white)' }}>Get our full area reports<br />and market briefs.</h2>
        </div>
        <Link href="/contact" className="btn btn-outline-light reveal d1">Request Reports</Link>
      </div>
    </main>
  );
}
