'use client'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import Column from '../column/Column'
import BoardSideMenu from '../BoardSideMenu'
import CreateListForm from '../forms/CreateListForm'
import useSWR, { Fetcher, mutate } from 'swr'
import axios from 'axios'
import { getNewOrder } from '@/utils/getItemOrder'
import Loader from '../Loader'
import { useCardStore } from '@/store/CardStore'
import { useBoardStore } from '@/store/BoardStore'
import { BsThreeDots } from 'react-icons/bs'
/*
* This component is the main board of the application. 
  It will contain all the columns and cards.
*/
function Board() {
  
  const fetcher: Fetcher<[], string> = (...args: string[]) => fetch(...args as [string, RequestInit]).then((res) => res.json());
  function useData(id: string) {
    return useSWR(`/api/${id}`, fetcher);
  }
  // swr state
  const { data: cards } = useData('cards') as { data: Card[] };
  const { data: cols } = useData('columns') as { data: Column[] };
  const { data: user } = useData('auth/users') as { data: User[] };
  const { data: comments } = useData('comments') as { data: Comment[] };
  // local state
  const [items, setItems] = useState<Card[]>()
  // zustand
  const [setShowMenu] = useBoardStore((state) => [state.setShowMenu]);
  const [allCards] = useCardStore((state) => [state.allCards]);

  // revalidate cards
  useEffect(() => {
    if (!allCards) return
    if (!cards) return
    const sorted = cards.sort((a, b) => a.order.localeCompare(b.order))
    setItems(sorted)
  }, [cards, allCards])

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

  // new order for the column should be last item in array
  const getNewItemOrder = (arr: Column[] | Card[]) => {
    if (!arr) return 'm'
    const order = getNewOrder(arr, arr?.length - 1, arr?.length)
    return order
  }
  // return user background from user in db or default color
  const getUserBg = () => {
    if (!user || !user[0]) return 'bg-gradient-to-r from-violet-600 to-indigo-600'
    if (!user[0].backgroundColor && !user[0].backgroundImage) return 'bg-gradient-to-r from-violet-600 to-indigo-600'
    if (user[0].backgroundColor && !user[0].backgroundImage) return user[0].backgroundColor
    // if (!user[0].backgroundColor && user[0].backgroundImage) return `[bg-url(${user[0].backgroundImage})]`
    const bg = user[0].backgroundImage
    if (!user[0].backgroundColor && user[0].backgroundImage) return "bg-no-repeat bg-cover bg-center [bg-url("+bg+"})]"

    return user[0].backgroundColor
  }

  // ADD NEW COLUMN TO DATABASE
  const addNewColumnToDB = async (name: string) => {
    // create obj add new column to db
    const col = {
      columnName: name,
      name,
      order: getNewItemOrder(cols),
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
      order: getNewItemOrder(cards),
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

  const updateCardDragAndDrop = (results: any) => {
    const { source, destination, draggableId, type } = results;
    const cardSourceIndex = source.index;
    const cardDestinationIndex = destination.index;

    // 2. find card index from destination column
    const colDestinationIndex = cols?.findIndex(
      (col) => col._id === destination.droppableId
    );

    const destinationColumn = cols && cols[colDestinationIndex];
    const cardsCopy = [...cards];
    // 3. get the card id and get find the destination column and index
    const card = cardsCopy?.find((card) => card._id === draggableId);
    if (!card) return;
    // find the cards in the target column
    const cardsInTargetColumn = cardsCopy?.filter(
      (card) => card.columnId === destinationColumn._id
    );
    // 4. get a new order for the card
    const order = getNewOrder(cardsInTargetColumn, cardSourceIndex, cardDestinationIndex);
    if (!order) throw new Error('Error: order is undefined');
    // 5. update the card with the new column and order
    card.columnId = destinationColumn._id;
    card.order = order;
    // 6. update the state immediately with swr
    // update the local state with the new order
    cardsCopy.sort((a, b) => a.order.localeCompare(b.order));
    setItems(cardsCopy)
    // 7. reordering the cards in the database
    updateCardInDB(card)
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
      // copy cols array
      let reorderedCols = [...cols];
      // 1. find the target column
      // 2. find index of source and destination
      let colSourceIndex = source.index;
      const colDestinatonIndex = destination.index;
      // 3. remove col from array
      let changedCol = reorderedCols[colSourceIndex];

      const order = getNewOrder(reorderedCols, colSourceIndex, colDestinatonIndex);
      if (order) {
        changedCol.order = order;
      } else {
        throw new Error('Error: order is undefined')
      }
      reorderedCols.sort((a, b) => a.order.localeCompare(b.order));
      // 4. update the state immediately with swr
      mutate('/api/columns', reorderedCols, false);
      // 5. reordering the cols in the database
      updateColumnInDB(changedCol)
      return
    }

    //=============== HANDLE CARDS DRAG AND DROP =================
    updateCardDragAndDrop(results)
 
  };
  // return user background from user in db or default color
  const getBgImage = () => {
    if(!user || !user[0]) return
    if(!user[0].backgroundImage) return
    const externalImageUrl = user[0].backgroundImage
    return {backgroundImage: "url(" + externalImageUrl + ")"} 
  }

  if (!cols || !items || !user) return <Loader />;

  return (
    <div className={`h-full ${getUserBg()} overflow-hidden flex flex-col items-start justify-center relative`}
      style={getBgImage()}>
      {/* Header */}
      <div className="header">
        <div>Welcome Board</div>
        <div><BsThreeDots
          size={30}
          className="cursor-pointer hover:bg-slate-500 p-1 rounded"
          onClick={() => setShowMenu(true)}
        /></div>
      </div>
      {/* Main Content */}
      <div className="board_header_main">
        <div className="board_header_main_content">
          <DragDropContext onDragEnd={handleDragAndDrop}>
            <Droppable droppableId="ROOT" direction="horizontal" type="column">
              {(provided, snapshot) =>
                <div
                  className='flex items-start py-4'
                  {...provided.droppableProps}
                  ref={provided.innerRef}>{
                    cols.map((column: Column, index) => {
                      const { _id, columnName, order } = column
                      // match the cards to the column
                      const arr = items.filter((card: Card) => card.columnId === _id);
                      return <Column
                        key={_id}
                        id={_id}
                        order={order}
                        name={columnName}
                        cards={arr}
                        index={index}
                        deleteColumn={deleteColumnInDB}
                        addCard={addNewCardToDB}
                        comments={comments}
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
  )
}

export default Board