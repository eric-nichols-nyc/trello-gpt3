/*
* This component is the main board of the application. It will contain all the columns and cards.
*/
'use client'
import { useBoardStore } from '@/store/BoardStore'
import React, { useEffect } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import Column from './Column'
import CreateListForm from './CreateListForm'

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

    const lists = [
      {
        id: 0,
        title: 'To Do',
        todos: []
      },
      {
        id: 1,
        title: '',
        todos: []
      }
    ];

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
    <div className="h-screen bg-red-600 overflow-hidden flex items-start justify-center px-5">
      <CreateListForm />
      <div className="bg-blue w-full h-screen font-sans">
        <div className="flex px-4 pb-8 items-start overflow-x-scroll">
          <div className="rounded bg-grey-light  flex-no-shrink w-64 p-2 mr-3">
            <div className="flex justify-between py-1">
              <h3 className="text-sm">New landing page</h3>
              <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
            </div>
            <div className="text-sm mt-2">
              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Do a mobile first layout
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Check the meta tags
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Check the responsive layout on all devices
                <div className="text-grey-darker mt-2 ml-2 flex justify-between items-start">
                  <span className="text-xs flex items-center">
                    <svg className="h-4 fill-current mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" /></svg>
                    3/5
                  </span>
                  <img src="https://i.imgur.com/OZaT7jl.png" className="rounded-full" />
                </div>
              </div>
              <p className="mt-3 text-grey-dark">Add a card...</p>
            </div>
          </div>
          <div className="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3">
            <div className="flex justify-between py-1">
              <h3 className="text-sm">Old landing</h3>
              <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
            </div>
            <div className="text-sm mt-2">
              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Delete all references from the wiki
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Remove analytics code
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Whatever
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                <p>Think more tasks for this example</p>
                <div className="bg-red rounded p-1 mt-2 inline-flex text-white text-xs">
                  <svg className="h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" /></svg>
                  2
                </div>
              </div>
              <p className="mt-3 text-grey-dark">Add a card...</p>
            </div>
          </div>
          <div className="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3">
            <div className="flex justify-between py-1">
              <h3 className="text-sm">Do more cards</h3>
              <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
            </div>
            <div className="text-sm mt-2">
              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Delete all references from the wiki
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Remove analytics code
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Whatever
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Delete all references from the wiki
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Remove analytics code
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Whatever
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                <p>Think more tasks for this example</p>
                <div className="bg-red rounded p-1 mt-2 inline-flex text-white text-xs">
                  <svg className="h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" /></svg>
                  2
                </div>
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Delete all references from the wiki
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Remove analytics code
              </div>

              <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                Whatever
              </div>
              <p className="mt-3 text-grey-dark">Add a card...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board