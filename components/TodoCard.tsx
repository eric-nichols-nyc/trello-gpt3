'use client'
import { XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react'

type Props = {
  card: Card;
  index: number;
  id: string;
  innerRef: any;
  draggableProps: any;
  draggableHandleProps: any;
}

function TodoCard({
  card,
  index,
  id,
  innerRef,
  draggableProps,
  draggableHandleProps
}: Props) {
  return (
    <div
      {...draggableProps}
      {...draggableHandleProps}
      ref={innerRef}
      className='text-sm mt-2"'>
      <div className='bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter flex justify-between'>
        <p>{card.title}</p>
        <button>
          <XCircleIcon className='h-6 w-6 text-red-400' />
        </button>
      </div>
      {/* Add image here */}
    </div>
  )
}

export default TodoCard