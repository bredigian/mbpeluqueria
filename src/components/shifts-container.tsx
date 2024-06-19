import { Card, CardContent } from './ui/card';

import { Button } from './ui/button';
import CalendarAddIcon from './icons/calendar-add-icon';
import { IShift } from '@/types/shifts.types';
import { Subtitle } from './ui/subtitle';
import { TResponse } from '@/types/responses.types';
import { cookies } from 'next/headers';
import { getAllByUserId } from '@/services/shifts.service';

export default async function ShiftsContainer() {
  const token = cookies().get('token');

  const shifts = (await getAllByUserId(token?.value as string)) as TResponse;

  return (
    <section className='flex flex-col gap-6'>
      {shifts instanceof Error ? (
        <span>{shifts.message}</span>
      ) : (
        <>
          <aside className='flex items-center justify-between gap-4'>
            <Subtitle className='overflow-hidden text-ellipsis text-nowrap'>
              Próximos turnos
            </Subtitle>
            <Button className='flex items-center gap-2'>
              <CalendarAddIcon
                size={20}
                color='hsl(var(--primary-foreground))'
              />
              Agendar
            </Button>
          </aside>
          <ul className='flex flex-col gap-6'>
            {(shifts as IShift[]).length > 0 ? (
              (shifts as IShift[]).map((shift) => {
                const date = new Date(shift.timestamp);
                return (
                  <li key={shift.id}>
                    <Card>
                      <CardContent className='flex w-full items-start justify-between'>
                        <div className='flex flex-col gap-2'>
                          <small className='text-base opacity-75'>
                            {date.toLocaleDateString('es-AR')}
                          </small>
                          <span className='text-3xl font-medium'>
                            {date
                              .toLocaleTimeString('es-AR', { hour12: false })
                              .substring(0, 5)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                );
              })
            ) : (
              <span>No tenés turnos agendados.</span>
            )}
          </ul>
        </>
      )}
    </section>
  );
}
