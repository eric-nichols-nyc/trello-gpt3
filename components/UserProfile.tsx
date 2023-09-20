"use client"

import Avatar from "react-avatar";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} | undefined

type Props = {
  user: User,
}

// user profile component avatar, name, email
const UserProfile = ({user}:Props) => {
  return (
    <section 
      className="
        h-screen
        flex 
        flex-col 
        gap-3 
        items-center 
        pt-10 
        bg-[#071e34] 
        text-slate-100
      ">
      <h1>user profile</h1>
      <Avatar 
        name={user?.name!}
        size="100"
        round={true}
      />
      <p>{user?.name}</p>
      <p>{user?.email}</p>
    </section>
  )
}

export default UserProfile