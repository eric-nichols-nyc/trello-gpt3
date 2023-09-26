import { connectDB } from "@/db/database";
import { NextRequest, NextResponse } from "next/server";
import Comment from '@/models/Comment'
import User from "@/models/User";
import getCurrentUser from "@/utils/getCurrentUser";

export const GET = async(request:NextRequest) => {
  try {
    // connect to db
    await connectDB();
    const comments = await Comment.find();
    console.log('comment = ', comments)
    return NextResponse.json(comments)
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "There was a server error"
      },
      {
        status: 500
      }
    );
  }
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const session = await getCurrentUser();
  const user = await User.find({ email: session.email });
  body.creatorId = user[0]._id;
  const comment = new Comment(body);
  try {
    await connectDB();
    await comment.save();
    return NextResponse.json(
      { message: 'Card created successfully', data: comment },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};