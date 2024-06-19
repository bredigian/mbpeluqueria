import { CONTACT_NUMBER } from '@/constants/contact';
import { Day } from '@/types/enums.types';
import { FaChevronDown } from 'react-icons/fa';
import Modal from './Modal';
import Subtitle from './Subtitle';
import { Summary } from '@/types/summary.types';
import Title from './Title';
import { connectToWebSocket } from '@/utils/io';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useShifts } from '@/store/shifts';
import { useState } from 'react';

const Shift = ({
  data,
  delay,
  active,
  handleActive,
}: {
  data: Summary;
  delay?: number;
  active: string;
  handleActive: () => void;
}) => {
  const currentDate = new Date();
  const isPast =
    data.day.day < currentDate.getDate() ||
    data.day.month < currentDate.getMonth() ||
    data.day.year < currentDate.getFullYear() ||
    (data.day.day <= currentDate.getDate() &&
      data.hour.hour <
        `${currentDate.getHours()}:${currentDate.getMinutes()}}`);

  const isNextMonth =
    data?.day?.month > currentDate.getMonth() &&
    data?.day?.year === currentDate.getFullYear();
  const isNextYear = data?.day?.year > currentDate.getFullYear();

  const { cancelShift } = useShifts();

  const [showModal, setShowModal] = useState(false);

  const handleModal = async () => {
    setShowModal(!showModal);
  };

  const handleCancel = async () => {
    const socket = connectToWebSocket(data?.user?.name as string);
    try {
      await cancelShift(data?._id);
      socket.emit(
        'cancel-shift',
        {
          id: data?._id,
          day: data?.day.dateString,
          user: data?.user.name,
          time: data?.hour.hour,
          type: 'cancel',
        },
        () => {
          socket.disconnect();
        },
      );
      handleModal();
      toast.success('Turno cancelado con éxito');
      window.location.href = `https://wa.me/${CONTACT_NUMBER}?text=*CANCELACIÓN%20DE%20TURNO*%20✖️💈%0A*Nombre:*%20${data?.user?.name}%0A*Nro.%20de%20teléfono:*%20${data.user.phone}%0A*Día:*%20${data.day.dateString}%0A*Horario:*%20${data.hour.hour}`;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay }}
      className={`${
        !isPast || isNextMonth || isNextYear
          ? 'bg-dark-regular'
          : 'bg-dark-light'
      } flex w-full flex-col items-center gap-4 overflow-hidden rounded-3xl px-6 py-4 duration-200 ${
        active !== data?._id ? 'h-[55px]' : 'h-36'
      }`}
    >
      <div className='flex w-full items-center justify-between'>
        <span
          className={`${
            !isPast || isNextMonth || isNextYear
              ? 'text-yellow-regular'
              : 'text-yellow-light'
          } text-base font-medium`}
        >
          {Day[data?.day?.dayWeek]}. {data?.day?.day}/{data?.day?.month + 1}/
          {data?.day.year}
        </span>
        <span
          className={`${
            !isPast || isNextMonth || isNextYear
              ? 'text-yellow-regular'
              : 'text-yellow-light'
          } text-base font-semibold`}
        >
          {data?.hour?.hour}
        </span>
        <FaChevronDown
          onClick={!isPast || isNextMonth || isNextYear ? handleActive : null}
          className={`h-4 w-4 ${
            !isPast || isNextMonth ? 'text-yellow-regular' : 'text-yellow-light'
          } ${
            active !== data?._id ? 'rotate-0 transform' : 'rotate-180 transform'
          } duration-200`}
        />
      </div>
      <div className='flex w-full items-end justify-between'>
        <Subtitle variant='text-xs' maxWidth='max-w-[146px]'>
          Al cancelar el turno, serás redirigido a WhatsApp para comunicarlo.
        </Subtitle>
        <button
          onClick={
            !isPast || isNextMonth || isNextYear ? handleModal : () => null
          }
          className='bg-yellow-regular text-dark-bold rounded-full px-4 py-2 text-sm font-medium'
        >
          Cancelar
        </button>
      </div>

      {showModal && (
        <Modal>
          <div className='bg-dark-bold flex w-[300px] flex-col items-center gap-4 rounded-[55px] p-8'>
            <Title style='text-yellow-regular'>¿Estás seguro?</Title>
            <button
              onClick={handleCancel}
              type='button'
              className='text-dark-bold bg-yellow-regular mt-2 w-[140px] rounded-full py-2'
            >
              Confirmar
            </button>
            <button
              onClick={handleModal}
              type='button'
              className='text-yellow-regular border-yellow-regular w-[140px] rounded-full border-2 py-2'
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </motion.div>
  );
};

export default Shift;
