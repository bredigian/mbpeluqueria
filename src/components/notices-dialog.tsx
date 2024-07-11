'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

import { AddNoticeForm } from './notices-form';
import { Button } from './ui/button';
import Cookies from 'js-cookie';
import NoticesAddIcon from './icons/notices-add-icon';
import { toast } from 'sonner';
import { useDialog } from '@/hooks/use-dialog';
import { useNoticeStore } from '@/store/notices.store';

export const AddNoticeDialog = () => {
  const { show, handleDialog } = useDialog();

  return (
    <AlertDialog open={show}>
      <AlertDialogTrigger asChild>
        <Button className='flex items-center gap-2' onClick={handleDialog}>
          <NoticesAddIcon size={24} color='hsl(var(--primary-foreground))' />
          Agregar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Agregar un aviso</AlertDialogTitle>
          <AlertDialogDescription>
            Complete lo siguiente con los datos del aviso
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AddNoticeForm handleDialog={handleDialog} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  id: string;
};

export const DeleteNoticeDialog = ({ id }: Props) => {
  const { show, handleDialog } = useDialog();
  const { deleteById } = useNoticeStore();

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');
      await deleteById(token as string, id);

      toast.success('Aviso eliminado exitosamente.');
      handleDialog();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <AlertDialog open={show}>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          className='flex w-full justify-start gap-2 rounded-md px-3 py-2 duration-200 hover:bg-accent'
          onClick={handleDialog}
        >
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro que deseas eliminar el aviso?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
