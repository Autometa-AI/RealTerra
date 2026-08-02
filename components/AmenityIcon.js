/**
 * Line icons for the amenity grid on a project page.
 *
 * The CMS stores amenities as free text ("Swimmable lagoons", "24-hour
 * security"), so the icon is derived from the label rather than picked by
 * the editor — one less thing to get wrong when adding a project, and old
 * entries pick up icons without a migration.
 *
 * MATCHERS is ordered and first-match-wins, so put the specific keywords
 * above the general ones: "water sports" has to be tested before "sports",
 * and "beach club" before "club".
 */

// Every icon draws on a 24×24 grid in currentColor, so the grid controls
// size and colour in one place.
const P = {
  pool: (
    <>
      <path d="M2 18.5c1.6 0 1.6 1.3 3.2 1.3S6.8 18.5 8.4 18.5s1.6 1.3 3.2 1.3S13.2 18.5 14.8 18.5s1.6 1.3 3.2 1.3S19.6 18.5 22 18.5" />
      <path d="M7.5 16.5V5.8A2.3 2.3 0 0 1 9.8 3.5h1.7" />
      <path d="M15.5 16.5V5.8a2.3 2.3 0 0 1 2.3-2.3h1.7" />
      <path d="M7.5 9.5h8M7.5 13.5h8" />
    </>
  ),
  waves: (
    <>
      <path d="M2 8c1.6 0 1.6 1.3 3.2 1.3S6.8 8 8.4 8s1.6 1.3 3.2 1.3S13.2 8 14.8 8s1.6 1.3 3.2 1.3S19.6 8 22 8" />
      <path d="M2 13c1.6 0 1.6 1.3 3.2 1.3S6.8 13 8.4 13s1.6 1.3 3.2 1.3S13.2 13 14.8 13s1.6 1.3 3.2 1.3S19.6 13 22 13" />
      <path d="M2 18c1.6 0 1.6 1.3 3.2 1.3S6.8 18 8.4 18s1.6 1.3 3.2 1.3S13.2 18 14.8 18s1.6 1.3 3.2 1.3S19.6 18 22 18" />
    </>
  ),
  beach: (
    <>
      <path d="M3 20c1.6 0 1.6 1.2 3.2 1.2S7.8 20 9.4 20s1.6 1.2 3.2 1.2S14.2 20 15.8 20s1.6 1.2 3.2 1.2" />
      <path d="M12.5 20V9" />
      <path d="M4 9a9 9 0 0 1 17 0Z" />
    </>
  ),
  gym: (
    <>
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6" />
      <path d="M7 12h10" />
    </>
  ),
  park: (
    <>
      <path d="M12 21v-4" />
      <path d="M12 2.5 6.5 10h11Z" />
      <path d="M12 8 5 17h14Z" />
    </>
  ),
  retail: (
    <>
      <path d="M4 8h16l-1.2 12H5.2Z" />
      <path d="M9 8.5V6.2a3 3 0 0 1 6 0v2.3" />
    </>
  ),
  security: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 8.2 7 9.5 4.1-1.3 7-5.2 7-9.5V6Z" />
      <path d="m9.2 11.8 2 2 3.6-3.8" />
    </>
  ),
  parking: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M10 16.5v-9h3.2a2.8 2.8 0 0 1 0 5.6H10" />
    </>
  ),
  concierge: (
    <>
      <path d="M3.5 17.5h17" />
      <path d="M5 14.5a7 7 0 0 1 14 0Z" />
      <path d="M12 7.5v-2" />
      <path d="M10.5 4.5h3" />
    </>
  ),
  spa: (
    <>
      <path d="M12 21c0-4.5 2.6-8 7-9-.4 5-3.2 8.4-7 9Z" />
      <path d="M12 21c0-4.5-2.6-8-7-9 .4 5 3.2 8.4 7 9Z" />
      <path d="M12 21c-1.6-3.4-1.6-7.6 0-11 1.6 3.4 1.6 7.6 0 11Z" />
    </>
  ),
  school: (
    <>
      <path d="m12 4 9 4.5-9 4.5-9-4.5Z" />
      <path d="M6.5 10.5V16c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-5.5" />
      <path d="M21 8.5V14" />
    </>
  ),
  sports: (
    <>
      <path d="M7 3h10v5.5a5 5 0 0 1-10 0Z" />
      <path d="M7 4.5H4v2a3.5 3.5 0 0 0 3 3.4M17 4.5h3v2a3.5 3.5 0 0 1-3 3.4" />
      <path d="M12 13.5V17" />
      <path d="M8.5 21h7l-1-4h-5Z" />
    </>
  ),
  cycling: (
    <>
      <circle cx="5.5" cy="17" r="3.5" />
      <circle cx="18.5" cy="17" r="3.5" />
      <path d="M8.5 17h4l3-8" />
      <path d="m12 9 3 8" />
      <path d="M13 9h4" />
      <circle cx="16.5" cy="4.5" r="1.4" />
    </>
  ),
  clubhouse: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M5 20.5V9.5L12 5l7 4.5v11" />
      <path d="M10 20.5v-6h4v6" />
    </>
  ),
  marina: (
    <>
      <path d="M12 8v13" />
      <circle cx="12" cy="5" r="2" />
      <path d="M8 11h8" />
      <path d="M4 14a8 8 0 0 0 16 0" />
      <path d="M4 14H6.5M20 14h-2.5" />
    </>
  ),
  cinema: (
    <>
      <rect x="2.5" y="6" width="19" height="13" rx="2" />
      <path d="M2.5 10.5h19" />
      <path d="M6.5 6 8 10.5M11.5 6 13 10.5M16.5 6 18 10.5" />
    </>
  ),
  dining: (
    <>
      <path d="M6.5 3v8a2.5 2.5 0 0 0 5 0V3" />
      <path d="M9 11v10" />
      <path d="M17.5 21V3c-2 1-3 3-3 6s1 4 3 4" />
    </>
  ),
  kids: (
    <>
      <circle cx="12" cy="7.5" r="4" />
      <path d="M12 11.5c-3.3 0-6 2.6-6 5.9v3.1h12v-3.1c0-3.3-2.7-5.9-6-5.9Z" />
      <path d="M10.5 6.8h.01M13.5 6.8h.01" />
    </>
  ),
  pet: (
    <>
      <ellipse cx="6" cy="10" rx="2" ry="2.6" />
      <ellipse cx="10.5" cy="7" rx="2" ry="2.8" />
      <ellipse cx="15.5" cy="7" rx="2" ry="2.8" />
      <ellipse cx="20" cy="10" rx="2" ry="2.6" />
      <path d="M13 12.5c-2.6 0-5 2-5 4.6 0 2 1.6 3 3.3 3 1.2 0 1.2-.6 1.7-.6s.5.6 1.7.6c1.7 0 3.3-1 3.3-3 0-2.6-2.4-4.6-5-4.6Z" />
    </>
  ),
  golf: (
    <>
      <path d="M9 21V3l9 4-9 4" />
      <path d="M6 21h8" />
      <circle cx="7" cy="18" r="1.6" />
    </>
  ),
  bbq: (
    <>
      <path d="M12 21c3.3 0 6-2.4 6-5.5 0-3.7-3-5.2-3.6-9.5-2 1.2-3.2 3-3.2 5 0 1.4-.9 2-1.6 1.2-.6-.7-.6-1.8-.6-1.8-1.9 1.6-3 3.6-3 5.1C6 18.6 8.7 21 12 21Z" />
    </>
  ),
  business: (
    <>
      <rect x="2.5" y="7" width="19" height="13" rx="2" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" />
      <path d="M2.5 12.5h19" />
    </>
  ),
  rooftop: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M12 2v1.6M12 12.4V14M18 8h-1.6M7.6 8H6M16.2 4.2l-1.1 1.1M8.9 10.7l-1.1 1.1M16.2 11.8l-1.1-1.1M8.9 5.3 7.8 4.2" />
      <path d="M3 21h18M5 21v-4h14v4" />
    </>
  ),
  promenade: (
    <>
      <path d="M4 20c3-1.5 4-4 4-7s1.5-5 4-5 4 2.2 4 5 1 5.5 4 7" />
      <path d="M4 20h16" />
      <circle cx="12" cy="4.5" r="1.6" />
    </>
  ),
  medical: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  prayer: (
    <>
      <path d="M4 21V11l8-7 8 7v10" />
      <path d="M9.5 21v-5a2.5 2.5 0 0 1 5 0v5" />
      <path d="M12 4V2" />
    </>
  ),
  ev: (
    <>
      <path d="m13.5 3-7 10H12l-1.5 8 7-10H11Z" />
    </>
  ),
  smart: (
    <>
      <path d="M2.5 9a14 14 0 0 1 19 0" />
      <path d="M5.5 12.5a10 10 0 0 1 13 0" />
      <path d="M8.5 16a6 6 0 0 1 7 0" />
      <path d="M12 19.5h.01" />
    </>
  ),
  valet: (
    <>
      <path d="M4 16.5h16" />
      <path d="M5.5 16.5v2M18.5 16.5v2" />
      <path d="M4 16.5v-3l1.8-4.6A2 2 0 0 1 7.7 7.5h8.6a2 2 0 0 1 1.9 1.4L20 13.5v3Z" />
      <path d="M6.5 13.5h11" />
    </>
  ),
  view: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  default: (
    <>
      <path d="m12 3 2.7 6 6.3.6-4.8 4.3 1.5 6.4L12 17l-5.7 3.3 1.5-6.4L3 9.6 9.3 9Z" />
    </>
  ),
};

// First match wins — order matters. Specific phrases sit above the words
// they contain.
const MATCHERS = [
  [/water\s?sport|\bsurf|kayak|paddle/, 'waves'],
  [/lagoon|canal|waterfront|water feature|wave pool/, 'waves'],
  [/beach|shore|\bsand\b/, 'beach'],
  [/pool|swim|jacuzzi/, 'pool'],
  [/gym|fitness|training|workout/, 'gym'],
  [/\bspas?\b|sauna|steam|wellness|yoga|massage/, 'spa'],
  [/security|guard|gated|cctv|surveillance/, 'security'],
  // Above the park icon: "valet parking" and "covered parking" must not read
  // as parkland.
  [/valet|car service|chauffeur/, 'valet'],
  [/parking|garage|basement/, 'parking'],
  [/\bparks?\b|parkland|garden|landscap|\bgreen\b|\blawn\b|nature/, 'park'],
  [/retail|shop|\bmalls?\b|boutique|\bstores?\b|supermarket|town cent/, 'retail'],
  [/concierge|reception|lobby|front desk|butler/, 'concierge'],
  [/school|nursery|education|academy|campus/, 'school'],
  [/cycl|bike|jog|running|track|trail/, 'cycling'],
  [/tennis|padel|basketball|\bcourts?\b|sport|pitch|football/, 'sports'],
  [/club|lounge|community cent|majlis|social/, 'clubhouse'],
  [/marina|yacht|berth|harbour|harbor|boat/, 'marina'],
  [/cinema|theatre|theater|screening|film/, 'cinema'],
  [/restaurant|dining|cafe|café|f&b|kitchen|\bbars?\b/, 'dining'],
  [/\bkids?\b|child|play|family|creche|crèche|toddler/, 'kids'],
  [/\bpets?\b|pet-friendly|\bdogs?\b/, 'pet'],
  [/golf/, 'golf'],
  [/bbq|barbecue|barbeque|grill|fire pit/, 'bbq'],
  [/business|co-?work|meeting|office|study|library/, 'business'],
  [/rooftop|\broof\b|\bsky\b|terrace|\bdecks?\b|\bsun\b/, 'rooftop'],
  [/promenade|boardwalk|boulevard|walkway|pedestrian/, 'promenade'],
  [/clinic|medical|health|hospital|pharmac/, 'medical'],
  [/mosque|prayer|masjid/, 'prayer'],
  [/ev charg|electric vehicle|charging/, 'ev'],
  [/smart home|wi-?fi|automation|high-?speed/, 'smart'],
  [/\bviews?\b|vista|skyline|panoram/, 'view'],
];

export function amenityIconKey(label) {
  const text = String(label || '').toLowerCase();
  for (const [re, key] of MATCHERS) {
    if (re.test(text)) return key;
  }
  return 'default';
}

export default function AmenityIcon({ label, className = 'amenity-icon' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {P[amenityIconKey(label)]}
    </svg>
  );
}
