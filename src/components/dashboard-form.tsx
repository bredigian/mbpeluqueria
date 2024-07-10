'use client';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from './ui/alert-dialog';
import { Controller, useForm } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import Cookies from 'js-cookie';
import { DateTime } from 'luxon';
import { IShift } from '@/types/shifts.types';
import { IWeekday } from '@/types/weekdays.types';
import { Label } from './ui/label';
import { connectWebsocket } from '@/lib/io';
import { createShift } from '@/services/shifts.service';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';
import { useDialog } from '@/hooks/use-dialog';
import { useState } from 'react';
import { userStore } from '@/store/user.store';

type Props = {
  availableDays: IWeekday[];
  unavailableDays: IWeekday[];

  handleDialog: () => void;
};

export const FormReserveShift = ({
  availableDays,
  unavailableDays,
  handleDialog,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    getValues,
  } = useForm<IShift>();

  const [assignedShifts, setAssignedShifts] = useState<IShift[]>([]);

  const { name, id } = userStore();

  const [dayError, setDayError] = useState(false);
  const [hourError, setHourError] = useState(false);

  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );

  const onSubmit = async (values: IShift) => {
    if (!getValues('timestamp')) {
      setDayError(true);
      return;
    }
    if (!selectedTime) {
      setHourError(true);
      return;
    }

    const [hours, minutes] = selectedTime.split(':');
    const date = DateTime.fromJSDate(values.timestamp as Date)
      .setZone('America/Argentina/Buenos_Aires')
      .setLocale('es-AR')
      .set({
        hour: Number(hours),
        minute: minutes === '00' ? 0 : Number(minutes),
      });

    const payload: IShift = {
      timestamp: date as DateTime,
      user_id: id as string,
    };

    try {
      const token = Cookies.get('token');
      const reserved = await createShift(token as string, payload);

      const socket = connectWebsocket(name as string);
      socket.emit('reserve-shift', reserved, () => socket.disconnect());
      revalidateDataByTag('notifications');

      toast.success('Turno asignado exitosamente.');
      revalidateDataByTag('shifts');

      handleDialog();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const weekdaysWithAssignedWorkhours = availableDays.map((weekday) => {
    const dates = weekday.assignedWorkhours?.map((shift) => {
      const date = DateTime.fromISO(shift.timestamp as string);

      return {
        date: date.toISO(),
        weekday: date.weekday,
      };
    });
    const datesOccurence = dates?.reduce((acc, curr) => {
      const key = `${curr.date}-${curr.weekday}`;
      if (!acc[key]) {
        acc[key] = { date: curr.date, count: 0 };
      }
      acc[key].count += 1;

      return acc;
    }, {} as any);

    return {
      weekdayNumber: weekday.number,
      assignedWorkhours: Object.values(datesOccurence),
    };
  });

  const disabledDates = weekdaysWithAssignedWorkhours.flatMap((item) =>
    item.assignedWorkhours
      .filter(
        (shift) =>
          (shift as { date: string; count: number })?.count ===
          availableDays.find((weekday) => weekday.number === item.weekdayNumber)
            ?.WorkhoursByWeekday?.length,
      )
      ?.map((z) => new Date((z as { date: string; count: number }).date)),
  );

  const popover = useDialog();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full flex-col gap-6'
    >
      <div className='flex flex-col gap-4'>
        <Label>Fecha</Label>
        <Popover open={popover.show}>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className='w-full justify-start font-normal'
              onClick={popover.handleDialog}
            >
              {(watch('timestamp') as Date)?.toLocaleDateString('es-AR') ??
                'Seleccione una fecha'}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='mt-2 w-auto p-0'
            align='center'
            side='bottom'
            onEscapeKeyDown={popover.handleDialog}
            onFocusOutside={popover.handleDialog}
          >
            <Controller
              control={control}
              name='timestamp'
              rules={{
                required: {
                  value: true,
                  message: 'El atributo es requerido.',
                },
              }}
              render={({ field }) => (
                <Calendar
                  mode='single'
                  selected={field.value as Date}
                  onSelect={field.onChange}
                  initialFocus={false}
                  fromMonth={new Date()}
                  onDayClick={(value) => {
                    setDayError(false);

                    const assignedShifts = availableDays.find(
                      (weekday) => weekday.number === value.getDay(),
                    )?.assignedWorkhours as IShift[];

                    setAssignedShifts(assignedShifts);

                    popover.handleDialog();
                  }}
                  disabled={[
                    ...disabledDates,
                    { before: new Date() },
                    {
                      dayOfWeek: unavailableDays.map(
                        (weekday) => weekday.number,
                      ),
                    },
                  ]}
                />
              )}
            />
          </PopoverContent>
        </Popover>
        {dayError && (
          <span className='text-sm text-red-500'>La fecha es requerida.</span>
        )}
      </div>
      <div className='flex flex-col gap-4'>
        <Label>Horario</Label>
        <Select
          onValueChange={(value) => {
            setSelectedTime(value);
            setHourError(false);
          }}
          value={selectedTime}
          disabled={!getValues('timestamp') ? true : false}
        >
          <SelectTrigger>
            <SelectValue placeholder='Seleccione un horario' />
          </SelectTrigger>
          <SelectContent
            ref={(ref) =>
              // temporary workaround from https://github.com/shadcn-ui/ui/issues/1220
              ref?.addEventListener('touchend', (e) => e.preventDefault())
            }
          >
            {availableDays
              .find(
                (weekday) =>
                  weekday.number ===
                  new Date(getValues('timestamp') as Date).getDay(),
              )
              ?.WorkhoursByWeekday.sort((a, b) => {
                if (a.workhour.hours === b.workhour.hours)
                  return (
                    (a.workhour.minutes as number) -
                    (b.workhour.minutes as number)
                  );
                return (
                  (a.workhour.hours as number) - (b.workhour.hours as number)
                );
              })
              .map((workhourByWeekday) => {
                const time = `${workhourByWeekday.workhour.hours}:${workhourByWeekday.workhour.minutes.toString().padStart(2, '0')}`;
                const date = new Date(getValues('timestamp') as Date);
                date.setHours(
                  workhourByWeekday.workhour.hours as number,
                  workhourByWeekday.workhour.minutes as number,
                  0,
                  0,
                );

                const isAssigned = assignedShifts.find(
                  (shift) =>
                    new Date(shift.timestamp as Date).getTime() ===
                    date.getTime(),
                )
                  ? true
                  : false;

                return (
                  <SelectItem
                    key={workhourByWeekday.workhour.id}
                    value={time}
                    disabled={isAssigned}
                  >
                    {time}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
        {hourError && (
          <span className='text-sm text-red-500'>El horario es requerido.</span>
        )}
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
        <AlertDialogAction type='submit'>
          {!isSubmitting ? 'Agendar' : 'Agendando'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </form>
  );
};
