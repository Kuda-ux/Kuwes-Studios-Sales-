import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'Kuwex Studios — Smart Digital Solutions for Africa',
  description:
    'We build websites, brands, AI automations and WhatsApp commerce systems that help African businesses scale. Talk to us on WhatsApp in under 60 seconds.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://kuwex.co.zw'),
  icons: {
    icon: [{ url: '/logo.jpg', type: 'image/jpeg' }],
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'Kuwex Studios — Smart Digital Solutions for Africa',
    description:
      'Websites, branding, AI automation and WhatsApp commerce systems built for African businesses.',
    images: ['/logo.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kuwex Studios',
    description: 'Smart Digital Solutions for Africa.',
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
