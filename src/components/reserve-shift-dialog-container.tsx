import { IWeekday } from '@/types/weekdays.types';
import { ReserveShiftDialog } from './dashboard-dialog';
import { TResponse } from '@/types/responses.types';
import { getAll } from '@/services/weekdays.service';

export default async function ReserveShiftDialogContainer() {
  const weekdays = (await getAll()) as TResponse;

  if (weekdays instanceof Error) return <span>{weekdays.message}</span>;

  const availableDays = (weekdays as IWeekday[]).filter(
    (weekday) => weekday.WorkhoursByWeekday.length > 0,
  );

  const unavailableDays = (weekdays as IWeekday[]).filter(
    (weekday) => weekday.WorkhoursByWeekday.length === 0,
  );

  return (
    <>
      <ReserveShiftDialog
        availableDays={availableDays as IWeekday[]}
        unavailableDays={unavailableDays as IWeekday[]}
      />
    </>
  );
}
