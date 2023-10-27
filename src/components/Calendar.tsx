import { type Date } from "@/types/date.types"
import { Day, Month } from "@/types/enums.types"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import { v4 } from "uuid"

const Calendar = ({
  data,
  selectedDay,
  handleSelectedDay,
  handleNextMonth,
  handlePrevMonth,
}: {
  data: Date[]
  selectedDay: Date | undefined
  handleSelectedDay: (day: Date) => void
  handleNextMonth?: () => void
  handlePrevMonth?: () => void
}) => {
  const currentDate = new Date()

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full">
        {currentDate.getMonth() < data[0]?.month ? (
          <ArrowLeftIcon
            className="w-6 text-yellow-regular cursor-pointer"
            onClick={handlePrevMonth}
          />
        ) : (
          <span className="w-6"></span>
        )}
        <h3 className="text-yellow-regular font-bold text-base">
          {Month[data[0]?.month]}
        </h3>
        {currentDate.getMonth() + 1 >= data[0]?.month ? ( // +1 for show two next months
          <ArrowRightIcon
            className="w-6 text-yellow-regular cursor-pointer"
            onClick={handleNextMonth}
          />
        ) : (
          <span className="w-6"></span>
        )}
      </div>
      <div className="grid grid-cols-7 place-items-center gap-6 w-full">
        {[0, 1, 2, 3, 4, 5, 6].map((index: number) => {
          return (
            <span
              className="text-white-extra-light text-sm"
              key={`dia-${index}`}
            >
              {Day[index]}
            </span>
          )
        })}
      </div>
      <div className="grid grid-cols-7 place-items-center gap-6 max-w-xl">
        {data.map((date) => {
          const isWeekend = date.dayWeek === 0

          const isToday =
            date.day === currentDate.getDate() &&
            date.month === currentDate.getMonth() &&
            date.year === currentDate.getFullYear()
          const isPast =
            date.day < currentDate.getDate() ||
            date.month < currentDate.getMonth()

          const isNextMonth = date.month > currentDate.getMonth()

          return (
            <span
              className={`${
                !isWeekend ? "text-white-regular" : "text-white-semi-light"
              } 
              ${
                isNextMonth
                  ? "text-white-regular cursor-pointer"
                  : isPast
                  ? "text-white-semi-light"
                  : "hover:cursor-pointer"
              }
              ${
                selectedDay?.day !== date?.day ||
                selectedDay?.month !== date?.month ||
                selectedDay?.year !== date?.year
                  ? "bg-transparent"
                  : "bg-yellow-regular"
              } grid place-items-center w-10 h-10 p-1 rounded-full border-2 ${
                isToday ? "border-yellow-regular" : "border-transparent"
              }`}
              onClick={() => {
                if (!isWeekend) {
                  if (!isPast || isNextMonth) {
                    handleSelectedDay(date)
                  }
                }
              }}
              key={`$${date.dateString}${v4()}`}
            >
              {date.day}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
