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
import axios from 'axios'

function Board() {
  const fetcher: Fetcher<[], string> = (...args: string[]) => fetch(...args as [string, RequestInit]).then((res) => res.json());

  function useData(id:string) {
    return  useSWR(`/api/${id}`, fetcher);
  }
  const { data: cards } = useData('cards') as { data: Card[] };
  const { data: cols } = useData('columns') as { data: Column[] };

  // console.log(cols)
  const updateColumn = async(column:Column) => {
    const res = await axios.put(`/api/columns/${column._id}`, column)
    if(!res.data) {
      console.log('error')
      return
    }
    const cols = await axios.get('/api/columns')
    mutate('/api/columns', cols, false);
  }

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
      // find out the index of the source and destination
      let colSourceIndex = source.index;
      const colDestinatonIndex = destination.index;
      // remove the col from the array
      const [changedCol] = reorderedCols.splice(colSourceIndex, 1);
      // add the col to the array in the right index
      reorderedCols.splice(colDestinatonIndex, 0, changedCol);
      console.log('changedCol ', changedCol)
      console.log('reorderedCols ', reorderedCols)
      // reordering the cols in the database
      updateColumn(changedCol)
      mutate('/api/columns', reorderedCols, false);
      return 
    }
    //=============== handle card drag and drop
    const cardSourceIndex = source.index;
    const cardDestinationIndex = destination.index;

    let colSourceIndex = cols?.findIndex(
      (col) => col._id === source.droppableId
    );
    const colDestinationIndex = cols?.findIndex(
      (col) => col._id === destination.droppableId
    );
    if(!colSourceIndex || !colDestinationIndex || !cols) return;
    const newSourcsCards = [...cols[colSourceIndex].cards];
    const newDestinationCards =
      source.droppableId !== destination.droppableId
        ? [...cols[colDestinationIndex].cards]
        : newSourcsCards;

    const [deletedItem] = newSourcsCards.splice(cardSourceIndex, 1);
    newDestinationCards.splice(cardDestinationIndex, 0, deletedItem);

    const newLists = [...cols];

    newLists[colSourceIndex] = {
      ...cols[colSourceIndex],
      cards: newSourcsCards,
    };
    newLists[colDestinationIndex] = {
      ...cols[colDestinationIndex],
      cards: newDestinationCards,
    };

    // REODER CARDS IN THE DATABASE...
  };

  if (!cols || !cards) return null;
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
                    cols.map((column:Column, index) => {
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