import Board from '@/components/board/Board'
import Header from '@/components/Header'
// Remember you must use an AuthProvider for 
// client components to useSession
import { getAuthSession } from '@/utils/auth'
import { redirect } from 'next/navigation'


// Board page
export default async function BoardPage() {
  const session = await getAuthSession()
  if (!session?.user) {
    redirect('/')
  }

  return (
    <section className="flex flex-col h-full">
      <Header 
        user={session?.user} 
      />
      <Board />
    </section>
  )
}