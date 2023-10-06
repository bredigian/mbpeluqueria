import { InputProps } from "@/types/input.types"

const Input = ({
  children,
  name,
  type,
  register,
  minLength,
  errorMessage,
  error,
}: InputProps) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <div className="flex items-center justify-between w-full">
        <label
          className="text-yellow-regular text-xs font-bold ml-2"
          htmlFor={name}
        >
          {children}
        </label>
        {error && (
          <span className="text-[10px] text-yellow-light">{error.message}</span>
        )}
      </div>
      <input
        id={name}
        type={type}
        className="bg-dark-regular rounded-full text-sm text-[#ffffff80] px-4 py-2 outline-none w-full"
        autoComplete="off"
        {...register(name, {
          required: {
            value: true,
            message: errorMessage.required,
          },
          minLength: {
            value: minLength,
            message: errorMessage.minLength,
          },
        })}
      />
    </div>
  )
}

export default Input
