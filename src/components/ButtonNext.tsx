import { ArrowRightIcon } from "@heroicons/react/24/solid"

const ButtonNext = ({
  style,
  children,
}: {
  style?: string
  children: React.ReactNode
}) => {
  return (
    <button
      type="button"
      className={`${style} text-yellow-regular text-sm font-medium flex gap-2 items-center`}
    >
      {children}
      <ArrowRightIcon className="w-[22px] h-[22px]" />
    </button>
  )
}

export default ButtonNext
