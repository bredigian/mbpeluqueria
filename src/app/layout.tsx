import './globals.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'MB Peluquería',
  description: 'Reservá tu turno para cortarte el pelo acá mismo en instantes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background font-sans text-primary antialiased lg:flex-row',
          inter.variable,
        )}
      >
        {children}
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
