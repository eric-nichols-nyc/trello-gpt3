import React from 'react'
import Button from '@/components/Button'
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useModalStore } from "@/store/ModalStore"
import { IoMdClose } from 'react-icons/io'

const LoginModal = () => {
  const [closeModal] = useModalStore((state) => [state.closeModal])

  const ref = useDetectClickOutside({ onTriggered: closeModal });

  return (
    <div
      ref={ref}
      className="
      flex
      flex-col
      items-center
      justify-center
      w-full
      h-full
    ">

      <div className="
      w-[400px] 
      bg-white 
      p-4
      relative
      ">
        <div className="
          absolute
          right-2
          text-neutral-100
        ">
          <button onClick={closeModal}><IoMdClose color="black"/></button>
        </div>
        <div className="text-2xl text-center font-bold">Login</div>
        <Button
          outline
          label='Continue with Google'
          onClick={() => signIn('google')}
          icon={FcGoogle}
        />
        <hr />
      </div>
    </div>
  )
}

export default LoginModal