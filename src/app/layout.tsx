import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kuwex Studios — WhatsApp Commerce & Automation',
  description: 'Smart Digital Solutions for Africa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
