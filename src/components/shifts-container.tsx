import { getNextByUserId, getOfToday } from '@/services/shifts.service';

import { IShift } from '@/types/shifts.types';
import ReserveShiftDialogContainer from './reserve-shift-dialog-container';
import ShiftItem from './shift-item';
import { Subtitle } from './ui/subtitle';
import { Suspense } from 'react';
import { TResponse } from '@/types/responses.types';
import { cookies } from 'next/headers';

export async function ShiftsContainer() {
  const token = cookies().get('token');

  const shifts = (await getNextByUserId(token?.value as string)) as TResponse;

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
            <Suspense fallback={<div>Loading...</div>}>
              <ReserveShiftDialogContainer />
            </Suspense>
          </aside>
          <ul className='flex flex-col gap-6 last:mb-4'>
            {(shifts as IShift[]).length > 0 ? (
              (shifts as IShift[]).map((shift) => (
                <ShiftItem key={shift.id} data={shift} />
              ))
            ) : (
              <span>No tenés turnos agendados.</span>
            )}
          </ul>
        </>
      )}
    </section>
  );
}

export async function AdminShiftsContainer() {
  const token = cookies().get('token');

  const shifts = (await getOfToday(token?.value as string)) as TResponse;

  return (
    <section className='flex flex-col gap-6'>
      {shifts instanceof Error ? (
        <span>{shifts.message}</span>
      ) : (
        <>
          <aside className='flex items-center justify-between gap-4'>
            <Subtitle className='overflow-hidden text-ellipsis text-nowrap'>
              Turnos del día de hoy
            </Subtitle>
          </aside>
          <ul className='flex flex-col gap-6 last:mb-4'>
            {(shifts as IShift[]).length > 0 ? (
              (shifts as IShift[]).map((shift) => (
                <ShiftItem key={shift.id} data={shift} isForAdmin />
              ))
            ) : (
              <span>No tenés turnos agendados.</span>
            )}
          </ul>
        </>
      )}
    </section>
  );
}
