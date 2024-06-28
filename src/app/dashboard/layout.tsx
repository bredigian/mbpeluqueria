import '@/app/globals.css';

import { IAuthorization, TRole } from '@/types/auth.types';
import { RedirectType, redirect } from 'next/navigation';

import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { verifyToken } from '@/services/auth.service';

const APP_DEFAULT_TITLE = 'Inicio';
const APP_TITLE_TEMPLATE = '%s | MB Peluquería';

export const metadata: Metadata = {
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
};

async function checkRole() {
  const token = cookies().get('token');
  if (!token) redirect('/', RedirectType.push);

  const { role } = (await verifyToken(token.value)) as IAuthorization;
  return role;
}

export default async function Layout({
  user,
  admin,
}: {
  children: ReactNode;
  user: ReactNode;
  admin: ReactNode;
}) {
  const ROLE = await checkRole();

  return (
    <>
      {ROLE === 'USER' ? user : admin}
      <Navbar role={ROLE as TRole} />
    </>
  );
}
