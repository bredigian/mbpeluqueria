'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

import { Button } from './ui/button';
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
