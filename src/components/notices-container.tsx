import { NoticeItem, NoticeItemSkeleton } from './notice-item';
import { RedirectType, redirect } from 'next/navigation';

import { INotice } from '@/types/notices.types';
import { TResponse } from '@/types/responses.types';
import { cookies } from 'next/headers';
import { getAll } from '@/services/notices.service';

type Props = {
  canHandleNotices: boolean;
};

export function NoticesContainerSkeleton() {
  return (
    <section className='mb-6 flex flex-col gap-6'>
      <ul className='flex flex-col gap-6'>
        <NoticeItemSkeleton />
        <NoticeItemSkeleton />
        <NoticeItemSkeleton />
      </ul>
    </section>
  );
}

export async function NoticesContainer({ canHandleNotices }: Props) {
  const token = cookies().get('token');
  if (!token) redirect('/', RedirectType.push);

  const notices = (await getAll(token?.value as string)) as TResponse;

  return (
    <section>
      {notices instanceof Error ? (
        <span>{notices.message}</span>
      ) : (
        <ul className='flex flex-col gap-6'>
          {(notices as INotice[]).length > 0 ? (
            (notices as INotice[]).map((notice) => (
              <NoticeItem
                key={notice.id as string}
                data={notice}
                canHandle={canHandleNotices}
              />
            ))
          ) : (
            <span>No se encontraron avisos.</span>
          )}
        </ul>
      )}
    </section>
  );
}
