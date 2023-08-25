'use client'
import { MdEdit } from 'react-icons/md';
import React, { useState } from 'react'
import { useModalStore } from '@/store/ModalStore'
import { useCardStore } from '@/store/CardStore'

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
  const [setCurrCard] = useCardStore((state) => [state.setCurrentCard]);
  
  const handleCardClick = () => {
    setCurrCard(card)
    openModal()
  }
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
        onClick={handleCardClick}
        >
        <p>{card.title}</p>
        {
          icon && (
              <MdEdit />
          )
        }
   
      </div>
      {/* Add image here */}
    </div>
  )
}

export default TodoCard