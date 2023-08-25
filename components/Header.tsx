'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore'
import { useSession, signOut, signIn } from 'next-auth/react'

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} | undefined

type Props = {
  user: User,
}


function Header({ user }: Props) {
  const { data: session } = useSession();
  const [board] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString
  ])

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center px-5 py-2 bg-gray-500/10 rounder-b-2xl">
        <Image
          src="http://links.papareact.com/c2cdd5"
          alt="Trello AI Clone"
          width={100}
          height={100}
          className="w-10 md:w-20 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {
            session ?
            <>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-blue-500 py-2 px-4 hover:bg-blue-700 text-white text-xs"
              >
                Logout
              </button>
              <Avatar className="cursor-pointer ml-2" name={user?.name!} size="30" round={true} />
            </>
           : <button
            onClick={() => signIn()}
            className="bg-blue-500 py-2 px-4 hover:bg-blue-700 text-white"
          >
            Login
          </button>
          }
        </div>
      </div>
    </header>
  )
}

export default Header