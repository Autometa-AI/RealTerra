import Link from 'next/link';
import './not-found.css';

export const metadata = {
  title: 'Page not found',
};

/**
 * Lives inside the (site) group so it inherits the marketing layout, which
 * gives it the nav and footer for free. A root-level not-found.js would
 * need a root layout, and the layouts here belong to route groups.
 */
export default function NotFound() {
  return (
    <main className="page nf">
      <div className="nf-inner">
        <p className="nf-code">404</p>
        <h1>This page has moved, or never existed.</h1>
        <p className="nf-body">
          The link may be out of date. Everything below is a good place to pick up from.
        </p>
        <div className="nf-actions">
          <Link href="/" className="btn btn-dark">Back to home</Link>
          <Link href="/contact" className="arrow-link">Talk to us</Link>
        </div>
        <ul className="nf-links">
          <li><Link href="/markets">Markets</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/blogs">Blogs</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </div>
    </main>
  );
}
