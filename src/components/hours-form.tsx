import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from './ui/alert-dialog';
import { Controller, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { IWorkhour } from '@/types/workhours.types';
import { Label } from './ui/label';
import { create } from '@/services/workhours.service';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';

const HOURS = Array.from({ length: 24 }, (v, i) => i.toString());
const MINUTES = [0, 15, 30, 45].map((i) => i.toString());

type Props = {
  handleDialog: () => void;
};

export const AddWorkhourForm = ({ handleDialog }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IWorkhour>();

  const onSubmit = async (values: IWorkhour) => {
    try {
      const payload: IWorkhour = {
        hours: Number(values.hours),
        minutes: Number(values.minutes),
      };

      await create(payload);
      revalidateDataByTag('workhours');
      revalidateDataByTag('weekdays');

      toast.success('Horario creado exitosamente.');
      handleDialog();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <Label>Horario</Label>
      <div className='flex w-full items-start justify-between gap-4'>
        <Controller
          control={control}
          name='hours'
          rules={{
            required: {
              value: true,
              message: 'La hora es requerida.',
            },
          }}
          render={({ field }) => (
            <div className='flex w-full flex-col gap-4'>
              <Select
                onValueChange={field.onChange}
                {...field}
                value={field.value as string}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Hora' />
                </SelectTrigger>
                <SelectContent
                  className='max-h-64'
                  ref={(ref) =>
                    // temporary workaround from https://github.com/shadcn-ui/ui/issues/1220
                    ref?.addEventListener('touchend', (e) => e.preventDefault())
                  }
                >
                  {HOURS.map((hour) => (
                    <SelectItem key={hour + '_key'} value={hour.toString()}>
                      {hour.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.hours && (
                <small className='max-w-32 text-red-500'>
                  {errors.hours.message}
                </small>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name='minutes'
          rules={{
            required: {
              value: true,
              message: 'Los minutos son requeridos.',
            },
          }}
          render={({ field }) => (
            <div className='flex w-full flex-col gap-4'>
              <Select
                onValueChange={field.onChange}
                {...field}
                value={field.value as string}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Minutos' />
                </SelectTrigger>
                <SelectContent
                  className='max-h-64'
                  ref={(ref) =>
                    // temporary workaround from https://github.com/shadcn-ui/ui/issues/1220
                    ref?.addEventListener('touchend', (e) => e.preventDefault())
                  }
                >
                  {MINUTES.map((minute) => (
                    <SelectItem key={minute + '_key'} value={minute.toString()}>
                      {minute.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.minutes && (
                <small className='max-w-32 text-red-500'>
                  {errors.minutes.message}
                </small>
              )}
            </div>
          )}
        />
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
        <AlertDialogAction type='submit' disabled={isSubmitting}>
          {!isSubmitting ? 'Agregar' : 'Agregando'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </form>
  );
};
