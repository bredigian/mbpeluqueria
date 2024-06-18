import { InputProps } from '@/types/input.types';

const Input = ({
  children,
  name,
  type,
  register,
  minLength,
  maxLength,
  errorMessage,
  error,
  placeholder,
}: InputProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="flex w-full items-center justify-between">
        <label
          className="text-yellow-regular ml-2 text-xs font-bold"
          htmlFor={name}
        >
          {children}
        </label>
        {error && (
          <span className="text-yellow-light text-[10px]">{error.message}</span>
        )}
      </div>
      <input
        id={name}
        type={type}
        className="bg-dark-regular placeholder:text-yellow-light w-full rounded-full px-4 py-2 text-sm text-[#ffffff80] outline-none"
        placeholder={placeholder}
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
          maxLength: {
            value: maxLength as number,
            message: errorMessage.maxLength as string,
          },
        })}
      />
    </div>
  );
};

export default Input;
