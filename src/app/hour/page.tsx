import ButtonBack from "@/components/ButtonBack"
import DayTime from "@/components/DayTime"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { hours } from "@/constants/hours"

const Hour = () => {
  return (
    <main className="flex flex-col gap-8 py-12 px-10">
      <ButtonBack />
      <div className="flex flex-col gap-2">
        <Title>Horario</Title>
        <Subtitle>Seleccioná uno de los horarios disponibles</Subtitle>
      </div>
      <DayTime hours={hours} />
    </main>
  )
}

export default Hour
