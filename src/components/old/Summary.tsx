import { Summary } from '@/types/summary.types';
import Button from './Button';
import SummaryItem from './SummaryItem';
import { Pulsar } from '@uiball/loaders';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { CONTACT_NUMBER } from '@/constants/contact';
import Link from 'next/link';

const Summary = ({
  data,
  sending,
  isOk,
  onConfirm,
}: {
  data: Summary;
  sending?: boolean;
  isOk?: boolean;
  onConfirm?: () => void;
}) => {
  return (
    <div className='bg-dark-regular flex min-h-[370px] flex-col gap-16 rounded-3xl p-8'>
      <div className='flex flex-col gap-6'>
        <SummaryItem data={{ item: 'Nombre', value: data.user?.name }} />
        <SummaryItem data={{ item: 'Teléfono', value: data.user?.phone }} />
        <SummaryItem
          data={{
            item: 'Día',
            value: data.day?.dateString,
          }}
        />
        <SummaryItem data={{ item: 'Horario', value: data.hour?.hour }} />
      </div>
      <div className='h-22 grid place-items-center self-center'>
        {sending ? (
          <Pulsar size={40} color='#D2BF9D' />
        ) : isOk ? (
          <div className='flex flex-col items-center gap-2'>
            <CheckCircleIcon className='text-yellow-regular h-16 w-16' />
            <span className='text-yellow-regular text-xs font-semibold'>
              ¡Turno confirmado!
            </span>
          </div>
        ) : (
          <Button
            backgroundColor='bg-white-light'
            textColor='text-dark-regular'
            onClick={onConfirm as any}
          >
            Confirmar
          </Button>
        )}
      </div>
      {isOk && (
        <p className='text-white-semi-light text-center text-xs'>
          Podés cancelar el turno accediendo a{' '}
          <Link
            href='/dashboard/my-shifts'
            className='text-yellow-regular underline'
          >
            Mis turnos
          </Link>{' '}
          o haciendo click en este{' '}
          <a
            href={`https://api.whatsapp.com/send?phone=${CONTACT_NUMBER}&text=*❌%20Cancelación%20de%20turno%20❌*%0A*Nombre:*%20_${data.user.name}_%0A*Teléfono:*%20_${data.user.phone}_%0A*Día:*%20_${data.day.dateString}_%0A*Horario:*%20_${data.hour.hour}_`}
            target='_blank'
            className='text-yellow-regular underline'
          >
            link
          </a>
        </p>
      )}
    </div>
  );
};

export default Summary;
