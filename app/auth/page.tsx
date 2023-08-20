import React from 'react'
import { getServerSession } from "next-auth/next"

const Auth = async() => {
  const session = await getServerSession()
  return (
   <pre>{JSON.stringify(session, null, 2)}</pre>
  )
}

export default Auth