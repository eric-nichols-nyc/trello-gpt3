/**
 * @api {get} /cards Get all cards
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import Comment from '@/models/Comment';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    // get all comments
    const comments = await Comment.find();
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
  const comments = new Comment(body);
  try {
    await connectDB();
    await comments.save();
    return NextResponse.json(
      { message: 'Card created successfully', data: comments },
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
