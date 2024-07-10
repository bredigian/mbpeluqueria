import {
  AdminShiftsContainer,
  AdminShiftsContainerSkeleton,
} from '@/components/shifts-container';
import {
  NoticesContainer,
  NoticesContainerSkeleton,
} from '@/components/notices-container';

import DashboardAdminParagraph from '@/components/dashboard-admin-paragraph';
import { DateTime } from 'luxon';
import NotificationsContainer from '@/components/notifications-container';
import Screen from '@/components/screen';
import Settings from '@/components/settings';
import { Subtitle } from '@/components/ui/subtitle';
import { Suspense } from 'react';
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
      <Suspense fallback={<AdminShiftsContainerSkeleton />}>
        <section className='flex flex-col gap-6'>
          <Subtitle>Turnos {today.toLocaleString()}</Subtitle>
          <AdminShiftsContainer query={today.toISO() as string} />
        </section>
      </Suspense>
      <Suspense fallback={<NoticesContainerSkeleton />}>
        <section className='mb-6 flex flex-col gap-6'>
          <Subtitle>Avisos</Subtitle>
          <NoticesContainer canHandleNotices={false} />
        </section>
      </Suspense>
    </Screen>
  );
}
