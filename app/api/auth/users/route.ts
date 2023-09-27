import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/database';
import User from '@/models/User';
import getCurrentUser from '@/utils/getCurrentUser';

interface IParams {
  color?: string;
}
// use getCurrentUser hook to get user id
export const GET = async(request: NextRequest) => {
  try {
    await connectDB();
    const user = await getCurrentUser();
    const currentUser = await User.find({ email: user.email });
    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export const PUT = async (
  request: Request,
  { params }: { params: IParams }
) => {
  // update user backgroud color
  const body = await request.json();
  console.log('body  ', body)
  // connect to DB
  await connectDB();
  // find user from session
  const session = await getCurrentUser();
  // get user from DB
  try {
    // update user background color
    const user = await User.findOneAndUpdate(
      { email: session.email },
      {
        $set: {
          backgroundColor: body.backgroundColor,
          backgroundImage: body.backgroundImage,
        },
      }
    );
    return NextResponse.json(
      { message: 'Update was a success' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
