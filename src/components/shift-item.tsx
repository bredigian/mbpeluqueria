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

type Props = {
  data: IShift;
};

export default function ShiftItem({ data }: Props) {
  const date = new Date(data.timestamp);
  const dateToString = date
    .toLocaleDateString('es-AR', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })
    .replaceAll(',', '.');

  return (
    <li>
      <Card>
        <CardContent className='flex w-full items-start justify-between'>
          <div className='flex flex-col gap-2'>
            <small className='text-base opacity-75'>
              {dateToString.charAt(0).toUpperCase() + dateToString.slice(1)}
            </small>
            <span className='text-3xl font-medium'>
              {date
                .toLocaleTimeString('es-AR', { hour12: false })
                .substring(0, 5)}
            </span>
          </div>
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
                <DropdownMenuItem>Cancelar</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </li>
  );
}
