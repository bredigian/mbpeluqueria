'use client';

import { PiWarningCircle } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useNotices } from '@/store/notices';
import { useShiftData } from '@/store/shift-data';

const Notices = () => {
  const { getNotices, isNotices, notices } = useNotices();
  const { user } = useShiftData();

  const fetchData = async () => {
    try {
      await getNotices(user?._id as string);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isNotices)
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='flex w-full flex-col items-start gap-2 overflow-hidden rounded-2xl bg-yellow-600 p-4'
      >
        <div className='flex w-full items-center gap-2'>
          <h1 className='text-lg font-medium text-black'>Avisos</h1>
          <PiWarningCircle className='h-6 w-6 text-black' />
        </div>
        <ul className='flex flex-col items-start gap-2'>
          {notices?.map((notice) => {
            return (
              <li key={notice._id} className='text-sm text-black'>
                {notice.title}
              </li>
            );
          })}
        </ul>
      </motion.section>
    );
  else return <></>;
};

export default Notices;
