const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-dark-bold-transparent fixed top-0 grid h-screen w-screen place-items-center backdrop-blur-[2px]'>
      {children}
    </div>
  );
};

export default Modal;
