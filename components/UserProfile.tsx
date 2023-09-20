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
const UserProfile = ({ user }: Props) => {
  return (
    <section
      className="
        h-screen
        flex 
        items-center 
        bg-[#071e34] 
        text-slate-100
      ">
      <section
        className="
          flex
          flex-col
          items-center
          gap-3
          w-64 
          mx-auto
          bg-[#20354b] 
          rounded-2xl 
          px-8 py-6
          shadow-lg
      ">
        <Avatar
          name={user?.name!}
          size="100"
          round={true}
        />
        {/* <p>{user?.name}</p> */}
        <div className="mt-8">
          <h2 className="
          text-white 
          font-bold 
          text-2xl 
          tracking-wide
        ">
          {user?.name}
        </h2>
        </div>
        <p>{user?.email}</p>
      </section>
    </section>
  )
}

export default UserProfile