/*
* This component is the main board of the application. It will contain all the columns and cards.
*/
'use client'
import React, { use, useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import Column from './column/Column'
import BoardSideMenu from './BoardSideMenu'
import CreateListForm from './CreateListForm'
import useSWR, { Fetcher, mutate } from 'swr'
import axios from 'axios'
import { getNewOrder, getNewCardOrder } from '@/utils/getItemOrder'
import Loader from './Loader'
// import Modal from './Modal'
import { useModalStore } from '@/store/ModalStore'
import { useCardStore } from '@/store/CardStore'
import { useBoardStore } from '@/store/BoardStore'
import { BsThreeDots } from 'react-icons/bs'
import {toast} from 'react-toastify';

function Board() {
  // board state from zuustand
  const [bgColor, setShowMenu, setBGColor] = useBoardStore((state) => [state.bgColor, state.setShowMenu, state.setBGColor]);
  const fetcher: Fetcher<[], string> = (...args: string[]) => fetch(...args as [string, RequestInit]).then((res) => res.json());
  function useData(id: string) {
    return useSWR(`/api/${id}`, fetcher);
  }
  const { data: cards } = useData('cards') as { data: Card[] };
  const { data: cols } = useData('columns') as { data: Column[] };

  const [items, setItems] = useState<Card[]>()

  const [isOpen] = useModalStore((state) => [state.isOpen]);
  const [allCards, setCards] = useCardStore((state) => [state.allCards, state.setCards]);
  // revalidate cards
  useEffect(() => {
    if (!allCards) return
    console.log('add cards to board', allCards)
    if (!cards) return
    const sorted = cards.sort((a, b) => a.order.localeCompare(b.order))
    setItems(sorted)
  }, [cards, allCards])

  useEffect(() => {
    setCards();
  }, [setCards])

  useEffect(() => {
    setBGColor('bg-slate-800')
  }, [setBGColor])

  // UPDATE COLUMN IN DATABASE
  const updateColumnInDB = async (column: Column) => {
    // update column by id
    const res = await axios.put(`/api/columns/${column._id}`, column)
    if (!res.data) {
      console.log('error')
      return
    }
    mutate('/api/columns');
  }

  // DELETE COLUMN IN DATABASE
  const deleteColumnInDB = async (id: string) => {
    // delete column by id from db in api route
    const res = await axios.delete(`/api/columns/${id}`)
    if (!res.data) {
      console.log('error')
      return
    }
    // get new column order from db
    mutate('/api/columns');
  }

  // ADD NEW COLUMN TO DATABASE
  const addNewColumnToDB = async (name: string) => {
    // create obj add new column to db
    const col = {
      columnName: name,
      name,
      order: cols && cols.length ? getNewOrder(cols, cols?.length - 1, cols?.length - 1)! : "m",
    }
    
    const res = await axios.post('/api/columns', col)
    if (!res.data) {
      console.log('error')
      return
    }
    // get new column order from db
    mutate('/api/columns');
  }
  // ADD NEW CARD TO DATABASE
  const addNewCardToDB = async (title: string, id: string) => {
    // create obj add new card to db
    const card = {
      title,
      columnId: id,
      order: cards && cards.length ? getNewOrder(cards, cards?.length - 1, cards?.length - 1)! : "m",
    }
    const res = await axios.post('/api/cards', card)
    if (!res.data) {
      console.log('error')
      return
    }
    // revalidate cards
    mutate('/api/cards');
  }

  // UPDATE CARD IN DATABASE
  const updateCardInDB = async (card: Card) => {
    // update card by id
    const res = await axios.put(`/api/cards/${card._id}`, card)
    if (!res.data) {
      console.log('error')
      return
    }
    // revalidate cards
    mutate('/api/cards');
  }

  // handle drag and drop
  const handleDragAndDrop = (results: any) => {
    const { source, destination, draggableId, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    //=============== HANDLE COLUMN DRAG AND DROP =================
    if (type === "column") {
      if (!cols) return;
      // copy to cols array
      let reorderedCols = [...cols];
      // 1. find the target column
      // 2. find index of source and destination
      let colSourceIndex = source.index;
      const colDestinatonIndex = destination.index;
      // 3. remove col from array
      let changedCol = reorderedCols[colSourceIndex];

      console.log('changedCol', changedCol)
      const order = getNewOrder(reorderedCols, colSourceIndex, colDestinatonIndex);
      if (order) {
        changedCol.order = order;
        console.log('changedCol', changedCol)
      } else {
        throw new Error('Error: order is undefined')
      }
      reorderedCols.sort((a, b) => a.order.localeCompare(b.order));
      console.log('reorder = ', reorderedCols)
      // 4. update the state immediately with swr
      mutate('/api/columns', reorderedCols, false);
      // 5. reordering the cols in the database
      updateColumnInDB(changedCol)
      return
    }

    //=============== HANDLE CARDS DRAG AND DROP =================

    const cardSourceIndex = source.index;
    const cardDestinationIndex = destination.index;
    // 1. find card index from source column
    let colSourceIndex = cols?.findIndex(
      (col) => col._id === source.droppableId
    );
    // 2. find card index from destination column
    const colDestinationIndex = cols?.findIndex(
      (col) => col._id === destination.droppableId
    );

    const destinationColumn = cols && cols[colDestinationIndex];
    console.log('draggableId', draggableId)
    console.log('destinationColumn', destinationColumn)
    console.log('cardDestinationIndex', cardDestinationIndex)
    const cardsCopy = [...cards];
    // 3. get the card id and get find the destination column and index
    const card = cardsCopy?.find((card) => card._id === draggableId);
    console.log('card', card)
    if (!card) return;
    // find the cards in the target column
    const cardsInTargetColumn = cardsCopy?.filter(
      (card) => card.columnId === destinationColumn._id
    );
    // new order for the card = 
    console.log('cardsInTargetColumn', cardsInTargetColumn)
    // 4. get a new order for the card
    const order = getNewCardOrder(cardsInTargetColumn, cardSourceIndex, cardDestinationIndex);
    if (!order) throw new Error('Error: order is undefined');
    console.log('new card order = ', order)
    // 5. update the card with the new column and order
    card.columnId = destinationColumn._id;
    card.order = order;
    // 6. update the state immediately with swr
    console.log('cardsCopy', JSON.stringify(cardsCopy, null, 2))
    // update the local state with the new order
    cardsCopy.sort((a, b) => a.order.localeCompare(b.order));
    setItems(cardsCopy)
    // 7. reordering the cards in the database
    updateCardInDB(card)
  };

  if (!cols || !items || !bgColor) return <Loader />;

  return (
    <>
      {/* {
        isOpen && (<Modal />)
      } */}
      <div className={`h-full ${bgColor} overflow-hidden flex flex-col items-start justify-center relative`}>
        {/* Header */}
        <div className="flex w-full items-center justify-between text-slate-100 bg-opacity-50 text-xl font-semibold bg-slate-600 p-4">
          <div>Welcome Board</div>
          <div><BsThreeDots
            size={30}
            className="cursor-pointer hover:bg-slate-500 p-1 rounded"
            onClick={() => setShowMenu(true)}
          /></div>
        </div>
        {/* Main Content */}
        <div className="bg-blue w-full h-full font-sans px-5 relative">
          <div className="flex px-4 pb-8 items-start overflow-x-auto flex-1 h-full">
            <DragDropContext onDragEnd={handleDragAndDrop}>
              <Droppable droppableId="ROOT" direction="horizontal" type="column">
                {(provided) =>
                  <div
                    className='flex items-start py-4'
                    {...provided.droppableProps}
                    ref={provided.innerRef}>{
                      cols.map((column: Column, index) => {
                        const { _id, columnName } = column
                        // match the cards to the column
                        const arr = items.filter((card: Card) => card.columnId === _id);
                        return <Column
                          key={_id}
                          id={_id}
                          name={columnName}
                          cards={arr}
                          index={index}
                          deleteColumn={deleteColumnInDB}
                          addCard={addNewCardToDB}
                        />
                      })
                    }
                    {provided.placeholder}
                  </div>
                }
              </Droppable>
            </DragDropContext>
            <CreateListForm addColumn={addNewColumnToDB} />
          </div>
        </div>
        <BoardSideMenu />
      </div>
    </>
  )
}

export default Board