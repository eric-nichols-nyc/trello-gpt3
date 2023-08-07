/*
* This component is the main board of the application. It will contain all the columns and cards.
*/
'use client'
import { useBoardStore } from '@/store/BoardStore'
import React, { useEffect } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import Column from './Column'
import CreateListForm from './CreateListForm'
import data from '../public/json/columns.json';

function Board() {
  // const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
  //   state.board,
  //   state.getBoard,
  //   state.setBoardState,
  //   state.updateTodoInDB])

  //   console.log(data)

  // useEffect(() => {
  //   // get board data from server
  //   getBoard();
  //   const columns = data.columns;
  //   console.log('columns = ', columns)
  //   return () => {
  //     // second
  //   }
  // }, [getBoard])

  const [lists, setLists] = React.useState(data.columns);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log('source = ', destination)
    //check if use drop the card outside the droppable area
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    // handle column drag
    if (type === 'column') {
      // copy current state and store it in a variable
      const reorderedColumns = [...lists];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      // remove the column from the state and store it in a variable
      const [removedColumn] = reorderedColumns.splice(sourceIndex, 1);
      // addes the removed column to the destination index
      reorderedColumns.splice(destinationIndex, 0, removedColumn);
      // set the state with the new order
      setLists(reorderedColumns);
      // const entries = Array.from(board.columns.entries());
      // const [removed] = entries.splice(source.index, 1);
      // entries.splice(destination.index, 0, removed);
      // create new map
      //const rearaangedColumns = new Map(entries);
      // update board state
      // setBoardState({
      //   ...board,
      //   columns: rearaangedColumns
      // })

      return;
      // handle card drag
      // this step is need as the column indexs are stored as numbers 0,1,2 instead of ids
      // const columns = Array.from(board.columns);
      // console.log('columns = ', columns)
      // const startColIndex = columns[Number(source.droppableId)];
      // const finalColIndex = columns[Number(destination.droppableId)];


      // const startCol: Column = {
      //   id: startColIndex,
      //   todos: startColIndex[1].todos
      // }

      // const destinationCol: Column = {
      //   id: finalColIndex[0],
      //   todos: finalColIndex[1].cards
      // }
      //if (!startCol || !destinationCol) return;
      // if (source.index === destination.index && startCol === destinationCol) return;
      // copy the todos from the source column
      //const newTodos = startCol.cards
      // target the moved todo
      //const [todoMoved] = newTodos.splice(source.index, 1);
      // push moved todo to the destination column
      //if (startCol.id === destinationCol.id) {
      // Todo is in the same column
      // newTodos.splice(destination.index, 0, todoMoved);
      // const newCol: Column = {
      //   id: startCol.id,
      //   todos: newTodos
      // };
      // const newColumns = new Map(board.columns);
      // newColumns.set(startCol.id, newCol);

      //setBoardState({ ...board, columns: newColumns });
    } else {
      const reorderedStores = [...lists];
      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;
      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);
      // make copy of columns
      //let newLists = [...lists];
      // find the cards and destination indexes
      const cardSourceIndex = source.index;
      const cardDestinationIndex = destination.index;
      // find the source and destination columns
      const itemDestinationIndex = destination.index;
      console.log('source droppable',source.droppableId)
      const sourceColIndex = lists.findIndex(
        (l) => l._id === source.droppableId
      );
      const destColIndex = lists.findIndex(
        (l) => l._id === destination.droppableId
      );

      // create copy of source and destination cards
      const newSourceCards = [...lists[sourceColIndex].cards];
      // const newDestinationCards = [...lists[destColIndex].cards];

      // if drag is not in the same column get destination column items
      // else use source column items
      let newDestinationCards = [];
      if (source.droppableId !== destination?.droppableId) {
        newDestinationCards = [...lists[itemDestinationIndex].cards]
      } else {
        newDestinationCards = newSourceCards
      }

      // pull out the item from the source
      const [removedItem] = newSourceCards.splice(cardSourceIndex, 1);

      // add item to destination
      newDestinationCards.splice(itemDestinationIndex, 0, removedItem);
      console.log('newDestinationCards', newDestinationCards)
      const newLists = [...lists];

      // update both columns with new cards
      newLists[sourceColIndex] = {
        ...lists[sourceColIndex],
        cards: newSourceCards,
      };
      newLists[destColIndex] = {
        ...lists[destColIndex],
        cards: newDestinationCards,
      };

      // set lists to new lists
      setLists(newLists);
      // if drag is in a different column
      // remove from start column and add to destination column
      // const destinationTodos = Array.from(destinationCol.todos);
      // add to destination column todos
      //destinationTodos.splice(destination.index, 0, todoMoved);
      // copy columns
      // const newColums = new Map(board.columns);
      // const newCol = {
      //   id: startCol.id,
      //   todos: newTodos
      // }

      // newColums.set(startCol.id, newCol);
      // newColums.set(destinationCol.id, {
      //   id: destinationCol.id,
      //   todos: destinationTodos
      // });

      // Update in DB
      // updateTodoInDB(todoMoved, destinationCol.id);

      // set board state to new columns
      // setBoardState({
      //   ...board,
      //   columns: newColums
      // })
    }
  }
  return (
    <div className="h-full bg-red-600 overflow-hidden flex items-start justify-center px-5">
      <div className="bg-blue w-full h-full font-sans">
        <div className="flex px-4 pb-8 items-start overflow-x-auto flex-1 h-full border border-cyan-100">
          <CreateListForm />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="column">
              {(provided) =>
                <div
                  className='flex items-start py-2'
                  {...provided.droppableProps}
                  ref={provided.innerRef}>{
                    lists.map((column, index) => (
                      <Column
                        key={column._id}
                        id={column._id}
                        name={column.name}
                        cards={column.cards}
                        index={index}
                      />
                    ))
                  }
                </div>
              }
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}

export default Board