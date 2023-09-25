/**
 * Dragable column component
 */
import {useState} from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from '../TodoCard'
import { BsThreeDots } from 'react-icons/bs'
import CreateCardForm from '../forms/CreateCardForm'
import ColumnMenu from './ColumnOptions'

type Props = {
  id: string,
  name: string,
  cards: Card[],
  index: number,
  order: string,
  deleteColumn: (id: string) => void
  addCard: (title: string, id: string) => void
  comments: Comment[]
}

function Column({ 
  id, 
  cards, 
  name, 
  index, 
  order, 
  deleteColumn, 
  addCard,
  comments,
}: Props) {
  // local state
  const [showExtras, setShowExtras] = useState<boolean>(false)

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`relative rounded-lg mr-2 shadow-sm ${snapshot.isDragging && 'rotate-4'}`}
        >
          
          {/* render droppable todos */}
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='bg-slate-900 shrink-0 w-72 text-slate-100 rounded-lg flex flex-col'
              >
                <div className='flex justify-between items-center'>
                  <h3 className='flex justify-between font-bold text-sm p-2'>{name}</h3>
                  <BsThreeDots className='h-6 w-6 text-gray-400 mr-2 cursor-pointer' onClick={() => setShowExtras(!showExtras)} />
                  <ColumnMenu id={id} show={showExtras} closeMenu={setShowExtras} deleteColumn={deleteColumn} />
                </div>

                <div className="mx-2 list">
                  {cards.map((card, index) => (
                    <Draggable 
                              key={card._id} 
                              draggableId={card._id} 
                              index={index}
                            >
                      {(provided,snapshot) => (
                          <TodoCard
                            card={card}
                            index={index}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            draggableHandleProps={provided.dragHandleProps}
                            comments={comments}
                            isDragging={snapshot.isDragging}
                          />
                      )}
                    </Draggable>
                  ))}
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