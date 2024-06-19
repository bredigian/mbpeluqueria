import Image from 'next/image';
import logo from '@/assets/logo.jpg';

export default function Navbar() {
  return (
    <header className='absolute bottom-0 w-full bg-primary-foreground/75 px-6 py-2 backdrop-blur-sm'>
      <nav className='flex w-full items-center justify-around'>
        <Image
          src={logo}
          alt='Logo de MB Peluquería'
          width={1000}
          height={1000}
          quality={100}
          className='h-auto w-20 -translate-y-10 self-center rounded-full'
        />
      </nav>
    </header>
  );
}
