/*
* This component is the main board of the application. It will contain all the columns and cards.
*/
'use client'
import { useBoardStore } from '@/store/BoardStore'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import Column from './Column'
import CreateListForm from './CreateListForm'
import useSWR, { Fetcher, mutate } from 'swr'

function Board() {
  // local state
  const [lists, setLists] = useState<Column[]>();

  const fetcher: Fetcher<[], string> = (...args: string[]) => fetch(...args as [string, RequestInit]).then((res) => res.json());

  function useData(id:string) {
    return  useSWR(`/api/${id}`, fetcher);
  }
  const { data: cards } = useData('cards') as { data: Card[] };
  const { data: cols } = useData('columns') as { data: Column[] };

  console.log(cols)

  useEffect(() => {
    console.log('columns ', cols)
   // set columns to swr data
    setLists(cols)
  }, [cols])

  // handle drag and drop
  const handleDragAndDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    // handle column drag and drop
    if (type === "column") {
      if(!cols) return;
      // copy to cols array
      const reorderedCols = [...cols];
      console.log('reorderedCols ', reorderedCols)
      // find out the index of the source and destination
      const colSourceIndex = source.index;
      const colDestinatonIndex = destination.index;
      // remove the col from the array
      const [removeList] = reorderedCols.splice(colSourceIndex, 1);
      // add the col to the array in the right index
      reorderedCols.splice(colDestinatonIndex, 0, removeList);
      // reordering the cols in the database
      return setLists(reorderedCols);
    }
    // handle card drag and drop
    const cardSourceIndex = source.index;
    const cardDestinationIndex = destination.index;

    const colSourceIndex = lists?.findIndex(
      (store) => store._id === source.droppableId
    );
    const storeDestinationIndex = lists?.findIndex(
      (store) => store._id === destination.droppableId
    );
    if(!colSourceIndex || !storeDestinationIndex || !lists) return;
    const newSourcsCards = [...lists[colSourceIndex].cards];
    const newDestinationCards =
      source.droppableId !== destination.droppableId
        ? [...lists[storeDestinationIndex].cards]
        : newSourcsCards;

    const [deletedItem] = newSourcsCards.splice(cardSourceIndex, 1);
    newDestinationCards.splice(cardDestinationIndex, 0, deletedItem);

    const newLists = [...lists];

    newLists[colSourceIndex] = {
      ...lists[colSourceIndex],
      cards: newSourcsCards,
    };
    newLists[storeDestinationIndex] = {
      ...lists[storeDestinationIndex],
      cards: newDestinationCards,
    };

    setLists(newLists);
  };

  if (!lists || !cols || !cards) return null;
  return (
    <div className="h-full bg-red-600 overflow-hidden flex items-start justify-center px-5">
      <div className="bg-blue w-full h-full font-sans">
        <div className="flex px-4 pb-8 items-start overflow-x-auto flex-1 h-full">
          {/* <CreateListForm /> */}
          <DragDropContext onDragEnd={handleDragAndDrop}>
            <Droppable droppableId="ROOT" direction="horizontal" type="column">
              {(provided) =>
                <div
                  className='flex items-start py-2'
                  {...provided.droppableProps}
                  ref={provided.innerRef}>{
                    cols.sort((a:Column, b:Column) => a.order - b.order).map((column:Column, index) => {
                      const { _id, columnName } = column
                      // match the cards to the column
                      const items = cards.filter((card:Card) => card.columnId === _id);
                     return <Column
                        key={_id}
                        id={_id}
                        name={columnName}
                        cards={items}
                        index={index}
                      />
                  })
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