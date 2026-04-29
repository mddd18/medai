// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import { BottomNav } from '@/components/layout/BottomNav';
import { PWARegister } from '@/components/layout/PWARegister';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sog'lomBola AI · Pediatriya",
  description: 'AI bilan bola davolanishini boshqarish va D-Med integratsiyasi',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: "Sog'lomBola",
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FDF6EC',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <div className="mx-auto min-h-dvh max-w-[440px] pb-28">
          {children}
        </div>
        <BottomNav />
        <PWARegister />
      </body>
    </html>
  );
}
