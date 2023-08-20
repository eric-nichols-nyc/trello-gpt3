'use client'
import Board from '@/components/Board'
import Header from '@/components/Header'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function BoardPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/board')
    }
  })

  return (
    <section className="flex flex-col h-full">
      <Header user={session?.user} />
      <Board />
    </section>
  )
}