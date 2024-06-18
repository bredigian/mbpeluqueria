const Title = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: string
}) => {
  return (
    <h1 className={`text-yellow-regular font-bold text-lg ${style}`}>
      {children}
    </h1>
  )
}

export default Title
