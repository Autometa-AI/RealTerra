import Link from 'next/link';
import './about.css';

export const metadata = {
  title: 'About',
};

export default function About() {
  return (
    <main className="page">
      <div className="about-hero">
        <div className="about-hero-left">
          <p className="eyebrow eyebrow-dark reveal">About RealTerra</p>
          <h1 className="reveal d1">Analytical<br />by Nature.<br />Soulful<br />by Design.</h1>
          <p className="reveal d2">A data-driven real estate advisory built for investors who require conviction, not conjecture.</p>
        </div>
        <div className="about-hero-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop" alt="Dubai skyline" />
        </div>
      </div>

      {/* PHILOSOPHY */}
      <div className="philosophy-full">
        <div className="reveal"><p className="eyebrow">Our Approach</p><h2>The RealTerra Methodology</h2></div>
        <div className="philosophy-full-grid">
          <div className="reveal d1">
            <p className="large">Most real estate decisions are made on instinct, relationships, and market noise. At RealTerra, we treat property selection the way a fund manager treats a position — with data, discipline, and a documented thesis.</p>
            <p style={{ marginTop: '1.2rem' }}>We map infrastructure pipelines, developer track records, population migration patterns, and rental yield trajectories before we recommend a single square foot.</p>
            <p style={{ marginTop: '1.2rem' }}>Numbers alone do not build wealth. Conviction, timing, and a practiced reading of where a market is heading — that is the dimension that separates RealTerra from a data screen.</p>
          </div>
          <div className="reveal d2">
            <div className="pillar-full"><span className="pillar-full-num">01</span><div><div className="pillar-full-title">Thesis-Driven Selection</div><p className="pillar-full-text">Every recommendation is supported by a documented investment thesis — macro trends, micro supply dynamics, and exit liquidity assessed before any commitment is made.</p></div></div>
            <div className="pillar-full"><span className="pillar-full-num">02</span><div><div className="pillar-full-title">Infrastructure Alpha</div><p className="pillar-full-text">We track UAE infrastructure approvals, zone reclassifications, and masterplan filings — often months before market pricing reflects the underlying shift.</p></div></div>
            <div className="pillar-full"><span className="pillar-full-num">03</span><div><div className="pillar-full-title">Developer Due Diligence</div><p className="pillar-full-text">Completion track records, escrow compliance, and handover quality ratings — assessed systematically. We know which developers deliver and which ones require caution.</p></div></div>
            <div className="pillar-full"><span className="pillar-full-num">04</span><div><div className="pillar-full-title">Portfolio Architecture</div><p className="pillar-full-text">We build exposure across yield assets, capital growth plays, and off-plan positions — balancing risk with the discipline of a private wealth mandate, not a sales target.</p></div></div>
          </div>
        </div>
      </div>

      {/* FOUNDERS */}
      <div className="founders-section">
        <div className="reveal" style={{ marginBottom: '4rem' }}><p className="eyebrow">Leadership</p><h2>Our Founders</h2></div>

        {/* GAURAV */}
        <div className="founder-full">
          <div className="founder-full-img reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop" alt="Gaurav Sabhachandani" />
          </div>
          <div className="founder-full-text reveal d1">
            <p className="founder-role-tag">Managing Director</p>
            <h2 className="founder-full-name">Gaurav<br />Sabhachandani</h2>
            <div className="founder-full-bio">
              <p>Gaurav Sabhachandani brings to RealTerra a professional foundation that is, by any measure, uncommon. Born into a family for whom real estate investment was a core discipline rather than a peripheral interest, he was exposed to asset selection, portfolio structuring, and capital allocation as foundational concepts long before most practitioners encounter them formally.</p>
              <p>He pursued investment training systematically from an early age, consolidating a broad base of market knowledge spanning acquisition strategy, rental yield analysis, off-plan risk assessment, and portfolio construction. Over the years that followed, he extended this foundation into independent advisory practice, working with high-net-worth individuals and families across the GCC to structure UAE property exposure aligned with their specific financial objectives.</p>
              <p>At RealTerra, Gaurav functions as the analytical backbone of the firm — responsible for market thesis development, developer evaluation, and the data infrastructure that underpins every client recommendation. His approach is defined by methodical rigour and a consistent emphasis on fundamentals over market sentiment.</p>
            </div>
            <div className="founder-capabilities">
              <div className="cap-row"><span className="cap-label">Investment Strategy &amp; Portfolio Architecture</span></div>
              <div className="cap-row"><span className="cap-label">GCC Real Estate Market Intelligence</span></div>
              <div className="cap-row"><span className="cap-label">HNI &amp; UHNI Capital Advisory</span></div>
              <div className="cap-row"><span className="cap-label">Developer &amp; Risk Due Diligence</span></div>
            </div>
          </div>
        </div>

        {/* RUCHIKA */}
        <div className="founder-full">
          <div className="founder-full-text founder-full-text reversed reveal">
            <p className="founder-role-tag">Chief Executive Officer</p>
            <h2 className="founder-full-name">Ruchika<br />Malhotra</h2>
            <div className="founder-full-bio">
              <p>Ruchika Malhotra is a professional whose career is defined by an ability to operate at the intersection of aesthetic intelligence and commercial performance. As Mrs. India Worldwide 2022, and as the founder and creative director of a successful luxury fashion label spanning fifteen years, she built a comprehensive understanding of how high-net-worth individuals make decisions — what they value, what they respond to, and what they require from those they trust with significant transactions.</p>
              <p>Her transition into ultra-luxury real estate was deliberate. The capabilities that underpin exceptional performance in high fashion — client discretion, a trained eye for quality, the ability to connect a vision to a tangible outcome — translate directly to property advisory at the top of the market. Clients at this level are not acquiring square footage. They are acquiring a considered expression of how they intend to live.</p>
              <p>Ruchika has since established herself as one of the UAE&apos;s most consistently high-performing agents, with a transaction record spanning ultra-luxury villas, penthouses, and premium residences across Binghatti, DAMAC, Emaar, and other Tier-1 developers. As CEO of RealTerra, she leads client relationships, sales execution, and the developer network that gives the firm its market access.</p>
            </div>
            <div className="founder-capabilities">
              <div className="cap-row"><span className="cap-label">Ultra-Luxury Villas &amp; Penthouse Advisory</span></div>
              <div className="cap-row"><span className="cap-label">High-Net-Worth Client Relationship Management</span></div>
              <div className="cap-row"><span className="cap-label">Tier-1 Developer Network Access</span></div>
              <div className="cap-row"><span className="cap-label">Luxury Residential Market Expertise</span></div>
            </div>
          </div>
          <div className="founder-full-img founder-full-img reversed reveal d1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop" alt="Ruchika Malhotra" />
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="section">
        <div className="reveal" style={{ marginBottom: '3rem' }}><p className="eyebrow">What We Do</p><h2>Our Services</h2></div>
        <div className="services-grid-about reveal d1">
          <div className="service-item"><div className="service-num">01</div><div className="service-title-about">Investment Advisory</div><p className="service-desc-about">End-to-end strategy for HNI and UHNI clients — from market entry thesis to portfolio construction, developer selection, and exit planning.</p></div>
          <div className="service-item"><div className="service-num">02</div><div className="service-title-about">Research &amp; Market Reports</div><p className="service-desc-about">Proprietary area reports, developer scorecards, and quarterly market intelligence briefings available to qualified investors and family offices.</p></div>
          <div className="service-item"><div className="service-num">03</div><div className="service-title-about">Ultra-Luxury Sales</div><p className="service-desc-about">White-glove acquisition and disposition across Dubai, Abu Dhabi, and RAK. Discretion guaranteed. Off-market access available to network clients.</p></div>
          <div className="service-item"><div className="service-num">04</div><div className="service-title-about">Off-Plan Curation</div><p className="service-desc-about">Every major off-plan launch pre-screened against completion risk, yield floor, and growth thesis. Clients receive only what passes.</p></div>
          <div className="service-item"><div className="service-num">05</div><div className="service-title-about">Portfolio Review</div><p className="service-desc-about">A structured audit of existing UAE property exposure — yield optimisation, strategic reallocation, and repositioning recommendations.</p></div>
          <div className="service-item"><div className="service-num">06</div><div className="service-title-about">Family Office Services</div><p className="service-desc-about">Multi-generational real estate capital management, UAE residency structuring, and multi-jurisdiction tax efficiency advisory.</p></div>
        </div>
      </div>

      <div className="cta-band">
        <div className="reveal"><p className="eyebrow eyebrow-dark">Work with us</p><h2 style={{ color: 'var(--white)' }}>The first conversation<br />is always free.</h2></div>
        <Link href="/contact" className="btn btn-outline-light reveal d1">Book an Introductory Call</Link>
      </div>
    </main>
  );
}
