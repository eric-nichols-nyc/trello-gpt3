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
      className="profile">
      <section
        className="profile_content">
        <Avatar
          name={user?.name!}
          size="100"
          round={true}
        />
          <h2 className="mt-8 profile_content_name">
          {user?.name}
        </h2>
        <p>{user?.email}</p>
      </section>
    </section>
  )
}

export default UserProfile