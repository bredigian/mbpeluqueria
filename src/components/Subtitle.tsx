const Subtitle = ({
  children,
  variant,
  maxWidth,
}: {
  children: React.ReactNode
  variant?: "text-xs" | "text-sm" | "text-base"
  maxWidth?: string
}) => {
  return (
    <h2 className={`text-white-semi-light ${variant ?? "text-sm"} ${maxWidth}`}>
      {children}
    </h2>
  )
}

export default Subtitle
