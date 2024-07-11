'use client';

import { Button } from '@/components/ui/button';
import DashboardAdminParagraph from '@/components/dashboard-admin-paragraph';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { NoticesContainer } from '@/components/notices-container';
import NotificationsContainer from '@/components/notifications-container';
import Screen from '@/components/screen';
import Settings from '@/components/settings';
import { ShiftsContainer } from '@/components/shifts-container';
import { Subtitle } from '@/components/ui/subtitle';
import { Title } from '@/components/ui/title';

export default function DashboardAdminPage() {
  const today = DateTime.now()
    .setZone('America/Argentina/Buenos_Aires')
    .setLocale('es-AR');

  return (
    <Screen className='flex flex-col gap-6'>
      <header className='flex w-full items-center justify-between gap-4'>
        <Title className='grow'>Inicio</Title>
        <NotificationsContainer />
        <Settings isForAdmin />
      </header>
      <DashboardAdminParagraph />
      <section className='flex flex-col gap-6'>
        <Subtitle>Turnos {today.toLocaleString()}</Subtitle>
        <ShiftsContainer query={today.toISO() as string} isForAdmin />
        <Link href={'/dashboard/shifts'}>
          <Button className='w-full' variant='secondary'>
            Ver todos los turnos
          </Button>
        </Link>
      </section>
      <section className='mb-6 flex flex-col gap-6'>
        <Subtitle>Avisos</Subtitle>
        <NoticesContainer canHandleNotices={false} />
      </section>
    </Screen>
  );
}
