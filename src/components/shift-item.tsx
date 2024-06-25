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
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { IShift } from '@/types/shifts.types';
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
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })
    .replaceAll(',', '.');

  const today = new Date();

  const isPast = today.getTime() > date.getTime() ? true : false;

  const canCancel = date.getTime() - today.getTime() > CANCELLATION_LIMIT;

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
                .toLocaleTimeString('es-AR', { hour12: false })
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
                  <DropdownMenuItem>Cancelar</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardContent>
      </Card>
    </li>
  );
}
