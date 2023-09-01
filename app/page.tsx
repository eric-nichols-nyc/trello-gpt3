'use client'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Header, Home } from '@/components'
import { useAuth } from '@/context/UserContext'

export default function  App() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      console.log('User in not authenticated')
    }
  })
  if(session?.user){
    redirect(`/board/${session.user.id}`)
  }

  return (
    <section className="flex flex-col gap-6">
      <Header user={session?.user} />
        <Home />
    </section>
  )
}