import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import Column from '@/models/Column';
/**
 * @api {put} /cards Update column order by ID
 */
export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;
  try {
    const body = await request.json();
    // console.log('PUT ', body.order)
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
/**
 * @api {delete} /delete column by ID
 */
export const DELETE = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  try {
    await connectDB();
    await Column.deleteOne({
      _id: id,
    });
    return new NextResponse(
      JSON.stringify({ message: 'Column deleted successfully' }),
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
