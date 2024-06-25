import { AdminShiftsContainer } from '@/components/shifts-container';
import DashboardAdminParagraph from '@/components/dashboard-admin-paragraph';
import NoticesContainer from '@/components/notices-container';
import Screen from '@/components/screen';
import Settings from '@/components/settings';
import { Subtitle } from '@/components/ui/subtitle';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

export default function DashboardAdminPage() {
  return (
    <Screen className='flex flex-col gap-6'>
      <header className='flex w-full items-center justify-between'>
        <Title>Inicio</Title>
        <Settings />
      </header>
      <DashboardAdminParagraph />
      <Suspense fallback={<div>Loading...</div>}>
        <section className='flex flex-col gap-6'>
          <Subtitle>Turnos de hoy</Subtitle>
          <AdminShiftsContainer query={new Date() as Date} />
        </section>
      </Suspense>
      <Suspense>
        <section className='mb-6 flex flex-col gap-6'>
          <Subtitle>Avisos</Subtitle>
          <NoticesContainer canHandleNotices={false} />
        </section>
      </Suspense>
    </Screen>
  );
}
