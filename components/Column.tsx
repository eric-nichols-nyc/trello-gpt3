/**
 * Dragable column component
 */
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useBoardStore } from '@/store/BoardStore'
import { useModalStore } from '@/store/ModalStore'
type Props = {
  id: TypedColumn,
  todos: Todo[],
  index: number
}

const idTocolumnText: {
  [key in TypedColumn]: string;
} = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done'
}

function Column({ id, todos, index }: Props) {
  const [searchString] = useBoardStore((state) => [state.searchString])
  const [openModal] = useModalStore((state) => [state.openModal])
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`p-2 rounded-2xl shadow-sm ${snapshot.isDragging ? 'bg-gray-100' : 'bg-white'}`}
        >
          {/* render droppable todos */}
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`pb-2 rounded-2xl ${snapshot.isDraggingOver ? 'bg-green-100' : 'bg-white'}`}
              >
                <h2 className='flex justify-between font-bold text-xl'>{idTocolumnText[id]}
                  <span className='text-gray-500 bg-gray-200 rounded-full p-2 text-sm font-normal'>{!searchString 
                  ? todos.length 
                  : todos.filter((todo) => todo.title.toLowerCase()
                  .includes(searchString.toLowerCase()))
                  .length}</span></h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if(searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase())) return null
                      return  <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
                      {(provided) => (
                        <TodoCard
                          todo={todo}
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
                      <PlusCircleIcon className='h-6 w-6 text-green-400' onClick={openModal}/>
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