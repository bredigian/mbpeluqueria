import { Checkbox } from './ui/checkbox';
import Cookies from 'js-cookie';
import { DateTime } from 'luxon';
import { INotification } from '@/types/notifications.types';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useNotificationStore } from '@/store/notifications.store';

type Props = {
  notification: INotification;
};

export function NotificationItem({ notification }: Props) {
  const { getAll, update } = useNotificationStore();

  const notificationTimestamp = DateTime.fromISO(
    notification.timestamp as string,
  )
    .setZone('America/Argentina/Buenos_Aires')
    .setLocale('es-AR');

  const shiftTimestamp = DateTime.fromISO(
    (notification.shift?.timestamp as string) ??
      (notification.shiftTimestamp as string),
  )
    .setZone('America/Argentina/Buenos_Aires')
    .setLocale('es-AR');

  const markAsRead = async () => {
    try {
      const token = Cookies.get('token');
      toast.promise(update(token as string, notification?.id as string), {
        loading: 'Modificando...',
        success: async () => {
          await getAll(token as string);
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
          {notificationTimestamp.toLocaleString(DateTime.DATETIME_SHORT)}
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
        {shiftTimestamp.toLocaleString(DateTime.DATETIME_SHORT)}.
      </span>
    </div>
  );
}
