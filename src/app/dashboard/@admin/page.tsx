import { AdminShiftsContainer } from '@/components/shifts-container';
import DashboardAdminParagraph from '@/components/dashboard-admin-paragraph';
import Screen from '@/components/screen';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

export default function DashboardAdminPage() {
  return (
    <Screen className='flex flex-col gap-6'>
      <Title>Inicio</Title>
      <DashboardAdminParagraph />
      <Suspense fallback={<div>Loading...</div>}>
        <AdminShiftsContainer />
      </Suspense>
    </Screen>
  );
}
