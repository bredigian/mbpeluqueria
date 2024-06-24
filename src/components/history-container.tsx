import { IShift } from '@/types/shifts.types';
import ShiftItem from './shift-item';
import { cookies } from 'next/headers';
import { getAllByUserId } from '@/services/shifts.service';

export default async function HistoryContainer() {
  const token = cookies().get('token');

  const shifts = await getAllByUserId(token?.value as string);

  return (
    <section className='flex flex-col gap-6'>
      {shifts instanceof Error ? (
        <span>{shifts.message}</span>
      ) : (
        <ul className='flex flex-col gap-6'>
          {(shifts as IShift[]).length > 0 ? (
            (shifts as IShift[]).map((shift) => (
              <ShiftItem key={shift.id} data={shift} />
            ))
          ) : (
            <span>El historial está vacio.</span>
          )}
        </ul>
      )}
    </section>
  );
}
