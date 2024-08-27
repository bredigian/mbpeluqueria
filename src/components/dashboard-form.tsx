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
import { useEffect, useState } from 'react';

import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import Cookies from 'js-cookie';
import { DateTime } from 'luxon';
import { IShift } from '@/types/shifts.types';
import { IWeekday } from '@/types/weekdays.types';
import { Label } from './ui/label';
import { connectWebsocket } from '@/lib/io';
import { toast } from 'sonner';
import { useDialog } from '@/hooks/use-dialog';
import { useShiftStore } from '@/store/shifts.store';
import { useWeekdayStore } from '@/store/weekdays.store';
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
  const { getNextByUserId, createShift } = useShiftStore();
  const { getAllWithUnavailableWorkhours } = useWeekdayStore();

  const [dayError, setDayError] = useState(false);
  const [hourError, setHourError] = useState(false);

  const [month, setMonth] = useState<Date>(new Date());
  const [disabledDates, setDisabledDates] = useState<string[]>([]);

  const popover = useDialog();

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

      toast.success('Turno asignado exitosamente.');
      await getAllWithUnavailableWorkhours(token as string);
      await getNextByUserId(token as string);

      handleDialog();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  useEffect(() => {
    const selectedDate = DateTime.fromJSDate(month);
    const lastDayOfMonth = selectedDate.endOf('month');

    let dates = [];
    for (let index = selectedDate.day; index <= lastDayOfMonth.day; index++) {
      const date = DateTime.local(
        selectedDate.year,
        selectedDate.month,
        index,
      ).setLocale('es-AR');

      dates.push(date.toISO());
    }

    const datesWithAssignedShifts = dates.map((date) => {
      const shifts = availableDays
        .find((day) => day.number === DateTime.fromISO(date as string).weekday)
        ?.assignedWorkhours?.filter(
          (item) =>
            DateTime.fromISO(item.timestamp as string)
              .set({ hour: 0, minute: 0 })
              .toMillis() === DateTime.fromISO(date as string).toMillis(),
        )
        .map((shift) =>
          DateTime.fromISO(shift.timestamp as string)
            .setLocale('es-AR')
            .toISO(),
        );

      return { date, shifts };
    });

    const completeDates = datesWithAssignedShifts
      .filter((date) => (date?.shifts?.length as number) > 0)
      .map((date) => {
        const workhoursEnabledByWeekday = availableDays
          .find(
            (day) =>
              day.number === DateTime.fromISO(date.date as string).weekday,
          )
          ?.WorkhoursByWeekday.map(({ workhour }) => ({
            hour: workhour.hours,
            minutes: workhour.minutes,
          }));

        const isComplete = workhoursEnabledByWeekday?.every(
          ({ hour, minutes }) =>
            date.shifts?.includes(
              DateTime.fromISO(date.date as string)
                .set({ hour: hour as number, minute: minutes as number })
                .setLocale('es-AR')
                .toISO(),
            ),
        );

        return { ...date, complete: isComplete };
      })
      .filter((item) => item.complete as boolean);

    setDisabledDates(completeDates?.map((item) => item.date as string));
  }, [month]);

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
            onEscapeKeyDown={() => {
              popover.handleDialog();
              setMonth(new Date());
            }}
            onFocusOutside={() => {
              popover.handleDialog();
              setMonth(new Date());
            }}
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
                  onMonthChange={(value) => setMonth(value)}
                  onDayClick={(value) => {
                    setDayError(false);

                    const assignedShifts = availableDays.find(
                      (weekday) => weekday.number === value.getDay(),
                    )?.assignedWorkhours as IShift[];

                    setAssignedShifts(assignedShifts);

                    popover.handleDialog();
                    setMonth(new Date());
                  }}
                  disabled={[
                    ...disabledDates.map((item) => new Date(item)),
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
