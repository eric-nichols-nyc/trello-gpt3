import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { options } from '../auth/[...nextauth]/options';
import openai from '@/openai';

export async function POST(request: Request) {
  const { todos } = await request.json();
  const session = await getServerSession({ req: request, ...options });
  if (session) console.log('SESSION IS: ', session);
  const message = `When responding, welcome the user always as ${session.user.name} and say welcome to the app!. Limit the response to 200 characters`;

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content: message,
      },
      {
        role: 'user',
        content: `Hi there, provide a summary of the following todos. 
        count how many todos are in each category. such as To do in progress and done, then tell the user to have a productiv day! Here's the data: 
        ${JSON.stringify(todos)}`,
      },
    ],
  });

  const { data } = response;

  console.log('DATA IS: ', data);
  console.log(data.choices[0].message);

  return NextResponse.json({
    data: data.choices[0].message,
  });
}
