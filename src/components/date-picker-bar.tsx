'use client';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { useDialog } from '@/hooks/use-dialog';

export default function DatePickerBar() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const { show, handleDialog } = useDialog();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set('date', value);
    else params.delete('date');

    replace(`${pathname}?${params.toString()}`);
  };

  const selectedDate = new Date(
    (searchParams.get('date')?.toString() as string) ?? new Date(),
  );

  return (
    <Popover open={show}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className='w-full justify-start font-normal'
          onClick={handleDialog}
        >
          {selectedDate.toLocaleDateString('es-AR') ?? 'Seleccione una fecha'}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='mt-2 w-auto p-0'
        align='center'
        side='bottom'
        onEscapeKeyDown={handleDialog}
      >
        <Calendar
          mode='single'
          onSelect={(value) => handleFilter(value?.toISOString() as string)}
          onDayClick={handleDialog}
        />
      </PopoverContent>
    </Popover>
  );
}
