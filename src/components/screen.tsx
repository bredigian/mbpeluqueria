'use client';

import { ReactNode, useEffect, useState } from 'react';
import { cn, verifyThemeByLocalStorage } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { IShift } from '@/types/shifts.types';
import { ReloadIcon } from '@radix-ui/react-icons';
import { connectWebsocket } from '@/lib/io';
import { revalidateDataByTag } from '@/lib/actions';
import { userStore } from '@/store/user.store';

type Props = {
  children: ReactNode;
  className?: string;
};
export default function Screen({ children, className }: Props) {
  const { name, role, verifySession } = userStore();

  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  const verify = async () => {
    const isHome = pathname === '/';
    setLoading(true);

    const token = Cookies.get('token');
    if (!token) {
      if (!isHome) push('/');
    } else {
      const authorized = await verifySession(token);
      if (!authorized) {
        Cookies.remove('token');
        if (!isHome) push('/');
      } else if (isHome) push('/dashboard');
    }

    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    verifyThemeByLocalStorage();
    verify();
  }, []);

  useEffect(() => {
    if (role === 'ADMIN') {
      const socket = connectWebsocket(name as string);
      if ('Notification' in window) Notification.requestPermission();

      socket.on('reserve-shift', async (data: IShift) => {
        if (Notification.permission === 'granted')
          new Notification('¡Te han reservado un turno! ✅💈', {
            body: `${data?.user?.name} ha reservado un turno para la fecha ${new Date(data.timestamp).toLocaleString('es-AR')}.`,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
          });
        revalidateDataByTag('notifications');
      });

      socket.on('cancel-shift', async (data: IShift) => {
        if (Notification.permission === 'granted')
          new Notification('¡Turno cancelado! ❌💈', {
            body: `${data?.user?.name} ha cancelado el turno de la fecha ${new Date(data.timestamp).toLocaleString('es-AR')}.`,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
          });
        revalidateDataByTag('notifications');
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [role]);

  if (loading)
    return (
      <main className='grid h-dvh w-full place-items-center'>
        <ReloadIcon className='h-8 w-8 animate-spin text-primary' />
      </main>
    );

  const navHeight = document.getElementById('navbar')?.offsetHeight;
  return (
    <main
      className={cn('w-full p-6', className)}
      style={{
        minHeight: pathname === '/' ? '100vh' : `calc(100vh - ${navHeight}px)`,
      }}
    >
      {children}
    </main>
  );
}
