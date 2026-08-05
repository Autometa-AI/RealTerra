import Media from './Media';
import Lines from './Lines';

/**
 * The header every page except Home shares.
 *
 * These used to be a 50/50 split — copy in a coloured half, photo in the
 * other. Two things were wrong with that: a wide landscape photo squeezed
 * into a half-width column loses most of its width to the crop, and the two
 * halves read as a seam across the top of the page rather than as one
 * header. The photo now runs full-bleed with the copy laid over it, matching
 * the home hero, so every page opens the same way.
 *
 * Legibility comes from the scrim below, never from filtering the photo —
 * the image is the one thing a property buyer is actually looking at.
 */
export default function PageHero({ eyebrow, headline, subhead, image, poster, alt = '', children }) {
  return (
    <header className="page-hero">
      <div className="page-hero-media">
        <Media src={image} poster={poster} alt={alt} fill priority sizes="100vw" />
      </div>
      <div className="page-hero-inner">
        <div className="page-hero-copy">
          {eyebrow && <p className="eyebrow reveal">{eyebrow}</p>}
          {headline && <h1 className="reveal d1"><Lines text={headline} /></h1>}
          {subhead && <p className="page-hero-sub reveal d2">{subhead}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}
