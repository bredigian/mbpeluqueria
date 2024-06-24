import HistoryIcon from './icons/history-icon';
import Image from 'next/image';
import Link from 'next/link';
import { LogoutDialog } from './navbar-dialog';
import logo from '@/assets/logo.jpg';

export default function Navbar() {
  return (
    <nav className='sticky bottom-0 flex w-full items-center justify-evenly bg-primary-foreground/75 p-1 backdrop-blur-sm'>
      <Link
        href={'/dashboard/history'}
        className='flex w-32 flex-col items-center gap-2'
      >
        <HistoryIcon size={24} color='#171717' />
        <small className='font-semibold'>Historial</small>
      </Link>
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
      <LogoutDialog />
    </nav>
  );
}
