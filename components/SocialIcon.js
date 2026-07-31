// Inline SVG glyphs so the footer icons need no icon library and no
// network request. Each path is drawn on a 24x24 grid.

const PATHS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="17" />
      <circle cx="7.5" cy="7" r="1.1" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-3.6a2.4 2.4 0 0 1 4.8 0V17" />
      <line x1="11.5" y1="10.5" x2="11.5" y2="17" />
    </>
  ),
  facebook: <path d="M14.5 8.5h2V5.6h-2.2c-2 0-3.3 1.3-3.3 3.4v1.7H9v2.9h2v7.4h3v-7.4h2.2l.4-2.9H14v-1.3c0-.6.2-.9.5-.9Z" />,
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10.5 9.5v5l4.2-2.5Z" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: <path d="M14 3.5v10.2a3.1 3.1 0 1 1-2.6-3.05M14 3.5c.3 2.2 1.7 3.6 3.9 3.8" />,
  x: (
    <>
      <path d="M4 4l7.6 9.4L4.4 20" />
      <path d="M20 20l-7.6-9.4L19.6 4" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20 12a8 8 0 0 1-11.9 7L4 20l1.1-3.9A8 8 0 1 1 20 12Z" />
      <path d="M9.2 9c.3 0 .5.4.7.9.2.5.3.7.1 1-.2.3-.5.4-.3.9.3.6 1.4 1.7 2.2 2 .5.2.7-.1.9-.3.3-.2.6-.1 1 .1.5.2.9.4.9.7 0 .8-.9 1.2-1.6 1.1-1.6-.2-4.4-2.8-4.6-4.4-.1-.7.2-1.6 1-1.7Z" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function SocialIcon({ platform, size = 17 }) {
  const key = String(platform || '').toLowerCase().replace(/[^a-z]/g, '');
  const glyph = PATHS[key];
  if (!glyph) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {glyph}
    </svg>
  );
}
