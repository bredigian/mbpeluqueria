import { BsCalendarCheck, BsCalendarDate } from 'react-icons/bs';

import MenuItem from './MenuItem';

const Menu = () => {
  return (
    <ul className='flex w-full flex-col items-center gap-4'>
      <MenuItem href='/dashboard/date'>
        <BsCalendarDate className='text-yellow-regular h-8 w-8' />
        <span className='text-yellow-regular text-lg font-medium'>
          Reservar
        </span>
      </MenuItem>
      <MenuItem href='/dashboard/my-shifts'>
        <BsCalendarCheck className='text-yellow-regular h-8 w-8' />
        <span className='text-yellow-regular text-lg font-medium'>
          Mis turnos
        </span>
      </MenuItem>
    </ul>
  );
};

export default Menu;
