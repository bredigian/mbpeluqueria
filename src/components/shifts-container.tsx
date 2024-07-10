'use client';

import { ShiftItem, ShiftItemSkeleton } from './shift-item';

import Cookies from 'js-cookie';
import { DateTime } from 'luxon';
import { IShift } from '@/types/shifts.types';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useLoading } from '@/hooks/use-loading';
import { useRouter } from 'next/navigation';
import { useShiftStore } from '@/store/shifts.store';

export function ShiftsContainerSkeleton() {
  return (
    <section className='flex flex-col gap-6'>
      <ul className='flex flex-col gap-6 last:mb-4'>
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
        <ShiftItemSkeleton />
      </ul>
    </section>
  );
}

type Props = {
  query: string;
  isShiftsPath?: boolean;
  isForAdmin?: boolean;
};

export function ShiftsContainer({ query, isShiftsPath, isForAdmin }: Props) {
  const token = Cookies.get('token');
  const { status, handleStatus } = useLoading();
  const { shifts, getOfDate, getNextByUserId } = useShiftStore();
  const { push } = useRouter();

  const fetchData = async () => {
    try {
      handleStatus('pending');

      const date = DateTime.fromISO(query).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      });

      if (isForAdmin) await getOfDate(token as string, date);
      else await getNextByUserId(token as string);

      setTimeout(() => {
        handleStatus('ready');
      }, 200);
    } catch (error) {
      handleStatus('error');
    }
  };

  useEffect(() => {
    if (!token) push('/');
    fetchData();
  }, [query]);

  if (status === 'pending') return <ShiftsContainerSkeleton />;
  if (status === 'error') return <div>Error</div>;

  return (
    <ul
      className={cn(
        'flex flex-col gap-6 last:mb-4',
        isForAdmin && 'max-h-[356px] overflow-auto',
      )}
    >
      {(shifts as IShift[]).length > 0 ? (
        (shifts as IShift[]).map((shift) => (
          <ShiftItem key={shift.id} data={shift} isForAdmin={isForAdmin} />
        ))
      ) : (
        <span>No tenés turnos agendados.</span>
      )}
    </ul>
  );
}
