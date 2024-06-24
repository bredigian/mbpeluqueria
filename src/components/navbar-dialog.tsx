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

import LogoutIcon from './icons/logout-icon';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { userStore } from '@/store/user.store';

export const LogoutDialog = () => {
  const { logout } = userStore();
  const { push, refresh } = useRouter();

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
    <AlertDialog>
      <AlertDialogTrigger className='flex w-32 flex-col items-center gap-2'>
        <LogoutIcon size={24} color='#171717' />
        <small className='font-semibold'>Cerrar sesión</small>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro que deseas cerrar sesión?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
