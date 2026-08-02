import Image from 'next/image';
import AutoVideo from './AutoVideo';
import { isVideoSrc, isGifSrc } from '../lib/media';

/**
 * Renders whatever the CMS put in a media slot.
 *
 * Every image slot in the CMS also accepts a video or a GIF, so the site
 * can't assume an <img>. Video playback lives in <AutoVideo> because it needs
 * a client component to honour "reduce motion"; this stays a server component
 * so the far more common image case ships no JavaScript.
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
    return <AutoVideo src={src} poster={poster} alt={alt} className={className} style={style} />;
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
