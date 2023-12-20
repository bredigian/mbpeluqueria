import { CONTACT_NUMBER } from "@/constants/contact"
import { Day } from "@/types/enums.types"
import { FaChevronDown } from "react-icons/fa"
import Modal from "./Modal"
import Subtitle from "./Subtitle"
import { Summary } from "@/types/summary.types"
import Title from "./Title"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useRouter } from "next-nprogress-bar"
import { useShifts } from "@/store/shifts"
import { useState } from "react"

const Shift = ({
  data,
  delay,
  active,
  handleActive,
}: {
  data: Summary
  delay?: number
  active: string
  handleActive: () => void
}) => {
  const currentDate = new Date()
  const isPast =
    data.day.day < currentDate.getDate() ||
    data.day.month < currentDate.getMonth() ||
    data.day.year < currentDate.getFullYear() ||
    (data.day.day <= currentDate.getDate() &&
      data.hour.hour < `${currentDate.getHours()}:${currentDate.getMinutes()}}`)

  const isNextMonth = data?.day?.month > currentDate.getMonth()
  const isNextYear = data?.day?.year > currentDate.getFullYear()

  const { cancelShift } = useShifts()

  const { push } = useRouter()

  const [showModal, setShowModal] = useState(false)

  const handleModal = async () => {
    setShowModal(!showModal)
  }

  const handleCancel = async () => {
    try {
      await cancelShift(data?._id)
      handleModal()
      toast.success("Turno cancelado con éxito")
      push(
        `https://wa.me/${CONTACT_NUMBER}?text=*CANCELACIÓN%20DE%20TURNO*%20✖️💈%0A*Nombre:*%20${data?.user?.name}%0A*Nro.%20de%20teléfono:*%20${data.user.phone}%0A*Día:*%20${data.day.dateString}%0A*Horario:*%20${data.hour.hour}`
      )
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay }}
      className={`${
        !isPast || isNextMonth || isNextYear
          ? "bg-dark-regular"
          : "bg-dark-light"
      } flex flex-col items-center gap-4 w-full py-4 px-6 rounded-3xl overflow-hidden duration-200 ${
        active !== data?._id ? "h-[55px]" : "h-36"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <span
          className={`${
            !isPast || isNextMonth || isNextYear
              ? "text-yellow-regular"
              : "text-yellow-light"
          } font-medium text-base`}
        >
          {Day[data?.day?.dayWeek]}. {data?.day?.day}/{data?.day?.month + 1}/
          {data?.day.year}
        </span>
        <span
          className={`${
            !isPast || isNextMonth || isNextYear
              ? "text-yellow-regular"
              : "text-yellow-light"
          } font-semibold text-base`}
        >
          {data?.hour?.hour}
        </span>
        <FaChevronDown
          onClick={!isPast || isNextMonth || isNextYear ? handleActive : null}
          className={`w-4 h-4 ${
            !isPast || isNextMonth ? "text-yellow-regular" : "text-yellow-light"
          } ${
            active !== data?._id ? "transform rotate-0" : "transform rotate-180"
          } duration-200`}
        />
      </div>
      <div className="flex items-end justify-between w-full">
        <Subtitle variant="text-xs">
          Al cancelar el turno, serás redirigido a WhatsApp para comunicarlo.
        </Subtitle>
        <button
          onClick={
            !isPast || isNextMonth || isNextYear ? handleModal : () => null
          }
          className="bg-yellow-regular text-dark-bold py-2 px-4 rounded-full text-sm font-medium"
        >
          Cancelar
        </button>
      </div>

      {showModal && (
        <Modal>
          <div className="bg-dark-bold flex flex-col items-center gap-4 p-8 w-[300px] rounded-[55px]">
            <Title style="text-yellow-regular">¿Estás seguro?</Title>
            <button
              onClick={handleCancel}
              type="button"
              className="text-dark-bold bg-yellow-regular rounded-full py-2 w-[140px] mt-2"
            >
              Confirmar
            </button>
            <button
              onClick={handleModal}
              type="button"
              className="text-yellow-regular border-2 border-yellow-regular rounded-full py-2 w-[140px]"
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </motion.div>
  )
}

export default Shift
