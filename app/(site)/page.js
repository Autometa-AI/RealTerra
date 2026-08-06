import Link from 'next/link';
import './home.css';
import Media from '../../components/Media';
import Reviews from '../../components/Reviews';
import Faq from '../../components/Faq';
import Lines from '../../components/Lines';
import HeroSearch from '../../components/HeroSearch';
import ApproachSlider from '../../components/ApproachSlider';
import { getContent } from '../../lib/content';
import { marketHref } from '../../lib/site';
import { uniqueSlugs } from '../../lib/slug';

export default async function Home() {
  const c = await getContent('home');

  // The preview cards are authored on the home page but the articles live on
  // the blogs page, so match them up by title and link the card at the piece
  // it is advertising. A card whose title has no article falls back to the
  // index rather than 404-ing.
  // The hero search reads the real catalogue, so a visitor who types a
  // development name is offered that development rather than a blank box.
  const projectsContent = await getContent('projects');
  const projects = (projectsContent.projects || []).filter((p) => p?.name);

  const blogs = await getContent('blogs');
  const posts = [blogs.featured, ...(blogs.posts || [])].filter((p) => p?.title);
  const postSlugs = uniqueSlugs(posts);
  const blogHref = (title) => {
    const i = posts.findIndex((p) => p.title?.trim() === String(title || '').trim());
    return i === -1 ? '/blogs' : `/blogs/${postSlugs[i]}`;
  };

  return (
    <main className="page">
      {/* HERO — full-bleed background with the copy overlaid, so a wide
          landscape image is never squeezed into a half-width column. */}
      <div className="hero">
        <div className="hero-media">
          {/* The poster only applies when the slot holds a video — it covers
              the black frame browsers show while the file buffers. */}
          <Media src={c.hero.image} poster={c.hero.poster} alt="" fill priority sizes="100vw" />
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-label reveal">
              <span className="hero-label-line"></span>
              <span>{c.hero.eyebrow}</span>
            </div>
            <h1 className="reveal d1"><Lines text={c.hero.headline} /></h1>
            <p className="hero-sub reveal d2">{c.hero.subhead}</p>
            {/* Search first, buttons under it: the first thing most visitors
                arrive wanting is a specific development or area. */}
            {/* hero-search-slot lifts this above the buttons below it: the
                reveal wrappers each set `filter`, which makes every one of
                them a stacking context, so DOM order alone decided what the
                results list was drawn under. */}
            <div className="reveal d3 hero-search-slot">
              {/* The catalogue is handed in so the box can show matches as
                  they are typed. It is a few dozen entries and already on the
                  page as JSON — nothing to fetch. */}
              <HeroSearch
                placeholder={c.hero.searchPlaceholder}
                buttonLabel={c.hero.searchButtonLabel}
                projects={projects}
              />
            </div>
            <div className="hero-actions reveal d4">
              <Link href="/markets" className="btn btn-light">{c.hero.ctaPrimary}</Link>
              <Link href="/blogs" className="arrow-link arrow-link-light">{c.hero.ctaSecondary}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[...c.marquee, ...c.marquee].map((item, i) => (
            <span className="marquee-cell" key={i}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-item dot" aria-hidden="true">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* INTRO */}
      <div className="intro-strip">
        <div className="reveal">
          <p className="eyebrow">{c.philosophyIntro.eyebrow}</p>
          <h2><Lines text={c.philosophyIntro.headline} /></h2>
        </div>
        <div className="reveal d1">
          <p className="large">{c.philosophyIntro.body}</p>
          <div style={{ marginTop: '2rem' }}><Link href="/about" className="arrow-link">{c.philosophyIntro.linkLabel}</Link></div>
        </div>
      </div>

      {/* PHILOSOPHY — the four pillars advance one at a time while the
          section stays pinned to the screen. */}
      <ApproachSlider
        eyebrow={c.philosophyPanel.eyebrow}
        headline={c.philosophyPanel.headline}
        subtext={c.philosophyPanel.subtext}
        pillars={c.philosophyPanel.pillars}
        media={<Media src={c.philosophyPanel.image} alt="" fill sizes="100vw" />}
      >
        <Link href="/about" className="arrow-link arrow-link-light approach-link">
          {c.philosophyPanel.linkLabel}
        </Link>
      </ApproachSlider>

      {/* AREAS */}
      <div className="areas-preview">
        <div className="areas-preview-header reveal">
          <div><p className="eyebrow">{c.focusMarkets.eyebrow}</p><h2>{c.focusMarkets.headline}</h2></div>
          <Link href="/markets" className="arrow-link">{c.focusMarkets.linkLabel}</Link>
        </div>
        {/* The whole tile is the link — it was a dead card before, which is
            not what a grid of photographed markets reads as. It lands on the
            matching write-up on the Markets page rather than the top of it. */}
        <div className="areas-grid-home">
          {c.focusMarkets.cards.map((card, i) => (
            <Link
              href={marketHref(card.name)}
              className={`area-card-home reveal${i ? ` d${i}` : ''}`}
              key={`${card.name}-${i}`}
            >
              <div className="area-img img-zoom">
                <Media src={card.image} alt={card.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="area-body">
                <div className="tag">{card.tag}</div>
                <div className="area-name">{card.name}</div>
                <div className="area-sub">{card.description}</div>
                <div className="area-pill"><span className="area-pill-dot"></span>{card.yield}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FOUNDERS STRIP */}
      <div className="founders-strip">
        <div className="founder-strip-img">
          <Media src={c.foundersStrip.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="founder-strip-text">
          <p className="eyebrow reveal">{c.foundersStrip.eyebrow}</p>
          <h2 className="reveal d1"><Lines text={c.foundersStrip.headline} /></h2>
          <p className="reveal d2">{c.foundersStrip.body}</p>
          <Link href="/about" className="arrow-link reveal d3">{c.foundersStrip.linkLabel}</Link>
        </div>
      </div>

      {/* BLOGS PREVIEW */}
      <div className="insight-preview">
        <div className="insight-preview-header reveal">
          <div><p className="eyebrow">{c.blogsPreview.eyebrow}</p><h2>{c.blogsPreview.headline}</h2></div>
          <Link href="/blogs" className="arrow-link">{c.blogsPreview.linkLabel}</Link>
        </div>
        <div className="insight-cards-row">
          {c.blogsPreview.cards.map((card, i) => (
            <Link
              href={blogHref(card.title)}
              className={`insight-card-home reveal${i % 3 ? ` d${i % 3}` : ''}`}
              key={`${card.title}-${i}`}
            >
              <div className="insight-img img-zoom">
                <Media src={card.image} alt={card.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="insight-body">
                <div className="tag">{card.tag}</div>
                <div className="insight-title-home">{card.title}</div>
                <div className="insight-meta">{card.meta}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Faq content={c.faq} />
      <Reviews content={c.reviews} />

      {/* CTA */}
      <div className="cta-band">
        <div className="reveal">
          <p className="eyebrow eyebrow-dark">{c.closingCta.eyebrow}</p>
          <h2 style={{ color: 'var(--white)' }}><Lines text={c.closingCta.headline} /></h2>
        </div>
        <div className="reveal d1"><Link href="/contact" className="btn btn-outline-light">{c.closingCta.buttonLabel}</Link></div>
      </div>
    </main>
  );
}
