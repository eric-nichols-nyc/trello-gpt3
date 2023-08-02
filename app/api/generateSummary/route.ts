import { NextResponse } from 'next/server';
import openai from '@/openai';

export async function POST(request: Request) {
  console.log('REQUEST IS: ', request);
  const { todos } = await request.json();
  console.log('TODOS: ', todos);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content:
          'When responding, welcome the user always as Mr. Nichols and say welcome to the TODO App!. Limit the response to 200 characters',
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
