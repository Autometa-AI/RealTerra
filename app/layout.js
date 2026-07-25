import { Newsreader, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Dock from '../components/Dock';
import Effects from '../components/Effects';

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

export const metadata = {
  metadataBase: new URL('https://realterra.ae'),
  title: {
    default: 'RealTerra Global Properties — Off-plan, quantified.',
    template: '%s — RealTerra Global Properties',
  },
  description:
    "An analytical brokerage for ultra-high-net-worth investors. Every asset, trajectory, and exit window — quantified before it's sold.",
  applicationName: 'RealTerra Global Properties',
  keywords: [
    'Dubai real estate',
    'UAE property investment',
    'off-plan Dubai',
    'UHNWI property advisory',
    'Al Marjan Island',
    'Dubai South',
  ],
  openGraph: {
    title: 'RealTerra Global Properties — Off-plan, quantified.',
    description:
      "An analytical brokerage for ultra-high-net-worth investors. Every asset, trajectory, and exit window — quantified before it's sold.",
    siteName: 'RealTerra Global Properties',
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RealTerra Global Properties — Off-plan, quantified.',
    description:
      'An analytical brokerage for ultra-high-net-worth investors.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  themeColor: '#0A2921',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
        <Dock />
        <Effects />
      </body>
    </html>
  );
}
