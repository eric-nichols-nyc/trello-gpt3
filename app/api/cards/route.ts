import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import Card from '@/models/Card';
import User from '@/models/User';
import getCurrentUser from '@/utils/getCurrentUser';
/**
 * @api {get} /cards Get all cards
 */
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    // get all cards
    const cards = await Card.find().sort({ order: 1 });;
    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
/**
 * @api {post} /add new card
 */
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const user = await getCurrentUser();
  const [userId] = await User.find({ email: user.email });
  const {_id} = userId;
  const card = {
    ...body,
    userId: _id,
    boardId: _id,
  };
  const newCard = new Card(card);
  try {
    await connectDB();
    await newCard.save();
    return NextResponse.json(
      { message: 'Card created successfully', data: newCard },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
