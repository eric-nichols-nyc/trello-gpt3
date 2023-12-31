'use client'
import { MdEdit } from 'react-icons/md';
import React, { useState, useEffect } from 'react'
import { useModalStore } from '@/store/ModalStore'
import { useCardStore } from '@/store/CardStore'
import { BsTextLeft } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

type Props = {
  card: Card;
  index: number;
  innerRef: any;
  draggableProps: any;
  draggableHandleProps: any;
  comments: Comment[];
  isDragging: boolean;
}

function TodoCard({
  card,
  innerRef,
  draggableProps,
  draggableHandleProps,
  comments,
  isDragging = false,
}: Props) {
  const params = useSearchParams()
  // lcoal state
  const [icon, showIcon] = useState(false)
  const [cardComments, setCardComments] = useState<Comment[]>([])
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
    if(!comments || comments.length === 0) return
    setCardComments(comments.filter((comment) => comment.cardId === card._id))
  }, [comments, card._id])


  return (
    <div
      {...draggableProps}
      {...draggableHandleProps}
      ref={innerRef}
      className='text-sm mt-2 relative'>
      <div 
        className={`card_contents ${isDragging && 'rotate-4'}`}
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
                <div>
                  
                </div>
                  <FaRegComment />
                  <span className="text-xs">{cardComments.length}</span>
                </>
              )
            }
          </div>
          </div>
        {
          icon && (
            <div className="absolute right-2 p-1 w-6 h-6 bg-slate-800/80">
              <MdEdit />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default TodoCard