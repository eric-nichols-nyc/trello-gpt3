import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
const Home = () => {
  return (
    <div className="flex max-w-4xl mx-auto">
      <div className="flex flex-col flex-1">
        <h1 className="text-5xl font-bold">Trello brings all your tasks, teammates, and tools together</h1>
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
        onClick={() => {
          // takes user to next aut signin
          signIn()
        }}
        >
          Sign in
        </button>
      </div>
      <div className="flex flex-1">
        <Image
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