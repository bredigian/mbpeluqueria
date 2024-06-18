import Link from 'next/link';

const MenuItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="bg-dark-regular flex w-full items-center justify-between rounded-full px-20 py-4"
    >
      {children}
    </Link>
  );
};

export default MenuItem;
