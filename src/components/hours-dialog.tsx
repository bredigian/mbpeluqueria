'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

import { AddWorkhourForm } from './hours-form';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { Button } from './ui/button';
import WorkhourAddIcon from './icons/workhour-add-icon';
import { useDialog } from '@/hooks/use-dialog';

export const AddWorkhourDialog = () => {
  const { show, handleDialog } = useDialog();

  return (
    <AlertDialog open={show}>
      <AlertDialogTrigger asChild>
        <Button
          className='flex items-center gap-2'
          size='icon'
          onClick={handleDialog}
        >
          <WorkhourAddIcon size={24} color='hsl(var(--primary-foreground))' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>Agregar un nuevo horario</AlertDialogTitle>
          <AlertDialogDescription>
            Complete lo siguiente con los datos del horario
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AddWorkhourForm handleDialog={handleDialog} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
