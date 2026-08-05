'use client';

import { useEffect, useMemo, useState } from 'react';

/**
 * Contents rail beside a blog article, tracking where the reader is.
 *
 * The active entry is the last heading to have crossed the top of the
 * reading area, not simply whichever heading is on screen — with two
 * headings visible at once "whichever is intersecting" flickers between
 * them on every small scroll.
 *
 * Nothing here is required to read the article: without JavaScript the list
 * is still a set of working anchor links, which is why it is rendered as
 * plain links rather than as buttons.
 */
export default function ArticleToc({ headings, label = 'On this page' }) {
  const items = useMemo(() => headings || [], [headings]);
  const [active, setActive] = useState(items[0]?.id || '');
  // The prop is a fresh array on every render, so the effect keys off the
  // ids instead — otherwise it tears down and re-attaches its scroll
  // listener each time the active entry changes.
  const key = items.map((h) => h.id).join('|');

  useEffect(() => {
    if (items.length < 2) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // A heading counts as reached once it is in the top third of the
      // viewport — the band a reader is actually looking at.
      const line = window.innerHeight * 0.32;
      let current = items[0]?.id || '';
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (items.length < 2) return null;

  return (
    <nav className="article-toc" aria-label={label}>
      <p className="article-rail-title">{label}</p>
      <ol className="article-toc-list">
        {items.map(({ id, label: text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={id === active ? 'on' : undefined}
              aria-current={id === active ? 'true' : undefined}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
