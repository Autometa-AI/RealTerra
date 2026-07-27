import { Newsreader, Inter, IBM_Plex_Mono } from 'next/font/google';
import '../globals.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Dock from '../../components/Dock';
import Effects from '../../components/Effects';
import { getContent } from '../../lib/content';

// Content is DB-backed but pages render statically (cached, fast TTFB) —
// CMS saves explicitly invalidate the cache via revalidateTag/revalidatePath
// in /api/admin/save, so edits still show up immediately without giving up
// static performance the rest of the time.

/* Three faces, three jobs.
   Display — Newsreader.  Body & UI — Inter.  Data — IBM Plex Mono. */
const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
});

export async function generateMetadata() {
  const site = await getContent('site');
  return {
    metadataBase: new URL('https://realterra.ae'),
    title: {
      default: site.seo.titleDefault,
      template: '%s — RealTerra Global Properties',
    },
    description: site.seo.description,
    applicationName: 'RealTerra Global Properties',
    keywords: site.seo.keywords,
    openGraph: {
      title: site.seo.titleDefault,
      description: site.seo.description,
      siteName: 'RealTerra Global Properties',
      locale: 'en_AE',
      type: 'website',
      images: ['/images/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: site.seo.titleDefault,
      description: site.seo.description,
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  themeColor: '#0A2921',
};

export default async function RootLayout({ children }) {
  const site = await getContent('site');
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <Nav site={site} />
        {children}
        <Footer site={site} />
        <Dock site={site} />
        <Effects />
      </body>
    </html>
  );
}
