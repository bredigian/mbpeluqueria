import { Summary } from "@/types/summary.types"
import Button from "./Button"
import SummaryItem from "./SummaryItem"
import { Pulsar } from "@uiball/loaders"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

const Summary = ({
  data,
  sending,
  isOk,
  onConfirm,
}: {
  data: Summary
  sending: boolean
  isOk: boolean
  onConfirm: () => void
}) => {
  return (
    <div className="flex flex-col gap-16 bg-dark-bold p-8 rounded-3xl min-h-[370px]">
      <div className="flex flex-col gap-6">
        <SummaryItem data={{ item: "Nombre", value: data.user?.name }} />
        <SummaryItem data={{ item: "Teléfono", value: data.user?.phone }} />
        <SummaryItem data={{ item: "Día", value: data.day?.fullDateString }} />
        <SummaryItem data={{ item: "Horario", value: data.hour?.hour }} />
      </div>
      <div className="h-22 self-center grid place-items-center">
        {sending ? (
          <Pulsar size={40} color="#D2BF9D" />
        ) : isOk ? (
          <div className="flex flex-col items-center gap-2">
            <CheckCircleIcon className="w-16 h-16 text-yellow-regular" />
            <span className="text-xs text-yellow-regular font-semibold">
              ¡Turno confirmado!
            </span>
          </div>
        ) : (
          <Button onClick={onConfirm}>Confirmar</Button>
        )}
      </div>
    </div>
  )
}

export default Summary
