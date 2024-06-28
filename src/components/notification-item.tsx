import { Checkbox } from './ui/checkbox';
import Cookies from 'js-cookie';
import { INotification } from '@/types/notifications.types';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';
import { update } from '@/services/notifications.service';

type Props = {
  notification: INotification;
};

export function NotificationItem({ notification }: Props) {
  const notificationTimestamp = new Date(notification.timestamp as Date);
  const shiftTimestamp = new Date(
    notification.shift?.timestamp ?? notification.shiftTimestamp,
  );

  const markAsRead = async () => {
    try {
      const token = Cookies.get('token');
      toast.promise(update(token as string, notification?.id as string), {
        loading: 'Modificando...',
        success: () => {
          revalidateDataByTag('notifications');
          return 'Notificación marcada como leída.';
        },
      });
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <div className='flex flex-col gap-1 p-2'>
      <div className='flex w-full items-center justify-between'>
        <small
          className={cn(
            notification.readed ? 'line-through opacity-45' : 'opacity-100',
          )}
        >
          {notificationTimestamp.toLocaleDateString('es-AR')}{' '}
          {notificationTimestamp.toLocaleTimeString('es-AR', {
            hour12: false,
          })}
        </small>
        <div className='flex items-center gap-2'>
          <Label htmlFor={`read-notification-${notification.id}`}>Leído</Label>
          <Checkbox
            id={`read-notification-${notification.id}`}
            disabled={notification.readed}
            defaultChecked={notification.readed}
            onClick={markAsRead}
          />
        </div>
      </div>
      <span
        className={cn(
          'font-medium',
          notification.readed ? 'line-through opacity-45' : 'opacity-100',
        )}
      >
        {notification.description}
      </span>
      <span
        className={cn(
          notification.readed ? 'line-through opacity-45' : 'opacity-100',
        )}
      >
        {notification.User?.name} el día{' '}
        {shiftTimestamp.toLocaleDateString('es-AR')} a las{' '}
        {shiftTimestamp.toLocaleTimeString('es-AR', {
          hour12: false,
        })}
        .
      </span>
    </div>
  );
}
