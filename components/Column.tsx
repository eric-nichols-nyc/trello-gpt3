/**
 * Dragable column component
 */
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid'
import { useBoardStore } from '@/store/BoardStore'
import { useModalStore } from '@/store/ModalStore'
import { getServerSession } from "next-auth/next"

type Props = {
  id: string,
  name: string,
  cards: Card[],
  index: number
}

function Column({ id, cards, name, index }: Props) {
  const [openModal] = useModalStore((state) => [state.openModal])
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`rounded mr-2 shadow-sm ${snapshot.isDragging ? 'bg-gray-100' : 'bg-white'}`}
        >
          {/* render droppable todos */}
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`shrink-0 w-72 bg-slate-300 rounded flex flex-col ${snapshot.isDraggingOver ? 'bg-green-100' : 'bg-white'}`}
              >
                <div className='flex justify-between'>
                  <h3 className='flex justify-between font-bold text-sm p-2'>{name}</h3>
                  <MinusCircleIcon className='h-6 w-6 text-red-400' onClick={openModal} />
                </div>

                <div className="mx-2">
                  {cards.map((card, index) => {
                    return <Draggable key={card._id} draggableId={card._id} index={index}>
                      {(provided) => (
                        <TodoCard
                          card={card}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          draggableHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  })}
                  {provided.placeholder}
                  <div className='flex items-end justify-end p-2'>
                    <button>
                      <PlusCircleIcon className='h-6 w-6 text-green-400' onClick={openModal} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>

        </div>
      )}
    </Draggable>
  )
}

export default Column