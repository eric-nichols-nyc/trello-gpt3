import { getSession } from "next-auth/react";
import { NextApiRequest } from "next/types";

export const getCurrentUser = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  return session?.user;
}