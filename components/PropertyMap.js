/**
 * Google Map for a single property.
 *
 * Uses the keyless `output=embed` endpoint rather than the Embed API, so the
 * client can drop in a project without anyone having to provision, restrict
 * and pay for a Maps API key. The editor can either type a place name
 * (`mapQuery`) or paste a full embed URL from Google's own "Share → Embed a
 * map" dialog (`mapEmbedUrl`) when they want an exact pin.
 */

const ALLOWED_EMBED_HOSTS = new Set([
  'www.google.com',
  'maps.google.com',
  'www.google.ae',
  'google.com',
]);

// A pasted embed URL is rendered inside an iframe, so it is checked against
// Google's own hosts first — an arbitrary URL from the CMS must not become an
// arbitrary iframe on the site.
function safeEmbedUrl(raw) {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:') return null;
    if (!ALLOWED_EMBED_HOSTS.has(url.hostname)) return null;
    if (!/\/maps\b/.test(url.pathname) && !url.searchParams.has('q')) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * The card's location line doubles as a property-type line ("Dubailand ·
 * Waterfront Villas"), and the half after the separator only confuses the
 * geocoder, so only the first segment is used.
 */
export function mapQueryFor(project) {
  if (project?.mapQuery) return project.mapQuery;
  const area = String(project?.location || '').split('·')[0].trim();
  return [project?.name, area, 'UAE'].filter(Boolean).join(', ');
}

export default function PropertyMap({ project, title = 'Location' }) {
  const pasted = safeEmbedUrl(project?.mapEmbedUrl);
  const query = mapQueryFor(project);
  const src = pasted || `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=13&output=embed`;
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className="pd-map">
      <div className="pd-map-frame">
        <iframe
          src={src}
          title={`Map of ${project?.name || title}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="pd-map-foot">
        <span className="pd-map-pin">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
          {project?.location || query}
        </span>
        <a className="arrow-link" href={openUrl} target="_blank" rel="noreferrer">
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
