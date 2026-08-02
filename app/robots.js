export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The CMS is behind a login, but there is no reason for it to appear
      // in search results either.
      disallow: ['/admin', '/api'],
    },
    sitemap: 'https://www.realterra.ae/sitemap.xml',
  };
}
