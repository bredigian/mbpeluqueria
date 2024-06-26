'use client';

import {
  IoCalendarNumber,
  IoCalendarNumberOutline,
  IoMegaphone,
  IoMegaphoneOutline,
  IoTime,
  IoTimeOutline,
} from 'react-icons/io5';

import Image from 'next/image';
import Link from 'next/link';
import { LogoutDialog } from './navbar-dialog';
import { TRole } from '@/types/auth.types';
import logo from '@/assets/logo.jpg';
import { usePathname } from 'next/navigation';

type Props = {
  role: TRole;
};

export default function Navbar({ role }: Props) {
  const isAdmin = role === 'ADMIN';
  const pathname = usePathname();

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
          {pathname === '/dashboard/history' ? (
            <IoCalendarNumber size={24} />
          ) : (
            <IoCalendarNumberOutline size={24} />
          )}
          <small className='font-semibold'>Historial</small>
        </Link>
      ) : (
        <Link
          href={'/dashboard/hours'}
          className='flex w-32 flex-col items-center gap-2'
        >
          {pathname === '/dashboard/hours' ? (
            <IoTime size={24} />
          ) : (
            <IoTimeOutline size={24} />
          )}
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
          {pathname === '/dashboard/notices' ? (
            <IoMegaphone size={24} />
          ) : (
            <IoMegaphoneOutline size={24} />
          )}
          <small className='font-semibold'>Avisos</small>
        </Link>
      )}
    </nav>
  );
}
