import { RedirectType, redirect } from 'next/navigation';

import { INotification } from '@/types/notifications.types';
import { NotificationsDropdown } from './notifications-dropdown';
import { TResponse } from '@/types/responses.types';
import { cookies } from 'next/headers';
import { getAll } from '@/services/notifications.service';

export default async function NotificationsContainer() {
  const token = cookies().get('token');
  if (!token) redirect('/', RedirectType.push);

  const notifications = (await getAll(token?.value as string)) as TResponse;

  return (
    <section>
      {notifications instanceof Error ? (
        <span>{notifications.message}</span>
      ) : (
        <NotificationsDropdown
          notifications={notifications as INotification[]}
        />
      )}
    </section>
  );
}
