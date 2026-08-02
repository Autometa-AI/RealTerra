// Names and colours the site when someone saves it to a phone home screen,
// and gives Android the brand colour for the task switcher. Kept minimal —
// this is a marketing site, not an installable app.
export default function manifest() {
  return {
    name: 'RealTerra Global Properties',
    short_name: 'RealTerra',
    description:
      'An analytical brokerage for ultra-high-net-worth property investors in the UAE.',
    start_url: '/',
    display: 'browser',
    background_color: '#FAF9F6',
    theme_color: '#0A2921',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  };
}
