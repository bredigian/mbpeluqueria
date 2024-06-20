'use client';

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
import { useDialog } from '@/hooks/use-dialog';

type Props = {
  availableDays: IWeekday[];
  unavailableDays: IWeekday[];
};

export const ReserveShiftDialog = ({
  availableDays,
  unavailableDays,
}: Props) => {
  const { show, handleDialog } = useDialog();

  return (
    <AlertDialog open={show}>
      <AlertDialogTrigger asChild>
        <Button className='flex items-center gap-2' onClick={handleDialog}>
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
          handleDialog={handleDialog}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};
