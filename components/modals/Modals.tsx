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
    <div className="modal bg-neutral-900/70">
      <div 
        className="modal_content">
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