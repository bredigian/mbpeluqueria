import { Button } from './ui/button';
import Cookies from 'js-cookie';
import { IWeekday } from '@/types/weekdays.types';
import { ReloadIcon } from '@radix-ui/react-icons';
import { ReserveShiftDialog } from './dashboard-dialog';
import { useEffect } from 'react';
import { useLoading } from '@/hooks/use-loading';
import { useRouter } from 'next/navigation';
import { useWeekdayStore } from '@/store/weekdays.store';

export default function ReserveShiftDialogContainer() {
  const token = Cookies.get('token');
  const { push } = useRouter();
  const { status, handleStatus } = useLoading();
  const {
    availableWeekdays,
    unAvailableWeekdays,
    getAllWithUnavailableWorkhours,
  } = useWeekdayStore();

  const fetchData = async () => {
    try {
      await getAllWithUnavailableWorkhours(token as string);
      setTimeout(() => {
        handleStatus('ready');
      }, 200);
    } catch (error) {
      handleStatus('error');
    }
  };

  useEffect(() => {
    if (!token) push('/');
    fetchData();
  }, []);

  if (status === 'pending')
    return (
      <Button disabled type='button' variant='secondary'>
        <ReloadIcon className='h-4 w-4 animate-spin' />
      </Button>
    );
  if (status === 'error') return <></>;

  return (
    <ReserveShiftDialog
      availableDays={availableWeekdays as IWeekday[]}
      unavailableDays={unAvailableWeekdays as IWeekday[]}
    />
  );
}
