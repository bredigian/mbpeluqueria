import { TResponse } from '@/types/responses.types';
import { cookies } from 'next/headers';
import { getAllByUserId } from '@/services/shifts.service';

export default async function ShiftsContainer() {
  const token = cookies().get('token');

  const shifts = (await getAllByUserId(token?.value as string)) as TResponse;

  console.log(shifts);
}
