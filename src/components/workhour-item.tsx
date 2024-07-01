'use client';

import { Card, CardContent } from './ui/card';
import { IWorkhour, IWorkhourByWeekdayToCreate } from '@/types/workhours.types';

import Cookies from 'js-cookie';
import { IWeekday } from '@/types/weekdays.types';
import { Skeleton } from './ui/skeleton';
import { Switch } from './ui/switch';
import { handleWorkhour } from '@/services/workhours.service';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';

type Props = {
  workhour: IWorkhour;
  selectedWeekday: IWeekday;
};

export function WorkhourItemSkeleton() {
  return (
    <Card>
      <CardContent className='flex w-full items-center justify-between'>
        <Skeleton className='h-6 w-24' />
      </CardContent>
    </Card>
  );
}

export function WorkhourItem({ workhour, selectedWeekday }: Props) {
  const workhourToString = `${workhour.hours.toString()}:${workhour.minutes.toString().padStart(2, '0')}`;

  const isEnabled = selectedWeekday?.WorkhoursByWeekday?.find(
    (workhourByWeekday) => workhourByWeekday.workhour.id === workhour.id,
  )
    ? true
    : false;

  const handleEnable = async () => {
    try {
      const payload: IWorkhourByWeekdayToCreate = {
        weekday_id: selectedWeekday.id as string,
        workhour_id: workhour.id as string,
      };
      const token = Cookies.get('token');
      toast.promise(handleWorkhour(token as string, payload), {
        loading: 'Modificando...',
        success: (data) => {
          return 'id' in data
            ? 'Horario habilitado exitosamente.'
            : 'Horario desactivado exitosamente.';
        },
        error: 'Ocurrió un error al modificar el estado del horario.',
      });
      revalidateDataByTag('workhours');
      revalidateDataByTag('weekdays');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <Card>
      <CardContent className='flex w-full items-center justify-between'>
        <span className='text-2xl'>{workhourToString}</span>
        <Switch defaultChecked={isEnabled} onCheckedChange={handleEnable} />
      </CardContent>
    </Card>
  );
}
