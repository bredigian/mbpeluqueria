import { RedirectType, redirect } from 'next/navigation';
import { ShiftItem, ShiftItemSkeleton } from './shift-item';

import { IShift } from '@/types/shifts.types';
import { cookies } from 'next/headers';
import { getAllByUserId } from '@/services/shifts.service';

export function HistoryContainerSkeleton() {
  return (
    <section className='flex flex-col gap-6'>
      <ul className='flex flex-col gap-6 last:mb-4'>
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
      </ul>
    </section>
  );
}

export async function HistoryContainer() {
  const token = cookies().get('token');
  if (!token) redirect('/', RedirectType.push);

  const shifts = await getAllByUserId(token?.value as string);

  return (
    <section className='flex flex-col gap-6'>
      {shifts instanceof Error ? (
        <span>{shifts.message}</span>
      ) : (
        <ul className='flex flex-col gap-6 last:mb-4'>
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
