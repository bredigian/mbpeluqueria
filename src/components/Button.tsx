const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-yellow-regular bg-dark-regular text-lg font-bold py-6 px-8 rounded-3xl w-fit self-center"
    >
      {children}
    </button>
  )
}

export default Button
