import HistoryIcon from './icons/history-icon';
import HoursIcon from './icons/hours-icon';
import Image from 'next/image';
import Link from 'next/link';
import { LogoutDialog } from './navbar-dialog';
import NoticesIcon from './icons/notices-icon';
import { TRole } from '@/types/auth.types';
import logo from '@/assets/logo.jpg';

type Props = {
  role: TRole;
};

export default function Navbar({ role }: Props) {
  const isAdmin = role === 'ADMIN';

  return (
    <nav
      id='navbar'
      className='sticky bottom-0 flex w-full items-center justify-evenly bg-primary-foreground/25 p-1 backdrop-blur-sm'
    >
      {!isAdmin ? (
        <Link
          href={'/dashboard/history'}
          className='flex w-32 flex-col items-center gap-2'
        >
          <HistoryIcon size={24} color='hsl(var(--primary))' />
          <small className='font-semibold'>Historial</small>
        </Link>
      ) : (
        <Link
          href={'/dashboard/hours'}
          className='flex w-32 flex-col items-center gap-2'
        >
          <HoursIcon size={24} color='hsl(var(--primary))' />
          <small className='font-semibold'>Horarios</small>
        </Link>
      )}
      <Link href={'/dashboard'}>
        <Image
          src={logo}
          alt='Logo de MB Peluquería'
          width={1000}
          height={1000}
          quality={100}
          className='h-auto w-20 -translate-y-8 self-center rounded-full'
        />
      </Link>
      {!isAdmin ? (
        <LogoutDialog />
      ) : (
        <Link
          href={'/dashboard/notices'}
          className='flex w-32 flex-col items-center gap-2'
        >
          <NoticesIcon size={24} color='hsl(var(--primary))' />
          <small className='font-semibold'>Avisos</small>
        </Link>
      )}
    </nav>
  );
}
