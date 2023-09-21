'use client'
import { MdEdit } from 'react-icons/md';
import React, { useState, useEffect } from 'react'
import { useModalStore } from '@/store/ModalStore'
import { useCardStore } from '@/store/CardStore'
import { BsTextLeft } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';

type Props = {
  card: Card;
  index: number;
  id: string;
  innerRef: any;
  draggableProps: any;
  draggableHandleProps: any;
  comments: Comment[];
}

function TodoCard({
  card,
  innerRef,
  draggableProps,
  draggableHandleProps,
  comments
}: Props) {
  // lcoal state
  const [icon, showIcon] = useState(false)
  const [cardComments, setCardComments] = useState<Comment[]>(comments)
  // zustan
  const [openModal, setType] = useModalStore((state) => [state.openModal, state.setType]);
  const [setCurrCard] = useCardStore((state) => [state.setCurrentCard]);

  const handleCardClick = () => {
    setCurrCard(card)
    setType('CARD')
    openModal()
  }

  // TODO: aggregate comments by card id in db
  useEffect(() => {
   setCardComments(comments.filter((comment) => comment.cardId === card._id))
  }, [comments, card._id])

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
          <div className="flex flex-col">
          <p>{card.title}</p>
          <div className="icons mt-2 flex gap-2">
            {
              card.description && (
                <BsTextLeft />
              )
            }
            {
              cardComments.length > 0 && (
                <>
                  <FaRegComment />
                  <span className="text-xs">{cardComments.length}</span>
                </>
              )
            }
          </div>
          </div>
        {
          icon && (
              <MdEdit />
          )
        }
      </div>
    </div>
  )
}

export default TodoCard