import { RedirectType, redirect } from 'next/navigation';
import { WorkhourItem, WorkhourItemSkeleton } from './workhour-item';

import { IWeekday } from '@/types/weekdays.types';
import { IWorkhour } from '@/types/workhours.types';
import { cookies } from 'next/headers';
import { getAll } from '@/services/weekdays.service';
import { getAll as getAllWorkhours } from '@/services/workhours.service';

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

export async function WorkhoursContainer({ query }: Props) {
  if (!query) return <></>;

  const token = cookies().get('token');
  if (!token) redirect('/', RedirectType.push);

  const weekdays = await getAll(token?.value as string);
  const workhours = await getAllWorkhours(token?.value as string);

  if (weekdays instanceof Error) return <span>{weekdays.message}</span>;
  if (workhours instanceof Error) return <span>{workhours.message}</span>;

  const selectedWeekday = query
    ? (weekdays as IWeekday[]).find(
        (weekday) => weekday.id?.toLowerCase() === query.toLowerCase(),
      )
    : weekdays;

  return (
    <section className='flex flex-col gap-6 last:mb-6'>
      {(workhours as IWorkhour[]).map((workhour) => {
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
