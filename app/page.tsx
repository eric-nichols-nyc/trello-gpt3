'use client'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Header, Home } from '@/components'
import { useAuth } from '@/context/UserContext'

export default function Aoo() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      //redirect('/api/auth/signin?callbackUrl=/board')
      console.log('User in not authenticated')
    }
  })
  if(session?.user){
    console.log('session fsadf= ', session)
    redirect('board')
  }

  return (
    <section className="flex flex-col gap-6">
      <Header user={session?.user} />
      {
        session?.user ? <div>User is Authenticaated</div> : <Home />
      }
    </section>
  )
}