'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Nav({ site }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = site.nav.links;

  // Close on navigation — the drawer must never survive a route change.
  useEffect(() => setOpen(false), [pathname]);

  // Lock the page behind the drawer, and close it if the viewport grows
  // past the breakpoint where the desktop links come back.
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    if (!open) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mq = window.matchMedia('(min-width: 901px)');
    const onBreakpoint = (e) => {
      if (e.matches) setOpen(false);
    };

    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onBreakpoint);

    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onBreakpoint);
    };
  }, [open]);

  // Strip the lock if this ever unmounts while open.
  useEffect(() => () => document.body.classList.remove('nav-open'), []);

  return (
    <>
      <nav>
        {/* Wordmark only — the mark is the entire logo. */}
        <Link href="/" className="nav-logo" aria-label={`${site.nav.wordmark} — home`}>
          {site.nav.wordmark}
        </Link>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={pathname === l.href ? 'active' : undefined}
                aria-current={pathname === l.href ? 'page' : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="nav-cta">
          {site.nav.ctaLabel}
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-drawer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bars" aria-hidden="true"></span>
        </button>
      </nav>

      <div id="nav-drawer" className={`nav-drawer${open ? ' open' : ''}`}>
        <ul className="nav-drawer-links">
          {links.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={pathname === l.href ? 'active' : undefined}
                aria-current={pathname === l.href ? 'page' : undefined}
                tabIndex={open ? undefined : -1}
              >
                <span className="nav-drawer-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="nav-drawer-cta"
          tabIndex={open ? undefined : -1}
        >
          {site.nav.ctaLabel}
        </Link>

        <p className="nav-drawer-meta">
          {site.nav.drawerMetaLine1}
          <br />
          {site.nav.drawerMetaLine2}
        </p>
      </div>

      <div
        className={`nav-scrim${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      ></div>

      <div id="progress"></div>
    </>
  );
}
