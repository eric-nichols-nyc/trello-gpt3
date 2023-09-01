import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import User from '@/models/User';

export const POST = async(request: NextRequest) => {
  const body = await request.json();
  const newUser = new User(body);
  try {
    await connectDB();
    await newUser.save();
    return NextResponse.json(
      { message: 'User created successfully', data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}