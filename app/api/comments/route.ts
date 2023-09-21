import { connectDB } from "@/db/database";
import { NextRequest, NextResponse } from "next/server";
import Comment from '@/models/Comment'

export const GET = async(request:NextRequest) => {

  try {
    // connect to db
    await connectDB();
    const comments = await Comment.find();
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