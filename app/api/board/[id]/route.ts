import { NextRequest } from "next/server"
import { connectDB } from '@/db/database';
import Column from '@/models/Column';

export const GET = async (request: NextRequest, { params }: any) => {
  const {id} = params;
  const columns = await Column.find({
    boardId: id,
  }).sort({ order: 1 });

  console.log(' columns = ', columns)

}