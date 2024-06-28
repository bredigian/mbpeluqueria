import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Avisos',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
