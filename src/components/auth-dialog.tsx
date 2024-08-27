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
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { RecoveryPasswordForm } from './auth-form';
import { useDialog } from '@/hooks/use-dialog';

export const ForgotPasswordDialog = () => {
  const { show, handleDialog } = useDialog();

  return (
    <AlertDialog open={show}>
      <AlertDialogTrigger asChild>
        <Button type='button' variant='secondary' onClick={handleDialog}>
          Olvidé la contraseña
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Olvidaste tu contraseña?</AlertDialogTitle>
          <AlertDialogDescription>
            Ingresá el email asociado a tu cuenta para cambiar tu contraseña.
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
        <Button variant='secondary' className='w-full'>
          Ayuda
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Ayuda</DrawerTitle>
          <DrawerDescription>
            A continuación se mostrará una lista con ciertos aspectos a tener en
            cuenta:
          </DrawerDescription>
        </DrawerHeader>
        <ul className='flex flex-col gap-4 p-4'>
          <li className='flex gap-2'>
            <ChevronRightIcon className='mt-2 min-h-4 min-w-4' />
            <p>
              El sistema tuvo una actualización tanto visual como de base de
              datos, por lo tanto deberás crear tu usuario{' '}
              <strong>desde cero</strong>.
            </p>
          </li>
          <li className='flex gap-2'>
            <ChevronRightIcon className='mt-2 min-h-4 min-w-4' />
            <p>
              Al crear el usuario nuevo se solicitará un email, el cual será
              indispensable que sea <strong>válido</strong> en caso de necesitar
              una recuperación de contraseña.
            </p>
          </li>
        </ul>
        <DrawerFooter>
          <a href='https://wa.link/tcg9ro' target='_blank'>
            <Button className='flex w-full items-center gap-2'>
              <span>Contactar a soporte</span>
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
