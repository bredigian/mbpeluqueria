import { IWeekday } from '@/types/weekdays.types';
import { IWorkhour } from '@/types/workhours.types';
import WorkhourItem from './workhour-item';
import { getAll } from '@/services/weekdays.service';
import { getAll as getAllWorkhours } from '@/services/workhours.service';

type Props = {
  query: string;
};

export default async function WorkhoursContainer({ query }: Props) {
  if (!query) return <></>;

  const weekdays = await getAll();
  const workhours = await getAllWorkhours();

  if (weekdays instanceof Error) return <span>{weekdays.message}</span>;
  if (workhours instanceof Error) return <span>{workhours.message}</span>;

  const selectedWeekday = query
    ? (weekdays as IWeekday[]).find(
        (weekday) => weekday.id?.toLowerCase() === query.toLowerCase(),
      )
    : weekdays;

  return (
    <section className='flex flex-col gap-6'>
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
