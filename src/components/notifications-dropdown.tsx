'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  IoNotificationsOutline,
  IoNotificationsSharp,
  IoTrashOutline,
} from 'react-icons/io5';

import { Button } from './ui/button';
import Cookies from 'js-cookie';
import { INotification } from '@/types/notifications.types';
import { NotificationItem } from './notification-item';
import { toast } from 'sonner';
import { useNotificationStore } from '@/store/notifications.store';

type Props = {
  notifications: INotification[];
};

export const NotificationsDropdown = ({ notifications }: Props) => {
  const { getAll, deleteAll } = useNotificationStore();
  const quantity = notifications.filter(
    (notification) => !notification.readed,
  ).length;

  const clean = async () => {
    try {
      const token = Cookies.get('token');
      toast.promise(deleteAll(token as string), {
        loading: 'Limpiando...',
        success: async () => {
          await getAll(token as string);
          return 'Todas las notificaciones han sido eliminadas.';
        },
      });
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

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
        <DropdownMenuLabel className='flex w-full items-center justify-between'>
          Notificaciones{' '}
          <Button variant='ghost' size='icon' onClick={clean}>
            <IoTrashOutline size={24} />
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <DropdownMenuItem>No hay notificaciones.</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
