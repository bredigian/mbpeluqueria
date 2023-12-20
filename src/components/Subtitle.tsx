const Subtitle = ({
  children,
  variant,
}: {
  children: React.ReactNode
  variant?: "text-xs" | "text-sm" | "text-base"
}) => {
  return (
    <h2 className={`text-white-semi-light ${variant ?? "text-sm"}`}>
      {children}
    </h2>
  )
}

export default Subtitle
