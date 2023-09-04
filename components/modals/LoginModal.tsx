import React from 'react'
import Button from '@/components/Button'
import { signIn } from 'next-auth/react'
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useModalStore } from "@/store/ModalStore"

const LoginModal = () => {
  const [closeModal] = useModalStore((state) => [state.closeModal])

  const ref = useDetectClickOutside({ onTriggered: closeModal });

  return (
    <div 
    ref={ref}
    className="
      flex
      flex-col
      gap-4
      bg-white
      p-4
    ">
      <div className="text-2xl text-center font-bold">Login</div>
      <Button 
        outline
        label='Continue with Google'
        onClick={() => signIn('google')}
        icon={FcGoogle}
      />
      <hr />

      <Button 
        outline
        disabled={true}
        label='Continue with Github'
        onClick={() => {
          signIn('github',
            { callbackUrl: '/board' }
          )
        }}
        icon={AiFillGithub}
      />
    </div>
  )
}

export default LoginModal