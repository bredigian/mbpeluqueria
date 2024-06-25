import { AddWorkhourDialog } from './hours-dialog';
import DayPickerBar from './day-picker-bar';
import { IWeekday } from '@/types/weekdays.types';
import { Skeleton } from './ui/skeleton';
import { getAll } from '@/services/weekdays.service';

export function WeekdaysContainerSkeleton() {
  return (
    <section className='flex w-full items-center justify-between'>
      <Skeleton className='h-8 w-44' />
      <Skeleton className='h-8 w-8' />
    </section>
  );
}

export async function WeekdaysContainer() {
  const weekdays = await getAll();

  return (
    <section className='flex w-full items-center justify-between'>
      {weekdays instanceof Error ? (
        <span>{weekdays.message}</span>
      ) : (
        <>
          <DayPickerBar weekdays={weekdays as IWeekday[]} />
          <AddWorkhourDialog />
        </>
      )}
    </section>
  );
}
