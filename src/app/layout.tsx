import './globals.css';

import type { Metadata, Viewport } from 'next';

import { GeistSans } from 'geist/font/sans';
import GoogleAnalytics from '@/components/google-analytics';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';

const APP_NAME = 'MB Peluquería';
const APP_DEFAULT_TITLE = 'MB Peluquería: Sistema de Turnos';
const APP_TITLE_TEMPLATE = '%s | MB Peluquería';
const APP_DESCRIPTION = 'Sistema de turnos para salón de peluquería.';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <GoogleAnalytics />
      <body
        className={cn(
          'dark flex min-h-screen flex-col bg-primary-foreground text-primary antialiased',
          GeistSans.className,
        )}
        id='body'
      >
        {children}
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
