// Shared helpers for the "an image slot can also hold a video" rule.
// Used by both the public site (to decide what tag to render) and the
// admin upload flow (to decide what a user is allowed to upload).

const VIDEO_RE = /\.(mp4|webm|mov|m4v|ogv)(\?|$)/i;
const GIF_RE = /\.gif(\?|$)/i;

export function isVideoSrc(src) {
  return typeof src === 'string' && VIDEO_RE.test(src);
}

export function isGifSrc(src) {
  return typeof src === 'string' && GIF_RE.test(src);
}

// Extension is derived from the MIME type rather than the original filename
// so a mislabelled upload can't smuggle in an arbitrary extension.
export const ALLOWED_UPLOAD_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/quicktime': 'mov',
  'application/pdf': 'pdf',
};

export const MEDIA_ACCEPT = 'image/*,video/mp4,video/webm,video/quicktime';
export const DOC_ACCEPT = 'application/pdf';

// Soft ceilings. Supabase's own per-file limit still applies on top.
export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
export const MAX_DOC_BYTES = 40 * 1024 * 1024;

export function limitForType(type) {
  if (type?.startsWith('video/')) return MAX_VIDEO_BYTES;
  if (type === 'application/pdf') return MAX_DOC_BYTES;
  return MAX_IMAGE_BYTES;
}

export function prettyBytes(n) {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(n / 1024)} KB`;
}
