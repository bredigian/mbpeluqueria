import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
};
export default function Screen({ children, className }: Props) {
  return (
    <main className={cn('min-h-dvh w-full p-6', className)}>{children}</main>
  );
}
