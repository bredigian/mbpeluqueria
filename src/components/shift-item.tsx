'use client';

import { Card, CardContent } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Button } from './ui/button';
import { CancelShiftDialog } from './shift-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { IShift } from '@/types/shifts.types';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

type Props = {
  data: IShift;
  isForAdmin?: boolean;
};

export function ShiftItemSkeleton() {
  return (
    <li>
      <Card>
        <CardContent className='flex w-full items-start justify-between'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-44' />
            <Skeleton className='h-8 w-28' />
          </div>
        </CardContent>
      </Card>
    </li>
  );
}

// 2h en ms
const CANCELLATION_LIMIT = 7200000;

export function ShiftItem({ data, isForAdmin }: Props) {
  const date = new Date(data.timestamp);
  const dateToString = date
    .toLocaleDateString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })
    .replaceAll(',', '.');

  const today = new Date();

  const isPast = today.getTime() > date.getTime() ? true : false;

  const canCancel = date.getTime() - today.getTime() > CANCELLATION_LIMIT;

  const userPhoneNumberParsed =
    data?.user?.phone_number.charAt(0) === '0'
      ? data?.user.phone_number.slice(1)
      : data?.user?.phone_number;

  return (
    <li>
      <Card>
        <CardContent
          className={cn(
            'flex w-full items-start justify-between',
            isPast ? 'opacity-35' : 'opacity-100',
          )}
        >
          <div className={cn('flex flex-col gap-2', isPast && 'line-through')}>
            <small className='text-base opacity-75'>
              {!isForAdmin
                ? dateToString.charAt(0).toUpperCase() + dateToString.slice(1)
                : data.user?.name}
            </small>
            <span className='text-3xl font-medium'>
              {date
                .toLocaleTimeString('es-AR', {
                  timeZone: 'America/Argentina/Buenos_Aires',
                  hour12: false,
                })
                .substring(0, 5)}
            </span>
          </div>
          {!isPast && canCancel && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size='icon' variant='outline'>
                  <DotsHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mr-4'>
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {isForAdmin && (
                    <Link
                      href={`https://api.whatsapp.com/send?phone=${userPhoneNumberParsed}&text=¡Hola%20👋!%0ATe%20recuerdo%20que%20tenés%20un%20turno%20el%20día%20*${dateToString.charAt(0).toUpperCase() + dateToString.slice(1)}*%20a%20las%20*${date
                        .toLocaleTimeString('es-AR', {
                          timeZone: 'America/Argentina/Buenos_Aires',
                          hour12: false,
                        })
                        .substring(
                          0,
                          5,
                        )}hs*%0ASi%20deseás%20cancelar%20el%20turno,%20podrás%20solicitarlo%20desde%20la%20página%20de%20turnos.%0A¡Muchas%20gracias,%20te%20espero!%20💈`}
                    >
                      <DropdownMenuItem className='flex w-full justify-start gap-2 rounded-md px-3 py-2 font-medium duration-200 hover:bg-accent'>
                        Contactar por WhatsApp
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <CancelShiftDialog
                    id={data.id as string}
                    user_name={data.user?.name as string}
                  />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardContent>
      </Card>
    </li>
  );
}
