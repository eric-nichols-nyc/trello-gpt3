/*
* This component is the main board of the application. It will contain all the columns and cards.
*/
'use client'
import { useBoardStore } from '@/store/BoardStore'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import Column from './Column'
import CreateListForm from './CreateListForm'
import data from '../public/json/columns.json';
const DATA = [
  {
    _id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    cards: [
      { _id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { _id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    _id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    cards: [
      {
        _id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { _id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    _id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    cards: [
      { _id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { _id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];

function BoardStatic() {
  // local state
  const [stores, setStores] = useState(DATA);
  // handle drag and drop
  const handleDragAndDrop = (results:any) => {
    const { source, destination, type } = results;
    console.log(results)

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "column") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;
    console.log('droppable id',source.droppableId)

    const storeSourceIndex = stores.findIndex(
      (store) => store._id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store._id === destination.droppableId
    );
    const newSourceItems = [...stores[storeSourceIndex].cards];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].cards]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      cards: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      cards: newDestinationItems,
    };

    setStores(newStores);
  };
  return (
    <div className="h-full bg-red-600 overflow-hidden flex items-start justify-center px-5">
      <div className="bg-blue w-full h-full font-sans">
        <div className="flex px-4 pb-8 items-start overflow-x-auto flex-1 h-full border border-cyan-100">
          <CreateListForm />
          <DragDropContext onDragEnd={handleDragAndDrop}>
            <Droppable droppableId="ROOT" direction="horizontal" type="column">
              {(provided) =>
                <div
                  className='flex items-start py-2'
                  {...provided.droppableProps}
                  ref={provided.innerRef}>{
                    stores.map((column, index) => (
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

export default BoardStatic