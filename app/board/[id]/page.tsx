'use client'
import Board from '@/components/Board'
import Header from '@/components/Header'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/board')
    }
  })
  if (session?.user) {
    // console.log('session fsadf= ', session)
    // redirect(`/board/${session?.user.id}`)
  }
  return (
    <section className="flex flex-col h-full">
      <Header user={session?.user} />
      <Board />
    </section>
  )
}