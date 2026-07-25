import './contact.css';

export const metadata = {
  title: 'Contact',
};

export default function Contact() {
  return (
    <main className="page">
      {/* HERO */}
      <div className="contact-hero page-hero-split">
        <div className="page-hero-split-left dark">
          <p className="eyebrow reveal" style={{ color: 'var(--text-2)' }}>Get in Touch</p>
          <h1 className="reveal d1">Begin the<br />Conversation</h1>
          <p className="reveal d2" style={{ maxWidth: '360px', marginTop: '1rem' }}>The first meeting with RealTerra is always a listening exercise. We understand your goals before we say a word about properties.</p>
          <div className="contact-hero-details reveal d3">
            <div>
              <div className="contact-hero-detail-label">Email</div>
              <div className="contact-hero-detail-val"><a href="mailto:hello@blackridgere.com">hello@blackridgere.com</a></div>
            </div>
            <div>
              <div className="contact-hero-detail-label">WhatsApp</div>
              <div className="contact-hero-detail-val"><a href="https://wa.me/971500000000">+971 50 000 0000</a></div>
            </div>
            <div>
              <div className="contact-hero-detail-label">Location</div>
              <div className="contact-hero-detail-val">Dubai, UAE · By appointment</div>
            </div>
          </div>
        </div>
        <div className="page-hero-split-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop" alt="RealTerra office Dubai" />
        </div>
      </div>

      {/* MAIN */}
      <div className="contact-main">
        {/* INFO PANEL */}
        <div className="contact-info-panel">
          <div className="contact-detail reveal">
            <p className="contact-detail-label">Office</p>
            <p className="contact-detail-val">Dubai, UAE</p>
            <p className="contact-detail-sub">By appointment</p>
          </div>

          <div className="contact-detail reveal d1">
            <p className="contact-detail-label">Email</p>
            <p className="contact-detail-val"><a href="mailto:hello@blackridgere.com" style={{ color: 'var(--text-1)' }}>hello@blackridgere.com</a></p>
            <p className="contact-detail-sub">Replies within 24 hours</p>
          </div>

          <div className="contact-detail reveal d2">
            <p className="contact-detail-label">WhatsApp</p>
            <p className="contact-detail-val">+971 50 000 0000</p>
            <a href="https://wa.me/971500000000" className="whatsapp-btn" target="_blank" rel="noreferrer">
              <span className="whatsapp-icon">✓</span> Message on WhatsApp
            </a>
          </div>

          <div className="contact-detail reveal d3">
            <p className="contact-detail-label">Managing Director</p>
            <p className="contact-detail-val">Gaurav Sabhachandani</p>
            <p className="contact-detail-sub">Investment advisory &amp; portfolio structuring</p>
          </div>

          <div className="contact-detail reveal d3">
            <p className="contact-detail-label">CEO</p>
            <p className="contact-detail-val">Ruchika Malhotra</p>
            <p className="contact-detail-sub">Ultra-luxury sales &amp; developer relationships</p>
          </div>

          <div className="contact-detail reveal">
            <p className="contact-detail-label">Licensed By</p>
            <p className="contact-detail-val">Dubai Land Department</p>
            <p className="contact-detail-sub">RERA Registered · UAE</p>
          </div>
        </div>

        {/* FORM PANEL */}
        <div className="contact-form-panel">
          <h2 className="reveal">Send an Enquiry</h2>
          <p className="reveal d1">Tell us about your investment goals or the property you&apos;re looking for. We&apos;ll come back to you with a considered response — not a sales call.</p>

          <div className="reveal d2">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" placeholder="Your first name" />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" placeholder="Your last name" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone / WhatsApp</label>
              <input type="tel" className="form-input" placeholder="+971 …" />
            </div>
            <div className="form-group">
              <label className="form-label">I am interested in</label>
              <select className="form-select" defaultValue="">
                <option value="" disabled>Select an interest</option>
                <option>Investment Advisory</option>
                <option>Specific Off-Plan Project</option>
                <option>Ultra-Luxury Acquisition</option>
                <option>Market Research Report</option>
                <option>Portfolio Review</option>
                <option>Family Office Services</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Approximate Budget (AED)</label>
              <select className="form-select" defaultValue="">
                <option value="" disabled>Select a range</option>
                <option>Under AED 1M</option>
                <option>AED 1M – 3M</option>
                <option>AED 3M – 10M</option>
                <option>AED 10M – 30M</option>
                <option>AED 30M+</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Your Message</label>
              <textarea className="form-textarea" placeholder="Tell us about your investment goals, timeline, or any specific properties or areas you're interested in…"></textarea>
            </div>
            <button className="form-submit">Send Enquiry →</button>
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="map-area">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&q=70&auto=format&fit=crop" alt="Dubai aerial view" />
        <div className="map-overlay">
          <div className="map-pin">RealTerra · Dubai, UAE</div>
        </div>
      </div>
    </main>
  );
}
