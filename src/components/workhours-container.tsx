import { WorkhourItem, WorkhourItemSkeleton } from './workhour-item';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { IWeekday } from '@/types/weekdays.types';
import { IWorkhour } from '@/types/workhours.types';
import { useLoading } from '@/hooks/use-loading';
import { useRouter } from 'next/navigation';
import { useWeekdayStore } from '@/store/weekdays.store';
import { useWorkhourStore } from '@/store/workhours.store';

type Props = {
  query: string;
};

export function WorkhoursContainerSkeleton() {
  return (
    <section className='flex flex-col gap-6 last:mb-6'>
      <WorkhourItemSkeleton />
      <WorkhourItemSkeleton />
      <WorkhourItemSkeleton />
      <WorkhourItemSkeleton />
      <WorkhourItemSkeleton />
    </section>
  );
}

export function WorkhoursContainer({ query }: Props) {
  if (!query) return <></>;

  const token = Cookies.get('token');
  const { workhours, getAllWorkhours } = useWorkhourStore();
  const { weekdays, getAll } = useWeekdayStore();
  const { status, handleStatus } = useLoading();
  const { push } = useRouter();

  const [selectedWeekday, setSelectedWeekday] = useState<IWeekday | null>();

  const fetchData = async () => {
    try {
      handleStatus('pending');
      await getAll(token as string);
      await getAllWorkhours(token as string);
    } catch (error) {
      handleStatus('error');
    }
  };

  useEffect(() => {
    if (!token) push('/');
    fetchData();
  }, [query]);

  useEffect(() => {
    setSelectedWeekday(
      weekdays?.find((item) => item.id?.toLowerCase() === query.toLowerCase()),
    );

    setTimeout(() => {
      handleStatus('ready');
    }, 200);
  }, [weekdays]);

  if (status === 'pending') return <WorkhoursContainerSkeleton />;
  if (status === 'error') return <div>Error</div>;

  return (
    <section className='flex flex-col gap-6 last:mb-6'>
      {(workhours as IWorkhour[])?.map((workhour) => {
        return (
          <WorkhourItem
            key={workhour.id}
            workhour={workhour}
            selectedWeekday={selectedWeekday as IWeekday}
          />
        );
      })}
    </section>
  );
}
