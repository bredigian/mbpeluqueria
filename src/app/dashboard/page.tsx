import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
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
        <Suspense></Suspense>
      </section>
    </Screen>
  );
}
