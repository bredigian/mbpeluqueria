'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import DatePickerBar from '@/components/date-picker-bar';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import { ShiftsContainer } from '@/components/shifts-container';
import { Title } from '@/components/ui/title';

type Props = {
  searchParams: {
    date?: string;
  };
};

export default function ShiftsPage({ searchParams }: Props) {
  const query =
    searchParams?.date ||
    DateTime.now()
      .setZone('America/Argentina/Buenos_Aires')
      .setLocale('es-AR')
      .toISO();

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
              Turnos
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Title>Turnos</Title>
      <Paragraph>
        Visualizá los turnos filtrando por la fecha seleccionada.
      </Paragraph>
      <aside>
        <DatePickerBar />
      </aside>
      <ShiftsContainer query={query as string} isShiftsPath isForAdmin />
    </Screen>
  );
}
