import AuthTabs from '@/components/auth-tabs';
import Image from 'next/image';
import Screen from '@/components/screen';
import logo from '@/assets/logo.jpg';

export default function Home() {
  return (
    <Screen className='flex flex-col items-center justify-center gap-6'>
      <Image
        src={logo}
        alt='Logo de MB Peluquería'
        width={1000}
        height={1000}
        quality={100}
        className='h-auto w-32 rounded-full'
      />
      <span className='text-xl font-semibold'>Sistema de Turnos</span>
      <AuthTabs />
    </Screen>
  );
}
