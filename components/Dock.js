'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Sticky mobile action dock.
 *
 * Below 900px the nav CTA is gone, so the primary action would otherwise
 * live only at the very bottom of a long page. This pins it to the
 * viewport instead. It stays hidden until the hero has scrolled past, so
 * it never competes with the hero's own call to action.
 */
export default function Dock({ site }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const { dock } = site;

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 320);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);

  return (
    <div className={`dock${visible ? ' visible' : ''}`}>
      <div className="dock-mark">
        <div className="dock-mark-name">{dock.name}</div>
        <div className="dock-mark-meta">{dock.meta}</div>
      </div>
      <div className="dock-actions">
        <a
          className="dock-btn dock-btn-ghost"
          href={dock.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Message ${dock.name} on WhatsApp`}
        >
          {dock.whatsappLabel}
        </a>
        <Link className="dock-btn dock-btn-primary" href="/contact">
          {dock.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
