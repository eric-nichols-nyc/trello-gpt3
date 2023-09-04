"use client";
import { useEffect } from "react";
import { useModalStore } from "@/store/ModalStore"
import LoginModal from "./LoginModal";
import { IoMdClose } from 'react-icons/io'

interface IModal {
  user: User | null,
}

const Modals = ({user}:IModal) => {
  const [isOpen, closeModal] = useModalStore((state) => [state.isOpen, state.closeModal])


  useEffect(() => {
    console.log(isOpen)
  }, [isOpen])
  

  if(!isOpen) return null
  return (
    <div className="
      flex
      justify-center
      items-center
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
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
          bg-slate-600
          rounded-md
      ">
        <div className="
          flex
          p-2
          justify-end
          right-0
          text-neutral-100
        ">
          <button onClick={closeModal}><IoMdClose /></button>
        </div>
         <LoginModal />
      </div>
    </div>
  )
}

export default Modals