import { SummaryItem } from '@/types/summary.types';

const SummaryItem = ({ data }: { data: SummaryItem }) => {
  return (
    <div className='flex items-center justify-between'>
      <span className='text-yellow-regular text-sm font-semibold'>
        {data.item}
      </span>
      <span className='text-white-semi-light text-sm'>{data.value}</span>
    </div>
  );
};

export default SummaryItem;
