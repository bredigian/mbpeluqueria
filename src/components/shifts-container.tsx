import { Card, CardContent } from './ui/card';
import { RedirectType, redirect } from 'next/navigation';

import { IErrorResponse } from '@/types/responses.types';
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
          <Subtitle>Próximos turnos</Subtitle>
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
