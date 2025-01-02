'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';

import { Button } from './ui/button';
import { IoLogOutOutline } from 'react-icons/io5';
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
    <Drawer open={show}>
      <DrawerTrigger asChild={isAdmin}>
        {!isAdmin ? (
          <div
            onClick={handleDialog}
            className='flex w-32 flex-col items-center gap-2'
          >
            <IoLogOutOutline
              size={24}
              className='duration-200 active:scale-95'
            />
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
      </DrawerTrigger>
      <DrawerContent onEscapeKeyDown={handleDialog}>
        <DrawerHeader>
          <DrawerTitle>¿Estás seguro que deseas cerrar sesión?</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <Button type='button' onClick={handleLogout}>
            Salir
          </Button>
          <DrawerClose onClick={handleDialog} asChild>
            <Button variant='outline' className='w-full'>
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
