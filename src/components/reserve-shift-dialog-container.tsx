import { IWeekday } from '@/types/weekdays.types';
import { ReserveShiftDialog } from './dashboard-dialog';
import { TResponse } from '@/types/responses.types';
import { getAllWithUnavailableWorkhours } from '@/services/weekdays.service';

export default async function ReserveShiftDialogContainer() {
  const weekdays = (await getAllWithUnavailableWorkhours()) as TResponse;

  if (weekdays instanceof Error) return <span>{weekdays.message}</span>;

  const availableDays = (weekdays as IWeekday[]).filter(
    (weekday) => weekday.WorkhoursByWeekday.length > 0,
  );

  const unavailableDays = (weekdays as IWeekday[]).filter((weekday) => {
    if (weekday.WorkhoursByWeekday.length === 0) return true;
    if (weekday.WorkhoursByWeekday.length === weekday.assignedWorkhours?.length)
      return true;

    return false;
  });

  return (
    <>
      <ReserveShiftDialog
        availableDays={availableDays as IWeekday[]}
        unavailableDays={unavailableDays as IWeekday[]}
      />
    </>
  );
}
