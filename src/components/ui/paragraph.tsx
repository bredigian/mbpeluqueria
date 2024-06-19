import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Paragraph({
  children,
  className,
}: {
  children: string | ReactNode;
  className?: string;
}) {
  return <p className={cn('leading-7', className)}>{children}</p>;
}
