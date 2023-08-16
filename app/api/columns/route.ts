/**
 * @api {get} /cards Get all cards
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import Column from '@/models/Column';

export const GET = async (request: NextRequest) => {
  try {
    let client = await connectDB();
    // get all cards
    const columns = await Column
      .find()
      .sort({ order: 1 });
      
    return NextResponse.json(columns, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const newColumn = new Column(body);
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




