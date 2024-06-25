import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { AddNoticeDialog } from '@/components/notices-dialog';
import Link from 'next/link';
import NoticesContainer from '@/components/notices-container';
import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

export default function NoticesPage() {
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
              Avisos
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Title>Avisos</Title>
      <Paragraph>
        En este apartado podrás gestionar los avisos que deseas mostrarle a los
        clientes.
      </Paragraph>
      <aside>
        <AddNoticeDialog />
      </aside>
      <Suspense fallback={<div>Loading...</div>}>
        <NoticesContainer canHandleNotices />
      </Suspense>
    </Screen>
  );
}
