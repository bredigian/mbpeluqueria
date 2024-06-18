import { BsCalendarCheck, BsCalendarDate } from "react-icons/bs"

import MenuItem from "./MenuItem"

const Menu = () => {
  return (
    <ul className="flex flex-col gap-4 items-center w-full">
      <MenuItem href="/dashboard/date">
        <BsCalendarDate className="w-8 h-8 text-yellow-regular" />
        <span className="text-yellow-regular text-lg font-medium">
          Reservar
        </span>
      </MenuItem>
      <MenuItem href="/dashboard/my-shifts">
        <BsCalendarCheck className="w-8 h-8 text-yellow-regular" />
        <span className="text-yellow-regular text-lg font-medium">
          Mis turnos
        </span>
      </MenuItem>
    </ul>
  )
}

export default Menu
