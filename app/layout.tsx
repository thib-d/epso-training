import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const siteUrl = 'https://cap-ad8.thibault-daccord.chatgpt.site';
const title = 'Cap EPSO — Tests de raisonnement';
const description = '100 questions bilingues pour préparer les tests de raisonnement verbal, numérique et abstrait EPSO.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, url: siteUrl, siteName: 'Cap EPSO', images: [{ url: '/og.png', width: 1200, height: 630 }], locale: 'fr_FR', type: 'website' },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body className={geist.variable}>{children}</body></html>;
}
