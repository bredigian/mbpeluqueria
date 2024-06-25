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
import { DeleteNoticeDialog } from './notices-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { INotice } from '@/types/notices.types';

type Props = {
  data: INotice;
};

export default function NoticeItem({ data }: Props) {
  const date = new Date(data.timestamp as Date);

  return (
    <li>
      <Card>
        <CardContent className='flex flex-col'>
          <div className='flex w-full justify-between'>
            <span className='text-sm font-medium opacity-75'>
              {date.toLocaleString('es-AR')}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size='icon' variant='outline'>
                  <DotsHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DeleteNoticeDialog id={data.id as string} />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p>{data.description}</p>
        </CardContent>
      </Card>
    </li>
  );
}
