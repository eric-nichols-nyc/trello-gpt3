import { Header } from '@/components'
import { getAuthSession } from '@/utils/auth'
import {redirect} from 'next/navigation'
import Avatar from 'react-avatar'
import UserProfile from '@/components/UserProfile'

// user profile page find session user and display their boards
const ProfilePage = async() => {
  // redirect if user is not logged in
  const session = await getAuthSession()
  console.log(session?.user.name)
  if(!session?.user){
    redirect('/')
  }

  return (
    <div>
      <Header 
        user={session?.user} 
      />
      <UserProfile
        user={session?.user}
       />
    </div>
  )
}

export default ProfilePage