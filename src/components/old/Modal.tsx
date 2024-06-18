const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 grid place-items-center backdrop-blur-[2px] w-screen h-screen bg-dark-bold-transparent">
      {children}
    </div>
  )
}

export default Modal
