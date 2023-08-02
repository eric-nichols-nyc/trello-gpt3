'use client'
import { XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react'

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: any;
  draggableProps: any;
  draggableHandleProps: any;
}

function TodoCard({
  todo,
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
      className='bg-white rounded-md space-y-2 drop-shadow-md p-2'>
      <div className='flex justify-between items-center p-5'>
        <p>{todo.title}</p>
        <button>
          <XCircleIcon className='h-6 w-6 text-red-400' />
        </button>
      </div>
      {/* Add image here */}
      
    </div>
  )
}

export default TodoCard