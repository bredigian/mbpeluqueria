'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { HistoryContainer } from '@/components/history-container';
import Link from 'next/link';
import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import { Title } from '@/components/ui/title';

export default function HistoryPage() {
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
              Historial
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Title>Historial</Title>
      <Paragraph>
        En esta sección visualizarás el historial de tus turnos agendados.
      </Paragraph>
      <HistoryContainer />
    </Screen>
  );
}
