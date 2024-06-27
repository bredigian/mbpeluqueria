'use client';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from './ui/alert-dialog';

import Cookies from 'js-cookie';
import { INotice } from '@/types/notices.types';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { create } from '@/services/notices.service';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

type Props = { handleDialog: () => void };

export const AddNoticeForm = ({ handleDialog }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<INotice>();

  const onSubmit = async (values: INotice) => {
    try {
      const token = Cookies.get('token');
      await create(token as string, values);

      revalidateDataByTag('notices');
      toast.success('Aviso agregado exitosamente.');

      handleDialog();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4'>
        <Label>Descripción</Label>
        <Textarea
          {...register('description', {
            required: {
              value: true,
              message: 'La descripción es requerida.',
            },
            minLength: {
              value: 20,
              message: 'Debe contener al menos 20 caracteres.',
            },
          })}
        />
        {errors.description && (
          <small className='text-red-500'>{errors.description.message}</small>
        )}
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
