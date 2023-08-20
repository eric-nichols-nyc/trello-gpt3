/**
 * @api {get} /cards Update column order by ID
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import Column from '@/models/Column';

export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;
  try {
    const body = await request.json();
    await connectDB();
    await Column.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          order: body.order,
        },
      },
    );
    return new NextResponse(
      JSON.stringify({ message: 'Column updated successfully' }),
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
