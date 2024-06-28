'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { IoNotificationsOutline, IoNotificationsSharp } from 'react-icons/io5';

import { Button } from './ui/button';
import { INotification } from '@/types/notifications.types';
import { NotificationItem } from './notification-item';

type Props = {
  notifications: INotification[];
};

export const NotificationsDropdown = ({ notifications }: Props) => {
  const quantity = notifications.filter(
    (notification) => !notification.readed,
  ).length;

  return (
    <DropdownMenu key='notifications-dropdown'>
      <DropdownMenuTrigger asChild>
        <Button className='relative' size='icon' variant='ghost'>
          {quantity > 0 ? (
            <IoNotificationsSharp size={24} />
          ) : (
            <IoNotificationsOutline size={24} />
          )}
          {quantity > 0 && (
            <div className='absolute right-0 top-0 grid h-5 w-5 place-items-center rounded-full bg-[#e1b871]'>
              <small className='text-black'>{quantity}</small>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-4 max-h-[560px] w-72 overflow-auto'>
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
