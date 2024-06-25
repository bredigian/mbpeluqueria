import { ShiftItem, ShiftItemSkeleton } from './shift-item';
import { getNextByUserId, getOfDate } from '@/services/shifts.service';

import { Button } from './ui/button';
import { IShift } from '@/types/shifts.types';
import Link from 'next/link';
import ReserveShiftDialogContainer from './reserve-shift-dialog-container';
import { Skeleton } from './ui/skeleton';
import { Subtitle } from './ui/subtitle';
import { Suspense } from 'react';
import { TResponse } from '@/types/responses.types';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';

export function ShiftsContainerSkeleton() {
  return (
    <section className='flex flex-col gap-6'>
      <aside className='flex items-start justify-between gap-4'>
        <Skeleton className='h-6 w-44' />
        <Skeleton className='h-8 w-20' />
      </aside>
      <ul className='flex flex-col gap-6 last:mb-4'>
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
      </ul>
    </section>
  );
}

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

type Props = {
  query: string | Date;
  isShiftsPath?: boolean;
};

export async function AdminShiftsContainer({ query, isShiftsPath }: Props) {
  const token = cookies().get('token');

  const date = new Date(query);

  const shifts = (await getOfDate(token?.value as string, date)) as TResponse;

  if (query)
    return (
      <section className='flex flex-col gap-6'>
        {shifts instanceof Error ? (
          <span>{shifts.message}</span>
        ) : (
          <ul
            className={cn(
              'flex flex-col gap-6 last:mb-4',
              !isShiftsPath && 'max-h-[356px] overflow-auto',
            )}
          >
            {(shifts as IShift[]).length > 0 ? (
              (shifts as IShift[]).map((shift) => (
                <ShiftItem key={shift.id} data={shift} isForAdmin />
              ))
            ) : (
              <span>No tenés turnos agendados.</span>
            )}
          </ul>
        )}
        {!isShiftsPath && (
          <Link href={'/dashboard/shifts'}>
            <Button className='w-full' variant='secondary'>
              Ver todos los turnos
            </Button>
          </Link>
        )}
      </section>
    );
}
