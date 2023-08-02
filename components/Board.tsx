/*
* This component is the main board of the application. It will contain all the columns and cards.
*/
'use client'
import { useBoardStore } from '@/store/BoardStore'
import React, { useEffect } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import Column from './Column'

function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
    state.updateTodoInDB])

  useEffect(() => {
    // get board data from server
    getBoard();
    return () => {
      // second
    }
  }, [getBoard])

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log('source = ', source.droppableId)
    //check if use drop the card outside the droppable area
    if (!destination) return;
    // handle column drag
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      // create new map
      const rearaangedColumns = new Map(entries);
      // update board state
      setBoardState({
        ...board,
        columns: rearaangedColumns
      })

      return;
    } 
    // handle card drag
    // this step is need as the column indexs are stored as numbers 0,1,2 instead of ids
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finalColIndex = columns[Number(destination.droppableId)];

    console.log(columns, startColIndex, finalColIndex)

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos
    }

    const destinationCol: Column = {
      id: finalColIndex[0],
      todos: finalColIndex[1].todos
    }
    if (!startCol || !destinationCol) return;
    if (source.index === destination.index && startCol === destinationCol) return;
    // copy the todos from the source column
    const newTodos = startCol.todos
    // target the moved todo
    const [todoMoved] = newTodos.splice(source.index, 1);
    // push moved todo to the destination column
    if (startCol.id === destinationCol.id) {
      // Todo is in the same column
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol: Column = {
        id: startCol.id,
        todos: newTodos
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({ ...board, columns: newColumns });
    } else {
      // remove from start column and add to destination column
      const destinationTodos = Array.from(destinationCol.todos);
      // add to destination column todos
      destinationTodos.splice(destination.index, 0, todoMoved);
      // copy columns
      const newColums = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos
      }

      newColums.set(startCol.id, newCol);
      newColums.set(destinationCol.id, {
        id: destinationCol.id,
        todos: destinationTodos
      });

      // Update in DB
      updateTodoInDB(todoMoved, destinationCol.id);

      // set board state to new columns
      setBoardState({
        ...board,
        columns: newColums
      })
    }
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) =>
          <div
            className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5 max-w-7xl mx-auto'
            {...provided.droppableProps}
            ref={provided.innerRef}>{
              Array.from(board.columns.entries()).map(([id, column], index) => (
                <Column
                  key={id}
                  id={id}
                  todos={column.todos}
                  index={index}
                />
              ))
            }
          </div>
        }
      </Droppable>
    </DragDropContext>
  )
}

export default Board