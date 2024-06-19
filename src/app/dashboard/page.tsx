import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import SettingsIcon from '@/components/icons/settings-icon';
import ShiftsContainer from '@/components/shifts-container';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

export default function Home() {
  return (
    <Screen className='flex flex-col gap-6'>
      <header className='flex items-center justify-between'>
        <Title>Inicio</Title>
        <SettingsIcon size={28} color='hsl(var(--primary))' />
      </header>
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
