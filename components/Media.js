import Image from 'next/image';
import { isVideoSrc, isGifSrc } from '../lib/media';

/**
 * Renders whatever the CMS put in a media slot.
 *
 * Every image slot in the CMS also accepts a video or a GIF, so the site
 * can't assume an <img>. Videos autoplay muted, looped and inline, which
 * is the only combination browsers allow to start without a tap.
 *
 * Sizing is left entirely to the container's CSS (the callers all use
 * aspect-ratio boxes), so both branches just fill their parent.
 */
export default function Media({
  src,
  alt = '',
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  className,
  style,
  poster,
}) {
  if (!src) return null;

  if (isVideoSrc(src)) {
    return (
      <video
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

  const common = {
    src,
    alt,
    className,
    style,
    sizes,
    priority,
    // next/image re-encodes GIFs into a still frame, so animated GIFs have
    // to bypass the optimizer to keep moving.
    unoptimized: isGifSrc(src),
  };

  if (fill) return <Image {...common} fill />;
  return <Image {...common} width={width || 1600} height={height || 1000} />;
}
