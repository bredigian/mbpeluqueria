'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import Link from 'next/link';
import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import { Title } from '@/components/ui/title';
import { WeekdaysContainer } from '@/components/weekdays-container';
import { WorkhoursContainer } from '@/components/workhours-container';

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
      <WeekdaysContainer />
      <WorkhoursContainer query={query} />
    </Screen>
  );
}
