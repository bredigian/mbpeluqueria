"use client"

import ButtonNext from "./ButtonNext"
import { FormValues } from "@/types/form.types"
import Input from "./Input"
import { InputType } from "@/types/input.types"
import { User } from "@/types/user.types"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter } from "next-nprogress-bar"
import { useShiftData } from "@/store/shift-data"

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()

  const { setUser } = useShiftData()
  const { push } = useRouter()

  const onSubmit = async (data: User) => {
    try {
      await setUser(data)
      push("/dashboard")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-4 w-full"
    >
      <Input
        name="name"
        type={InputType.Text}
        register={register}
        minLength={8}
        error={errors.name}
        errorMessage={{
          minLength: "Debe tener al menos 8 caracteres",
          required: "El nombre es requerido",
        }}
      >
        Nombre y Apellido
      </Input>
      <Input
        name="phone"
        type={InputType.Phone}
        register={register}
        minLength={10}
        error={errors.phone}
        errorMessage={{
          minLength: "Debe tener al menos 10 caracteres",
          required: "El teléfono es requerido",
        }}
      >
        Teléfono
      </Input>
      <p className="text-yellow-light text-start text-[10px] ml-2">
        Nota: por favor, complete y verifique sus datos adecuadamente ya que
        esto es de uso único y una vez enviado, no podrá revertirlo.
      </p>
      <ButtonNext style="self-end mt-12" type="submit">
        Continuar
      </ButtonNext>
    </form>
  )
}

export default Form
