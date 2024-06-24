import Image from 'next/image';
import Screen from '@/components/screen';
import { SigninForm } from '@/components/auth-form';
import { Subtitle } from '@/components/ui/subtitle';
import logo from '@/assets/logo.jpg';

export default function Home() {
  return (
    <Screen className='flex flex-col items-center justify-center gap-14'>
      <Image
        src={logo}
        alt='Logo de MB Peluquería'
        width={1000}
        height={1000}
        quality={100}
        className='h-auto w-44 rounded-full'
      />
      <Subtitle>Autenticación</Subtitle>
      <SigninForm />
    </Screen>
  );
}
