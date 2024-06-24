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
        <DayPickerBar weekdays={weekdays as IWeekday[]} />
      )}
    </aside>
  );
}
