import Media from './Media';

/**
 * Running slider of developer / partner logos, above the footer on every
 * page.
 *
 * A logo image is optional. Until the artwork arrives, an entry with a name
 * and no file renders as a wordmark tile — the band works from the day it
 * ships and each logo drops into the same slot through the CMS later, rather
 * than the whole section waiting on an asset handover.
 *
 * The track is duplicated so the loop has no seam; the copy is hidden from
 * assistive technology, which would otherwise read every partner twice.
 */
export default function PartnerLogos({ content }) {
  const items = (content?.items || []).filter((p) => p?.name || p?.logo);
  if (!items.length || content?.enabled === false) return null;

  const row = (ariaHidden) => (
    <ul className="partners-row" aria-hidden={ariaHidden || undefined}>
      {items.map((p, i) => {
        const inner = p.logo
          ? <Media src={p.logo} alt={p.name || ''} width={220} height={90} className="partner-logo-img" />
          : <span className="partner-wordmark">{p.name}</span>;
        return (
          <li className="partner-item" key={`${p.name}-${i}`}>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noreferrer" title={p.name}>{inner}</a>
            ) : inner}
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className="partners" aria-label={content?.title || 'Our developer partners'}>
      {content?.title && <p className="partners-title">{content.title}</p>}
      <div className="partners-marquee">
        <div className="partners-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
