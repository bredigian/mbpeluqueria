const Title = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: string;
}) => {
  return (
    <h1 className={`text-yellow-regular text-lg font-bold ${style}`}>
      {children}
    </h1>
  );
};

export default Title;
