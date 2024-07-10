'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

import { Button } from './ui/button';
import Cookies from 'js-cookie';
import { connectWebsocket } from '@/lib/io';
import { toast } from 'sonner';
import { useDialog } from '@/hooks/use-dialog';
import { usePathname } from 'next/navigation';
import { useShiftStore } from '@/store/shifts.store';
import { useState } from 'react';

type Props = {
  id: string;
  user_name: string;
};

export const CancelShiftDialog = ({ id, user_name }: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const { show, handleDialog } = useDialog();
  const pathname = usePathname();
  const { cancelShift, getAllByUserId, getNextByUserId } = useShiftStore();

  const handleCancel = async () => {
    setSubmitting(true);
    try {
      const token = Cookies.get('token');
      const cancelled = await cancelShift(token as string, id);

      const socket = connectWebsocket(user_name as string);
      socket.emit('cancel-shift', cancelled, () => socket.disconnect());

      toast.success('Turno cancelado exitosamente.');
      if (pathname.includes('history')) await getAllByUserId(token as string);
      else await getNextByUserId(token as string);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
    setSubmitting(false);
  };

  return (
    <AlertDialog open={show}>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          className='flex w-full justify-start gap-2 rounded-md px-3 py-2 duration-200 hover:bg-accent'
          onClick={handleDialog}
        >
          Cancelar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro que deseas cancelar el turno?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancel} disabled={submitting}>
            {!submitting ? 'Confirmar' : 'Confirmando'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
