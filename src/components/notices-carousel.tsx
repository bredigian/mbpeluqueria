'use client';

import { INotice } from '@/types/notices.types';
import { NoticeItem } from './notice-item';
import { useCarousel } from '@/hooks/use-carousel';

type Props = {
  notices: INotice[];
};

export const NoticesCarousel = ({ notices }: Props) => {
  const { emblaRef } = useCarousel();

  return (
    <div ref={emblaRef} className='embla relative z-10 overflow-hidden'>
      <div className='embla__container flex'>
        {notices.map((notice) => (
          <NoticeItem
            key={notice.id}
            data={notice}
            className='embla__slide mx-2 shrink-0 grow basis-3/4 list-none'
            isForUser
          />
        ))}
      </div>
    </div>
  );
};
