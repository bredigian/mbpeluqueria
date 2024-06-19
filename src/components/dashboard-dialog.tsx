import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

import { Button } from './ui/button';
import CalendarAddIcon from './icons/calendar-add-icon';
import { FormReserveShift } from './dashboard-form';
import { IWeekday } from '@/types/weekdays.types';

type Props = {
  availableDays: IWeekday[];
  unavailableDays: IWeekday[];
};

export const ReserveShiftDialog = ({
  availableDays,
  unavailableDays,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='flex items-center gap-2'>
          <CalendarAddIcon size={20} color='hsl(var(--primary-foreground))' />
          Agendar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Agendar un nuevo turno</AlertDialogTitle>
          <AlertDialogDescription>
            Complete lo siguiente con los datos del turno
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormReserveShift
          availableDays={availableDays}
          unavailableDays={unavailableDays}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};
