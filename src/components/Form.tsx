import Input from "./Input"
import { InputType } from "@/types/input.types"

const Form = () => {
  return (
    <form className="flex flex-col items-start gap-4 w-full">
      <Input id="name" type={InputType.Text}>
        Nombre y Apellido
      </Input>
      <Input id="phone" type={InputType.Phone}>
        Teléfono
      </Input>
    </form>
  )
}

export default Form
