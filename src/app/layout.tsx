import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'Kuwex Sales AI — 24/7 WhatsApp Sales Agent',
  description:
    'An in-house AI sales agent built by Kuwex Studios. It greets every WhatsApp prospect, qualifies the lead, generates a ticket, and notifies the team — automatically, around the clock.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://kuwex.co.zw'),
  icons: {
    icon: [{ url: '/logo.jpg', type: 'image/jpeg' }],
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'Kuwex Sales AI — 24/7 WhatsApp Sales Agent',
    description:
      'Your always-on AI sales agent on WhatsApp. Built in-house at Kuwex Studios.',
    images: ['/logo.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kuwex Sales AI',
    description: '24/7 WhatsApp sales agent built by Kuwex Studios.',
    images: ['/logo.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-black text-white antialiased font-sans selection:bg-accent/40 selection:text-white">
        {children}
      </body>
    </html>
  );
}
