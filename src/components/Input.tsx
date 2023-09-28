import { InputProps } from "@/types/input.types"

const Input = ({ children, id, type }: InputProps) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <label
        className="text-yellow-regular text-xs font-bold ml-2"
        htmlFor={id}
      >
        {children}
      </label>
      <input
        id={id}
        type={type}
        className="bg-white-extra-light rounded-full text-sm text-[#ffffff80] px-4 py-2 outline-none w-full"
      />
    </div>
  )
}

export default Input
