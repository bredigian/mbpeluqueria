import { RedirectType, redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { PasswordResetForm } from '@/components/auth-form';
import { Subtitle } from '@/components/ui/subtitle';
import { TResponse } from '@/types/responses.types';
import logo from '@/assets/logo.jpg';
import { verifyToken } from '@/services/auth.service';

type Props = {
  searchParams: {
    token?: string;
  };
};

export default async function RecoverPage({ searchParams }: Props) {
  const token = searchParams.token;

  if (!token) redirect('/', RedirectType.push);

  const valid = (await verifyToken(token)) as TResponse;

  if (valid instanceof Error)
    return (
      <main className='flex h-dvh w-full flex-col items-center justify-center gap-4 p-6'>
        <span className='text-center text-xl font-semibold'>
          {valid.message}
        </span>
        <Button type='button'>
          <Link href={'/'}>Ir a Inicio</Link>
        </Button>
      </main>
    );

  return (
    <main className='flex w-full flex-col justify-center gap-6 p-6'>
      <header className='flex w-full items-center justify-between'>
        <Subtitle>Restauración de contraseña</Subtitle>
        <Image
          src={logo}
          alt='Logo de MB Peluquería'
          width={1000}
          height={1000}
          quality={100}
          className='h-auto w-24 rounded-full'
        />
      </header>
      <PasswordResetForm token={token} />
    </main>
  );
}
