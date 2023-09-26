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
    <section 
    className="
      flex 
      flex-col 
      h-full
    ">
      <Header user={session?.user} />
      <div 
        className="
        flex
        flex-col 
        h-full
        justify-center
      ">
      <Home />
      </div>
    </section>
  )
}