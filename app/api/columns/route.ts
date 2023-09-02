/**
 * @api {get} /cards Get all cards
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import Column from '@/models/Column';
import User from '@/models/User';
import getCurrentUser from '@/utils/getCurrentUser';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    // get all cards and return sorted by order key
    const user = await getCurrentUser();
    const [userId] = await User.find({ email: user.email });
    const id = userId._id;
    const columns = await Column.find({
      creatorId: id,
    }).sort({ order: 1 });

    return NextResponse.json(columns, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

// Add a new column
export const POST = async (req: any) => {
  const body = await req.json();
  const user = await getCurrentUser();
  const [userId] = await User.find({ email: user.email });
  const id = userId._id;
  const column = {
    ...body,
    creatorId: id,
    boardId: id,
  };
  const newColumn = new Column(column);
  console.log('newColumn ======= ', newColumn);

  try {
    await connectDB();
    await newColumn.save();
    return NextResponse.json(
      { message: 'Column created successfully' },
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
