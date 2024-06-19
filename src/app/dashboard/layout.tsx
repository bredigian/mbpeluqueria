import '@/app/globals.css';

import type { Metadata } from 'next';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'MB Peluquería',
  description: 'Reservá tu turno para cortarte el pelo acá mismo en instantes.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
