'use client';

import { Hour } from '@/types/hour.types';
import { motion } from 'framer-motion';
import { useRouter } from 'next-nprogress-bar';
import { useShiftData } from '@/store/shift-data';

const Time = ({ data, delay }: { data: Hour; delay: number }) => {
  const { push } = useRouter();
  const { setHour } = useShiftData();

  const handleSelect = () => {
    if (data.isAvailable) {
      setHour(data);
      push('/confirmation');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: delay }}
      onClick={handleSelect}
      className={`flex w-full items-center justify-between ${
        data.isAvailable
          ? 'bg-dark-regular hover:cursor-pointer'
          : 'bg-dark-light'
      } rounded-full px-6 py-4`}
    >
      <span
        className={`${
          data.isAvailable ? 'text-yellow-regular' : 'text-yellow-light'
        } text-xl font-medium`}
      >
        {data.hour}
      </span>
      <span
        className={`${
          data.isAvailable ? 'text-yellow-regular' : 'text-yellow-light'
        } text-sm font-medium`}
      >
        {data.isAvailable ? 'Disponible' : 'No disponible'}
      </span>
    </motion.div>
  );
};

export default Time;
