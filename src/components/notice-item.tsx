'use client';

import { Card, CardContent } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Button } from './ui/button';
import { DeleteNoticeDialog } from './notices-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { INotice } from '@/types/notices.types';
import { Skeleton } from './ui/skeleton';

export function NoticeItemSkeleton() {
  return (
    <li>
      <Card>
        <CardContent className='flex flex-col gap-2'>
          <Skeleton className='h-3 w-64' />
          <Skeleton className='h-3 w-48' />
          <Skeleton className='h-3 w-52' />
          <Skeleton className='h-3 w-36' />
        </CardContent>
      </Card>
    </li>
  );
}

type Props = {
  data: INotice;
  canHandle?: boolean;
  className?: string;
  isForUser?: boolean;
};

export function NoticeItem({ data, canHandle, className, isForUser }: Props) {
  const date = new Date(data.timestamp as Date);

  return (
    <li className={className}>
      <Card className={isForUser ? 'bg-orange-200 text-black' : ''}>
        <CardContent className='flex flex-col gap-2'>
          <div className='flex w-full justify-between'>
            <span className='text-sm font-medium opacity-75'>
              {date.toLocaleString('es-AR')}
            </span>
            {canHandle && (
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
                    <DeleteNoticeDialog id={data.id as string} />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p>{data.description}</p>
        </CardContent>
      </Card>
    </li>
  );
}
