'use client';

import { useCallback, useEffect, useState } from 'react';
import Media from './Media';

/**
 * Project gallery with a lightbox.
 *
 * The grid renders as plain media even before hydration — only the enlarge
 * behaviour needs JavaScript — so a slow connection still sees every photo.
 * Keyboard handling mirrors the nav drawer: Escape closes, arrows step.
 */
export default function ProjectGallery({ items, projectName }) {
  const [index, setIndex] = useState(null);
  const open = index !== null;
  const count = items.length;

  const step = useCallback(
    (delta) => setIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count]
  );

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    if (!open) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  // Strip the scroll lock if this unmounts while the lightbox is open.
  useEffect(() => () => document.body.classList.remove('nav-open'), []);

  if (!count) return null;

  return (
    <>
      <div className="pd-gallery">
        {items.map((src, i) => (
          <button
            type="button"
            className="pd-gallery-item"
            key={`${src}-${i}`}
            onClick={() => setIndex(i)}
            aria-label={`Enlarge image ${i + 1} of ${count}`}
          >
            <Media
              src={src}
              alt={`${projectName}, image ${i + 1}`}
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
            />
            <span className="pd-gallery-zoom" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="11" cy="11" r="7" />
                <path d="M16.2 16.2 21 21M11 8.4v5.2M8.4 11h5.2" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div className="pd-lightbox" role="dialog" aria-modal="true" aria-label={`${projectName} gallery`}>
          <div className="pd-lightbox-scrim" onClick={() => setIndex(null)} aria-hidden="true"></div>

          <button type="button" className="pd-lightbox-close" onClick={() => setIndex(null)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>

          <figure className="pd-lightbox-figure">
            <Media
              src={items[index]}
              alt={`${projectName}, image ${index + 1}`}
              width={1800}
              height={1200}
              sizes="100vw"
              priority
            />
            <figcaption>{index + 1} / {count}</figcaption>
          </figure>

          {count > 1 && (
            <>
              <button type="button" className="pd-lightbox-nav prev" onClick={() => step(-1)} aria-label="Previous image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M15 5 8 12l7 7" />
                </svg>
              </button>
              <button type="button" className="pd-lightbox-nav next" onClick={() => step(1)} aria-label="Next image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="m9 5 7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
