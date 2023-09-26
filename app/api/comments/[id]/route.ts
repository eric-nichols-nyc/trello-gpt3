import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import Comment from '@/models/Comment';

// delete comment from db
export const DELETE = async (request: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    await connectDB();
    await Comment.deleteOne({ _id: id });
    return new NextResponse(
      JSON.stringify({ message: 'Comment deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('ERROR: ', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
      }
    );
  }
};
