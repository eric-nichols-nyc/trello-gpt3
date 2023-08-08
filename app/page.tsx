'use client'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/board')
    }
  })
  console.log('session = ', session)
  if(session?.user){
    redirect('/board')
  }

  return (
    <section className="flex flex-col gap-6">
      <Header user={session?.user} />
    </section>
  )
}