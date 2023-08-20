/**
 * @api {get} /cards Get all cards
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import { ObjectId } from 'mongodb';
import Column from '@/models/Column';
import { getSession } from 'next-auth/react';
import { getAuthSession } from '@/utils/auth';
import { getServerSession } from 'next-auth/next';
import {authOptions} from '@/utils/auth';
import { getToken } from 'next-auth/jwt';

export const GET = async (request: NextRequest) => {
  try {
    let client = await connectDB();
    // get all cards and return sorted by order key
    const columns = await Column.find().sort({ order: 1 });

    return NextResponse.json(columns, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

export const POST = async (req: any) => {
  const body = await req.json();
  const column = {
    ...body,
    boardId: new ObjectId(body.boardId),
  };
  const newColumn = new Column(column);
  const test = process.env.NEXTAUTH_SECRET
  const session = await getServerSession(authOptions);
  const token = await getToken({ req });
  console.log('token = ', token);
   console.log('session = ', session);
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
