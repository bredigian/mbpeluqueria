import { INotice } from '@/types/notices.types';
import NoticeItem from './notice-item';
import { TResponse } from '@/types/responses.types';
import { getAll } from '@/services/notices.service';

export default async function NoticesContainer() {
  const notices = (await getAll()) as TResponse;

  return (
    <section>
      {notices instanceof Error ? (
        <span>{notices.message}</span>
      ) : (
        <ul className='flex flex-col gap-6'>
          {(notices as INotice[]).length > 0 ? (
            (notices as INotice[]).map((notice) => (
              <NoticeItem key={notice.id as string} data={notice} />
            ))
          ) : (
            <span>No se encontraron avisos.</span>
          )}
        </ul>
      )}
    </section>
  );
}
