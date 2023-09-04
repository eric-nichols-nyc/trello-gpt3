'use client'
import Board from '@/components/board/Board'
import Header from '@/components/Header'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ClientPage({ params }: { params: { id: string } }) {
  const { id } = params

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    }
  })

  return (
    <section className="flex flex-col h-full">
      <Header user={session?.user} />
      <Board />
    </section>
  )
}