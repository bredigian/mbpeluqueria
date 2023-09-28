"use client"

import ButtonNext from "./ButtonNext"
import { FormValues } from "@/types/form.types"
import Input from "./Input"
import { InputType } from "@/types/input.types"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useShiftData } from "@/store/shift-data"

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const { setUser } = useShiftData()
  const { push } = useRouter()

  const onSubmit = (data: FormValues) => {
    setUser(data)
    push("/date")
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
      <ButtonNext style="self-end mt-16" type="submit">
        Continuar
      </ButtonNext>
    </form>
  )
}

export default Form
