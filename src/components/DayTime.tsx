import Time from "./Time"
import { type Hour as HourType } from "@/types/hour.types"

const DayTime = ({ hours }: { hours: HourType[] }) => {
  return (
    <div className="flex flex-col gap-6">
      {hours?.map((hour) => {
        return <Time key={hour.hour} data={hour} />
      })}
    </div>
  )
}

export default DayTime
