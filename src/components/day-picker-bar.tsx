'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { IWeekday } from '@/types/weekdays.types';

type Props = {
  weekdays: IWeekday[];
};

export default function DayPickerBar({ weekdays }: Props) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (value: string) => {
    const parsedValue = value.trim();
    const params = new URLSearchParams(searchParams);
    if (parsedValue) params.set('day', parsedValue.toLowerCase());
    else params.delete('day');

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={searchParams.get('day')?.toString()}
      onValueChange={(value) => handleFilter(value)}
    >
      <SelectTrigger id='filter' className='max-w-48'>
        <SelectValue placeholder='Seleccione una día' />
      </SelectTrigger>
      <SelectContent className='max-w-48'>
        {weekdays.map((weekday) => (
          <SelectItem key={weekday.id} value={weekday.id as string}>
            {weekday.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
