import { AddWorkhourDialog } from './hours-dialog';
import Cookies from 'js-cookie';
import DayPickerBar from './day-picker-bar';
import { IWeekday } from '@/types/weekdays.types';
import { Skeleton } from './ui/skeleton';
import { useEffect } from 'react';
import { useLoading } from '@/hooks/use-loading';
import { useRouter } from 'next/navigation';
import { useWeekdayStore } from '@/store/weekdays.store';

export function WeekdaysContainerSkeleton() {
  return (
    <section className='flex w-full items-center justify-between'>
      <Skeleton className='h-8 w-44' />
      <Skeleton className='h-8 w-8' />
    </section>
  );
}

export function WeekdaysContainer() {
  const token = Cookies.get('token');
  const { weekdays, getAll } = useWeekdayStore();
  const { status, handleStatus } = useLoading();
  const { push } = useRouter();

  const fetchData = async () => {
    try {
      await getAll(token as string);
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

  if (status === 'pending') return <WeekdaysContainerSkeleton />;
  if (status === 'error') return <div>Error</div>;

  return (
    <section className='flex w-full items-center justify-between'>
      <DayPickerBar weekdays={weekdays as IWeekday[]} />
      <AddWorkhourDialog />
    </section>
  );
}
