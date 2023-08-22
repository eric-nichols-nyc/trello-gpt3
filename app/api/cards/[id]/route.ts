/**
 * @api {get} /cards Update column order by ID
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import Card from '@/models/Card';

export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;
  try {
    const body = await request.json();
    // console.log('PUT ', body.order)
    await connectDB();
    await Card.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          order: body.order,
          columnId: body.columnId,
        },
      }
    );
    return new NextResponse(
      JSON.stringify({ message: 'Card updated successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}

export const DELETE = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  try {
    await connectDB();
    await Card.deleteOne({
      _id: id,
    });
    return new NextResponse(
      JSON.stringify({ message: 'Card deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
};
