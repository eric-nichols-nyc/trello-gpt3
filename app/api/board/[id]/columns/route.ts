import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import Column from '@/models/Column';
import User from '@/models/User';
import getCurrentUser from '@/utils/getCurrentUser';

export const GET = async (request: any, { params }: any) => {
  await connectDB();
  const user = await getCurrentUser();
  const [userId] = await User.find({email: user.email});
  const id = userId._id;
  try {
      const columns = await Column.find({
        boardId: id,
      }).sort({ order: 1 });
    return NextResponse.json(columns, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
