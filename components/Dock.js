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
export default function Dock() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 320);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);

  return (
    <div className={`dock${visible ? ' visible' : ''}`}>
      <div className="dock-mark">
        <div className="dock-mark-name">RealTerra</div>
        <div className="dock-mark-meta">Dubai · UHNWI Advisory</div>
      </div>
      <div className="dock-actions">
        <a
          className="dock-btn dock-btn-ghost"
          href="https://wa.me/971500000000"
          target="_blank"
          rel="noreferrer"
          aria-label="Message RealTerra on WhatsApp"
        >
          WhatsApp
        </a>
        <Link className="dock-btn dock-btn-primary" href="/contact">
          Request Access
        </Link>
      </div>
    </div>
  );
}
