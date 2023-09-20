import { connectDB } from "@/db/database";
import User from "@/models/User";
import getCurrentUser from "@/utils/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} get the current user
 */
export const GET = async(req:NextRequest, res: NextResponse) => {
  try {
    // connect to db
    await connectDB();
    // use server session to get current user session
    const session = await getCurrentUser();
    const user = await User.find({email:session.email});
    return NextResponse.json(user[0], { status: 200 });
  } catch (error) {
    // return message and status
    console.log(error);
    return NextResponse.json(
      {error: 'Internal Server Error'},
      {status: 500}
    )
  }
}
