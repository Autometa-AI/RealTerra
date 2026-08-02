'use client';

import { useEffect, useRef } from 'react';

/**
 * The video half of <Media>.
 *
 * Autoplay is muted, looped and inline — the only combination browsers will
 * start without a tap. The one thing that needs JavaScript is honouring
 * "reduce motion": a silent looping background is exactly the kind of motion
 * that setting exists to stop, and there is no CSS that can pause a video.
 * The poster frame stays on screen in its place.
 */
export default function AutoVideo({ src, poster, alt, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (mq.matches) {
        el.pause();
        el.currentTime = 0;
      } else if (el.paused) {
        // play() rejects when the browser blocks autoplay; the poster stays
        // up in that case, which is the right fallback.
        el.play().catch(() => {});
      }
    };

    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    /* eslint-disable-next-line jsx-a11y/media-has-caption */
    <video
      ref={ref}
      className={className}
      style={style}
      src={src}
      poster={poster || undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt || undefined}
    />
  );
}
