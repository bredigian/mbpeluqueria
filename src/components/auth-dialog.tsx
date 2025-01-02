'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';

import { BsWhatsapp } from 'react-icons/bs';
import { Button } from './ui/button';
import { RecoveryPasswordForm } from './auth-form';
import { useDialog } from '@/hooks/use-dialog';

export const ForgotPasswordDialog = () => {
  const { show, handleDialog } = useDialog();

  return (
    <AlertDialog open={show}>
      <AlertDialogTrigger asChild>
        <Button
          type='button'
          variant='secondary'
          onClick={handleDialog}
          className='col-span-4 sm:col-span-3'
        >
          Olvidé la contraseña
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Olvidaste tu contraseña?</AlertDialogTitle>
          <AlertDialogDescription>
            Ingresá el correo asociado a tu cuenta para cambiar tu contraseña.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <RecoveryPasswordForm handleDialog={handleDialog} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const HelpDialog = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' className='col-span-2 w-full sm:col-span-3'>
          Ayuda
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Ayuda</DrawerTitle>
          <DrawerDescription>
            ¿Tenés problemas para ingresar al sistema?
          </DrawerDescription>
        </DrawerHeader>
        <p className='px-4 text-center'>
          Contactate con el desarrollador mediante WhatsApp para llegar a una
          solución.
        </p>
        <DrawerFooter>
          <a href='https://wa.link/tcg9ro' target='_blank'>
            <Button className='flex w-full items-center gap-2'>
              <span>Contactar</span>
              <BsWhatsapp size={16} color='hsl(var(--primary-foreground))' />
            </Button>
          </a>
          <DrawerClose>
            <Button variant='outline' className='w-full'>
              Cerrar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
