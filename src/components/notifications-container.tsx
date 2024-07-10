import Cookies from 'js-cookie';
import { INotification } from '@/types/notifications.types';
import { NotificationsDropdown } from './notifications-dropdown';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useLoading } from '@/hooks/use-loading';
import { useNotificationStore } from '@/store/notifications.store';
import { useRouter } from 'next/navigation';

export default function NotificationsContainer() {
  const token = Cookies.get('token');
  const { notifications, getAll } = useNotificationStore();
  const { status, handleStatus } = useLoading();
  const { push } = useRouter();

  const fetchData = async () => {
    try {
      await getAll(token as string);
      handleStatus('ready');
    } catch (error) {
      handleStatus('error');
    }
  };

  useEffect(() => {
    if (!token) push('/');
    fetchData();
  }, []);

  if (status === 'pending')
    return <ReloadIcon className='h-4 w-4 animate-spin' />;

  if (status === 'error') return <></>;

  return (
    <NotificationsDropdown notifications={notifications as INotification[]} />
  );
}
