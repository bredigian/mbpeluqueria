import {
  ShiftsContainer,
  ShiftsContainerSkeleton,
} from '@/components/shifts-container';

import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import Settings from '@/components/settings';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

export default function Home() {
  return (
    <Screen className='flex flex-col gap-6'>
      <header className='flex items-center justify-between'>
        <Title>Inicio</Title>
        <Settings />
      </header>
      <Paragraph>
        Acá podrás visualizar tus próximos turnos asignados, así como también
        agendar uno nuevo.
      </Paragraph>
      <Suspense fallback={<ShiftsContainerSkeleton />}>
        <ShiftsContainer />
      </Suspense>
    </Screen>
  );
}
