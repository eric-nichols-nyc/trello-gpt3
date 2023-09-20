import { getAuthSession } from '@/utils/auth'
import { redirect } from 'next/navigation'
import { Header, Home } from '@/components'


export default async function HomePage() {
  const session = await getAuthSession()
  // redirect logged in user to board page
  if(session?.user){
    redirect('/board')
  }

  return (
    <section className="flex flex-col gap-6">
      <Header user={session?.user} />
      <Home />
    </section>
  )
}