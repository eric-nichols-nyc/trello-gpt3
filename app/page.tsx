// Remember you must use an AuthProvider for 
// client components to useSession
import { getAuthSession } from '@/utils/auth'
import { redirect } from 'next/navigation'
import { Header, Home } from '@/components'


export default async function App() {
  const session = await getAuthSession()
  console.log(session?.user)
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