import { ArrowRightIcon } from "@heroicons/react/24/solid"

const ButtonNext = ({
  style,
  type,
  children,
  onClick,
}: {
  style?: string
  type: "button" | "submit" | "reset" | undefined
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${style} hover:cursor-pointer text-yellow-regular text-sm font-medium flex gap-2 items-center`}
    >
      {children}
      <ArrowRightIcon className="w-[22px] h-[22px]" />
    </button>
  )
}

export default ButtonNext
