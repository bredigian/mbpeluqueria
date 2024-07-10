import { NoticeItem, NoticeItemSkeleton } from './notice-item';

import Cookies from 'js-cookie';
import { INotice } from '@/types/notices.types';
import { useEffect } from 'react';
import { useLoading } from '@/hooks/use-loading';
import { useNoticeStore } from '@/store/notices.store';
import { useRouter } from 'next/navigation';

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

export function NoticesContainer({ canHandleNotices }: Props) {
  const token = Cookies.get('token');
  const { notices, getAll } = useNoticeStore();
  const { status, handleStatus } = useLoading();
  const { push } = useRouter();

  const fetchData = async () => {
    try {
      await getAll(token as string);

      setTimeout(() => {
        handleStatus('ready');
      }, 200);
    } catch (error) {
      handleStatus('error');
    }
  };

  useEffect(() => {
    if (!token) push('/');
    fetchData();
  }, []);

  if (status === 'pending') return <NoticesContainerSkeleton />;
  if (status === 'error') return <div>Error</div>;

  return (
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
  );
}

// export async function NoticesContainerForUser() {
//   const token = cookies().get('token');
//   if (!token) redirect('/', RedirectType.push);

//   const notices = (await getAll(token?.value as string)) as TResponse;

//   return (
//     <section className={(notices as INotice[]).length < 1 ? 'hidden' : ''}>
//       {notices instanceof Error ? (
//         <span>{notices.message}</span>
//       ) : (
//         <NoticesCarousel notices={notices as INotice[]} />
//       )}
//     </section>
//   );
// }
