import Time from './Time';
import { type Hour } from '@/types/hour.types';
import { motion } from 'framer-motion';
const DayTime = ({ hours }: { hours: Hour[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='flex flex-col gap-6 px-3'
    >
      {hours?.map((hour) => {
        const delay = hours.indexOf(hour) * 0.05;
        return (
          <Time
            key={hour.hour}
            data={hour}
            delay={hours.indexOf(hour) === 0 ? 0 : delay}
          />
        );
      })}
    </motion.div>
  );
};

export default DayTime;
