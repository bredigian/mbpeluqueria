'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { ReloadIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { verifyToken } from '@/services/auth.service';

type Props = {
  children: ReactNode;
  className?: string;
};
export default function Screen({ children, className }: Props) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  const verify = async () => {
    const token = Cookies.get('token');
    if (!token) {
      if (pathname !== '/') push('/');
    } else {
      const authorized = await verifyToken(token);
      if (!authorized) {
        if (pathname !== '/') push('/');
      } else push('/dashboard');
    }
    setTimeout(() => {
      setLoading(false);
    }, 600);

    return;
  };

  useEffect(() => {
    verify();
  }, []);

  if (loading)
    return (
      <main className='grid h-dvh w-full place-items-center'>
        <ReloadIcon className='h-8 w-8 animate-spin text-primary' />
      </main>
    );

  return (
    <main className={cn('min-h-dvh w-full p-6', className)}>{children}</main>
  );
}
