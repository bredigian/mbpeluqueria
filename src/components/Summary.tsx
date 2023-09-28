import { Summary } from "@/types/summary.types"
import Button from "./Button"
import SummaryItem from "./SummaryItem"

const Summary = ({ data }: { data: Summary }) => {
  return (
    <div className="flex flex-col gap-16 bg-dark-bold p-8 rounded-3xl">
      <div className="flex flex-col gap-6">
        <SummaryItem data={{ item: "Nombre", value: data.name }} />
        <SummaryItem data={{ item: "Teléfono", value: data.phone }} />
        <SummaryItem data={{ item: "Día", value: data.day }} />
        <SummaryItem data={{ item: "Horario", value: data.hour }} />
      </div>
      <Button>Confirmar</Button>
    </div>
  )
}

export default Summary
