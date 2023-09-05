"use client";
import { useModalStore } from "@/store/ModalStore"
import LoginModal from "./LoginModal";
import BoardModal from "./BoardModal"
import { IoMdClose } from 'react-icons/io'

interface IModal {
  user: User | null,
}

const Modals = ({user}:IModal) => {
  const [type, isOpen, closeModal] = useModalStore((state) => [state.type, state.isOpen, state.closeModal])

  if(!isOpen) return null
  return (
    <div className="
      flex
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0
      focus:outline-none
      z-50
      bg-neutral-900/70
    ">
      <div 
      className="
          relative 
          md:w-4/6
          lg:w-4/6
          xl:w-3/5
          my-6
          mx-auto 
          lg:h-auto
          md:h-auto
          rounded-md
          w-[768px] 
      ">
        <div className="
          flex
          p-2
          justify-end
          right-0
          text-neutral-100
          w-full
          mt-10
        ">
          <button onClick={closeModal}><IoMdClose /></button>
        </div>
        {(() => {
          switch (type) {
            case 'LOGIN':
              return <LoginModal />
            case 'CARD':
              return <BoardModal />
            default:
              return null
          }
        })()}
      </div>
    </div>
  )
}

export default Modals