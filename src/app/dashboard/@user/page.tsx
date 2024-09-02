'use client';

import { DateTime } from 'luxon';
import { NoticesContainerForUser } from '@/components/notices-container';
import { Paragraph } from '@/components/ui/paragraph';
import ReserveShiftDialogContainer from '@/components/reserve-shift-dialog-container';
import Screen from '@/components/screen';
import Settings from '@/components/settings';
import { ShiftsContainer } from '@/components/shifts-container';
import { Subtitle } from '@/components/ui/subtitle';
import { Title } from '@/components/ui/title';
import { userStore } from '@/store/user.store';

export default function Home() {
  const today = DateTime.now()
    .setZone('America/Argentina/Buenos_Aires')
    .setLocale('es-AR');

  const { name } = userStore();

  return (
    <Screen className='flex flex-col gap-6'>
      <NoticesContainerForUser />
      <header className='flex items-center justify-between'>
        <Title>Inicio</Title>
        <Settings />
      </header>
      <Paragraph>
        ¡Hola <strong>{name?.split(' ')[0]}</strong>! Acá podrás visualizar tus
        próximos turnos asignados, así como también agendar uno nuevo.
      </Paragraph>
      <section className='flex flex-col gap-6'>
        <aside className='flex w-full items-center justify-between gap-4'>
          <Subtitle className='overflow-hidden text-ellipsis text-nowrap'>
            Próximos turnos
          </Subtitle>
          <ReserveShiftDialogContainer />
        </aside>
        <ShiftsContainer query={today.toISO() as string} />
      </section>
    </Screen>
  );
}
