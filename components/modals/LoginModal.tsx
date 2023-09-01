import React from 'react'
import Button from '@/components/Button'
import { signIn } from 'next-auth/react'
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const LoginModal = () => {
  return (
    <div className="
      flex
      flex-col
      gap-4
    ">
      <div>Login</div>
      <Button 
        outline
        label='Continue with Google'
        onClick={() => signIn('google')}
        icon={FcGoogle}
      />
      <Button 
        outline
        label='Continue with Github'
        onClick={() => signIn('github')}
        icon={AiFillGithub}
      />
    </div>
  )
}

export default LoginModal