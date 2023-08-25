'use client'
import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react'
import useModal from '@/hooks/useModal'
import { useModalStore } from '@/store/ModalStore'

type Props = {
  card: Card;
  index: number;
  id: string;
  innerRef: any;
  draggableProps: any;
  draggableHandleProps: any;
  deleteCard:(id:string) => void;
}

function TodoCard({
  card,
  index,
  id,
  innerRef,
  draggableProps,
  draggableHandleProps,
  deleteCard
}: Props) {

  const [icon, showIcon] = useState(false)
  const [openModal] = useModalStore((state) => [state.openModal]);

  return (
    <div
      {...draggableProps}
      {...draggableHandleProps}
      ref={innerRef}
      className='text-sm mt-2"'>
      <div 
      className='bg-gray-800 hover:bg-gray-600 p-2 
      rounded mt-1 cursor-pointer 
      flex justify-between
      text-slate-50'
        onMouseEnter={() => showIcon(true)}
        onMouseLeave={() => showIcon(false)}
        onClick={openModal}
        >
        <p>{card.title}</p>
        {
          icon && (
            <button>
              <XCircleIcon
                className='h-5 w-5 text-red-400'
                onClick={() => { deleteCard(card._id) }}
              />
            </button>
          )
        }
   
      </div>
      {/* Add image here */}
    </div>
  )
}

export default TodoCard