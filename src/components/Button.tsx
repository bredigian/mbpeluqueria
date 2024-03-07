const Button = ({
  children,
  onClick,
  backgroundColor,
  textColor,
}: {
  children: React.ReactNode
  onClick: () => void
  backgroundColor?: string
  textColor?: string
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${textColor ?? "text-yellow-regular"} ${
        backgroundColor ?? "bg-dark-regular"
      } text-sm font-bold py-4 px-8 rounded-full w-fit self-center`}
    >
      {children}
    </button>
  )
}

export default Button
