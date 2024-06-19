'use client';

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
import { IShift } from '@/types/shifts.types';
import { IWeekday } from '@/types/weekdays.types';
import { Label } from './ui/label';
import { useState } from 'react';
import { userStore } from '@/store/user.store';

type Props = {
  availableDays: IWeekday[];
  unavailableDays: IWeekday[];
};

export const FormReserveShift = ({ availableDays, unavailableDays }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
  } = useForm<IShift>({
    defaultValues: { timestamp: undefined },
  });

  const { id } = userStore();

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

    const date = new Date(values.timestamp);
    const [hours, minutes] = selectedTime.split(':');
    date.setHours(Number(hours));
    date.setMinutes(minutes == '00' ? 0 : Number(minutes));

    const payload: IShift = {
      timestamp: date,
      user_id: id as string,
    };

    console.log(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full flex-col gap-6'
    >
      <div className='flex flex-col gap-4'>
        <Label>Fecha</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className='w-full justify-start font-normal'
            >
              {watch('timestamp')?.toLocaleDateString('es-AR') ??
                'Seleccione una fecha'}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='mt-2 w-auto p-0'
            align='center'
            side='bottom'
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
                  selected={field.value}
                  onSelect={field.onChange}
                  onDayClick={() => {
                    setDayError(false);
                    setSelectedTime(undefined);
                  }}
                  disabled={[
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
          <SelectContent>
            {availableDays
              .find(
                (weekday) =>
                  weekday.number === new Date(getValues('timestamp')).getDay(),
              )
              ?.WorkhoursByWeekday.map((workhourByWeekday) => {
                const time = `${workhourByWeekday.workhour.hours}:${workhourByWeekday.workhour.minutes.toString().padStart(2, '0')}`;

                return (
                  <SelectItem key={workhourByWeekday.workhour.id} value={time}>
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
      <Button type='submit' variant='default' className='mt-12'>
        {!isSubmitting ? 'Agendar' : 'Agendando'}
      </Button>
    </form>
  );
};
