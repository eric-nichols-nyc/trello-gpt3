/**
 * @api {get} /cards Get all cards
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import { ObjectId } from 'mongodb';
import Board from '@/models/Board';

export const GET = async () => {
  try {
    await connectDB();
    // get all cards and return sorted by order key
    const columns = await Board.find().sort({ order: 1 });

    return NextResponse.json(columns, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
    // const session = await getServerSession();
    // if (!session) {
    //   console.log('no session');
    // }
    // console.log('session = ', session);
  const body = await request.json();
  const test = {
    ...body,
    boardId: new ObjectId(body.boardId),
  };

  const newBoard = new Board(test);
  try {
    await connectDB();
    await newBoard.save();
    return NextResponse.json(
      { message: 'Board created successfully' },
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
