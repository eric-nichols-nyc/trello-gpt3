import React from 'react'
import { signIn } from 'next-auth/react'
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center border border-sky-500">
      <h1>Home</h1>
      <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        // takes user to next aut signin
        signIn()
      }}
      >
        Sign in
      </button>
    </div>
  )
}

export default Home