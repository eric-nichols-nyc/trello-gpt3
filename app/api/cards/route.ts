/**
 * @api {get} /cards Get all cards
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import Card from '@/models/Card';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    // get all cards
    const cards = await Card.find();
    console.log('cards: ', cards);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const newCard = new Card(body);
  try {
    await connectDB();
    await newCard.save();
    return NextResponse.json(
      { message: 'Card created successfully' },
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
