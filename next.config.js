/** @type {import('next').NextConfig} */

let supabaseHostname = null;
try {
  if (process.env.SUPABASE_URL) {
    supabaseHostname = new URL(process.env.SUPABASE_URL).hostname;
  }
} catch {
  // ignore malformed URL — image remote pattern just won't be added
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: supabaseHostname
      ? [{ protocol: 'https', hostname: supabaseHostname, pathname: '/storage/v1/object/public/**' }]
      : [],
  },
};

module.exports = nextConfig;
