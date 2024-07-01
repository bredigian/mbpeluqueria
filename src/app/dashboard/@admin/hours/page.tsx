import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  WeekdaysContainer,
  WeekdaysContainerSkeleton,
} from '@/components/weekdays-container';
import {
  WorkhoursContainer,
  WorkhoursContainerSkeleton,
} from '@/components/workhours-container';

import Link from 'next/link';
import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

type Props = {
  searchParams: {
    day?: string;
  };
};

export default function HoursPage({ searchParams }: Props) {
  const query = searchParams.day || '';

  return (
    <Screen className='flex flex-col gap-6'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/dashboard'>Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className='font-semibold text-primary'>
              Horarios
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Title>Horarios</Title>
      <Paragraph>
        Acá podrás visualizar y modificar los horarios habilitados para el
        sistema.
      </Paragraph>
      <Suspense fallback={<WeekdaysContainerSkeleton />}>
        <WeekdaysContainer />
      </Suspense>
      <Suspense key={query} fallback={<WorkhoursContainerSkeleton />}>
        <WorkhoursContainer query={query} />
      </Suspense>
    </Screen>
  );
}
