import { type Date } from "@/types/date.types"
import { Month } from "@/types/month.types"

const Calendar = ({
  data,
  selectedDay,
  handleSelectedDay,
}: {
  data: Date[]
  selectedDay: Date | undefined
  handleSelectedDay: (day: Date) => void
}) => {
  const currentDate = new Date()

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-yellow-regular font-bold text-base">
        {Month[data[0].month]}
      </h3>
      <div className="grid grid-cols-7 place-items-center gap-6 max-w-xl">
        {data.map((date) => {
          const isWeekend = date.dayWeek === 0
          const isToday = date.dateString === currentDate.toDateString()
          const isPast = date.day < currentDate.getDate()

          return (
            <span
              className={`${
                !isWeekend ? "text-white-regular" : "text-white-semi-light"
              } 
              ${isPast && "text-white-semi-light"}
              ${
                selectedDay?.day !== date?.day
                  ? "bg-transparent"
                  : "bg-yellow-regular"
              } grid place-items-center w-10 h-10 p-1 rounded-full border-2 ${
                isToday ? "border-yellow-regular" : "border-transparent"
              }`}
              onClick={() => {
                if (!isWeekend) {
                  if (!isPast) handleSelectedDay(date)
                }
              }}
              key={date.dateString}
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
