/**
 * Dragable column component
 */
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from '../TodoCard'
import { BsThreeDots } from 'react-icons/bs'
import CreateCardForm from '../CreateCardForm'
import ColumnMenu from './ColumnOptions'

type Props = {
  id: string,
  name: string,
  cards: Card[],
  index: number,
  order: string,
  deleteColumn: (id: string) => void
  addCard: (title: string, id: string) => void
}

function Column({ id, cards, name, index, order, deleteColumn, addCard }: Props) {
  const [showExtras, setShowExtras] = React.useState<boolean>(false)

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`relative rounded mr-2 shadow-sm ${snapshot.isDragging ? 'bg-gray-100' : 'bg-white'}`}
        >
          {/* render droppable todos */}
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='bg-slate-950 shrink-0 w-72 text-slate-100 rounded flex flex-col'
              >
                <div className='flex justify-between items-center'>
                  <h3 className='flex justify-between font-bold text-sm p-2'>{name} {order}</h3>
                  <BsThreeDots className='h-6 w-6 text-gray-400 mr-2 cursor-pointer' onClick={() => setShowExtras(!showExtras)} />
                  <ColumnMenu id={id} show={showExtras} closeMenu={setShowExtras} deleteColumn={deleteColumn}/>
                </div>

                <div className="mx-2 list">
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

                </div>
                {/* send information to board to add to db */}
                <CreateCardForm id={id} addCard={addCard} />
              </div>
            )}
          </Droppable>

        </div>
      )}
    </Draggable>
  )
}

export default Column