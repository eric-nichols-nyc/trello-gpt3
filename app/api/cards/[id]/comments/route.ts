/**
 * @api {get} /cards Get all cards
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import Comment from '@/models/Comment';
import User from '@/models/User';
import getCurrentUser from '@/utils/getCurrentUser';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    // get all comments
    const comments = await Comment.find().sort({ createdAt: -1});
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

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
