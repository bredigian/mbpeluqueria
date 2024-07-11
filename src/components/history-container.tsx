import { ShiftItem, ShiftItemSkeleton } from './shift-item';

import Cookies from 'js-cookie';
import { IShift } from '@/types/shifts.types';
import { useEffect } from 'react';
import { useLoading } from '@/hooks/use-loading';
import { useRouter } from 'next/navigation';
import { useShiftStore } from '@/store/shifts.store';

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

export function HistoryContainer() {
  const token = Cookies.get('token');
  const { shifts, getAllByUserId } = useShiftStore();
  const { status, handleStatus } = useLoading();
  const { push } = useRouter();

  const fetchData = async () => {
    try {
      await getAllByUserId(token as string);
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
  }, []);

  if (status === 'pending') return <HistoryContainerSkeleton />;
  if (status === 'error') return <div>Error</div>;

  return (
    <ul className='flex flex-col gap-6 last:mb-4'>
      {(shifts as IShift[]).length > 0 ? (
        (shifts as IShift[]).map((shift) => (
          <ShiftItem key={shift.id} data={shift} />
        ))
      ) : (
        <span>El historial está vacio.</span>
      )}
    </ul>
  );
}
