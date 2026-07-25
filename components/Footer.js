import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo">RealTerra</div>
          <p className="footer-logo-sub">Global Properties</p>
          <p className="footer-tagline">
            An analytical brokerage for ultra-high-net-worth investors. Every
            asset, trajectory, and exit window — quantified before it&apos;s
            sold.
          </p>
        </div>
        <div>
          <p className="footer-col-title">Pages</p>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/markets">Markets</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Markets</p>
          <ul className="footer-links">
            <li><Link href="/markets">Al Marjan Island</Link></li>
            <li><Link href="/markets">Dubai South</Link></li>
            <li><Link href="/markets">Dubai Maritime City</Link></li>
            <li><Link href="/markets">Business Bay</Link></li>
            <li><Link href="/markets">Saadiyat Island</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Contact</p>
          <ul className="footer-links">
            <li><a href="mailto:hello@blackridgere.com">hello@blackridgere.com</a></li>
            <li><Link href="/contact">WhatsApp</Link></li>
            <li><Link href="/contact">Book a Call</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">
          © 2025 RealTerra Global Properties LLC. All rights reserved.
        </p>
        <p className="footer-rera">RERA Licensed · Dubai Land Department</p>
      </div>
    </footer>
  );
}
