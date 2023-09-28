import ButtonBack from "@/components/ButtonBack"
import ButtonNext from "@/components/ButtonNext"
import Calendar from "@/components/Calendar"
import Link from "next/link"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { useGetDays } from "@/hooks/get-days"

const Date = () => {
  const calendar = useGetDays()

  return (
    <main className="flex flex-col gap-8 py-12 px-10">
      <ButtonBack />
      <div className="flex flex-col items-start gap-2">
        <Title>Fecha</Title>
        <Subtitle>
          Seleccioná la fecha en la que desees reservar el turno
        </Subtitle>
      </div>
      <Calendar data={calendar} />
      <Link className="self-end mt-16" href={"/hour"}>
        <ButtonNext>Continuar</ButtonNext>
      </Link>
    </main>
  )
}

export default Date
