"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useModalStore } from '@/store/ModalStore'

const Home = () => {
  const [openModal] = useModalStore((state) => [state.openModal])
  return (
    <div className="flex max-w-6xl py-10 px-4 mx-auto">
      <div className="flex flex-col flex-1">
        <h1 className="text-5xl font-bold">Trello AI brings all your tasks, teammates, and tools together</h1>
        <div className="mt-6 px-6 sm:px-0 max-w-sm">
          <button
            onClick={() => signIn('google')}
            type="button"
            className="
            home dark:focus:ring-[#4285F4]/55
          ">
            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Continue with Google
            <div>
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-1">
        <Image
          className="object-cover"
          src="/images/TrelloUICollage_4x.webp"
          alt="Picture of the author"
          width={500}
          height={500}
        />
      </div>

    </div>
  )
}

export default Home