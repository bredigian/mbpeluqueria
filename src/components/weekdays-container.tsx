import { AddWorkhourDialog } from './hours-dialog';
import DayPickerBar from './day-picker-bar';
import { IWeekday } from '@/types/weekdays.types';
import { getAll } from '@/services/weekdays.service';

export default async function WeekdaysContainer() {
  const weekdays = await getAll();

  return (
    <aside className='flex flex-col gap-6'>
      {weekdays instanceof Error ? (
        <span>{weekdays.message}</span>
      ) : (
        <aside className='flex w-full items-center justify-between'>
          <DayPickerBar weekdays={weekdays as IWeekday[]} />
          <AddWorkhourDialog />
        </aside>
      )}
    </aside>
  );
}
