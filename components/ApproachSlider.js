'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-pinned tile slider for the four pillars.
 *
 * The section sticks to the viewport while the page scrolls through it, and
 * each scrolled screenful advances one tile. It is driven by the container's
 * own scroll position rather than by a wheel handler: hijacking the wheel
 * breaks trackpad momentum, keyboard paging and every assistive technology
 * that scrolls by other means, and there is no way to get out of it if the
 * script mis-fires.
 *
 * Below the breakpoint — and whenever motion is reduced — the pin is dropped
 * entirely by CSS and the tiles render as a plain stacked list. That is the
 * fallback the markup is written for, so nothing depends on the effect
 * running.
 */
export default function ApproachSlider({ pillars, eyebrow, headline, subtext, media, children }) {
  const items = (pillars || []).filter(Boolean);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || items.length < 2) return;

    // The pin is a CSS concern; if it is not in effect (mobile, reduced
    // motion) there is no progress to track and no listener worth attaching.
    const pinned = () =>
      window.matchMedia('(min-width: 901px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!pinned()) return;
      const rect = el.getBoundingClientRect();
      // The panel inside sticks at `top: var(--nav-h)`, so the run starts
      // when the section's top reaches that line and ends when its bottom
      // does. Measuring against the raw viewport instead would offset every
      // tile change by the height of the nav.
      const navH = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 0;
      const travel = rect.height - (window.innerHeight - navH);
      if (travel <= 0) return;
      const progress = Math.min(Math.max((navH - rect.top) / travel, 0), 1);
      // `min` rather than a plain floor: at progress exactly 1 the floor
      // would index one past the last tile.
      setActive(Math.min(items.length - 1, Math.floor(progress * items.length)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items.length]);

  if (!items.length) return null;

  return (
    <section
      className="approach"
      ref={trackRef}
      /* The scroll runway: one screen per tile, plus one to read the last.
         Set inline because it depends on how many pillars the CMS holds. */
      style={{ '--approach-steps': items.length }}
    >
      <div className="approach-pin">
        {/* Rendered on the server and handed in, so next/image and the video
            element stay out of this client bundle. */}
        {media && <div className="approach-media">{media}</div>}
        <div className="approach-head">
          {eyebrow && <p className="eyebrow eyebrow-dark">{eyebrow}</p>}
          {headline && <h2>{headline}</h2>}
          {subtext && <p className="approach-sub">{subtext}</p>}
          <div className="approach-progress" aria-hidden="true">
            {items.map((label, i) => (
              <span
                key={`${label}-${i}`}
                className={`approach-dot${i === active ? ' on' : ''}`}
              />
            ))}
          </div>
          {children}
        </div>

        <ol
          className="approach-track"
          style={{ '--approach-active': active }}
        >
          {items.map((label, i) => (
            <li
              key={`${label}-${i}`}
              className={`approach-tile${i === active ? ' on' : ''}${i < active ? ' past' : ''}`}
              aria-current={i === active ? 'step' : undefined}
            >
              <span className="approach-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="approach-label">{label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
