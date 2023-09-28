import { type Date } from "@/types/date.types"

const Calendar = ({
  data,
  selectedDay,
  handleSelectedDay,
}: {
  data: Date[]
  selectedDay: Date | undefined
  handleSelectedDay: (day: Date) => void
}) => {
  return (
    <div className="grid grid-cols-7 place-items-center gap-6 max-w-xl">
      {data.map((date) => {
        const isWeekend = date.dayWeek === 0 || date.dayWeek === 6
        const isToday = date.dateString === new Date().toDateString()
        return (
          <span
            className={`${
              !isWeekend ? "text-white-regular" : "text-white-semi-light"
            } ${
              selectedDay?.day !== date?.day
                ? "bg-transparent"
                : "bg-yellow-regular text-black"
            } grid place-items-center w-10 h-10 p-1 rounded-full border-2 ${
              isToday ? "border-yellow-regular" : "border-transparent"
            }`}
            onClick={() => {
              if (!isWeekend) handleSelectedDay(date)
            }}
            key={date.dateString}
          >
            {date.day}
          </span>
        )
      })}
    </div>
  )
}

export default Calendar
