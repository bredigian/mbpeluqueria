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
import LogoutIcon from './icons/logout-icon';
import { toast } from 'sonner';
import { useDialog } from '@/hooks/use-dialog';
import { useRouter } from 'next/navigation';
import { userStore } from '@/store/user.store';

type Props = {
  isAdmin?: boolean;
};

export const LogoutDialog = ({ isAdmin }: Props) => {
  const { logout } = userStore();
  const { push, refresh } = useRouter();
  const { show, handleDialog } = useDialog();

  const handleLogout = () => {
    try {
      logout();
      push('/');
      refresh();
      toast.success('Sesión cerrada exitosamente.');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <AlertDialog open={show}>
      <AlertDialogTrigger asChild={isAdmin}>
        {!isAdmin ? (
          <div
            onClick={handleDialog}
            className='flex w-32 flex-col items-center gap-2'
          >
            <LogoutIcon size={24} color='hsl(var(--primary))' />
            <small className='font-semibold'>Cerrar sesión</small>
          </div>
        ) : (
          <Button
            variant='ghost'
            className='flex w-full justify-start gap-2 rounded-md px-3 py-2 duration-200 hover:bg-accent'
            onClick={handleDialog}
          >
            Cerrar sesión
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro que deseas cerrar sesión?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
