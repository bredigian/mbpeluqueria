import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import ShiftsContainer from '@/components/shifts-container';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

export default function Home() {
  return (
    <Screen className='flex flex-col gap-6'>
      <Title>Inicio</Title>
      <Paragraph>
        Acá podrás visualizar tus próximos turnos asignados, así como también
        agendar uno nuevo.
      </Paragraph>
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          <ShiftsContainer />
        </Suspense>
      </section>
    </Screen>
  );
}
