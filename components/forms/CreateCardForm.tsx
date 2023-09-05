"use client";
import { useState, FormEvent } from 'react'
import { MdAdd } from "react-icons/md";
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useDetectClickOutside } from 'react-detect-click-outside';

interface Props {
  id: string;
  addCard: (title: string, id:string) => void
}

// Create a new card 
// card is sent to database
// swr hook updates the UI
function CreateCardForm({ addCard, id }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  // create new list column in database
  const createCard = () => {
    if (!title) return
    // 
    addCard(title, id)
    setTitle('')
  }
  // handle event
  function handleChangeEvent(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
  }

  const hideInput = () => {
    setOpen(false)
  }

  const ref = useDetectClickOutside({ onTriggered: hideInput });
  return (

    <div className="p-2 w-72 shrink-0">
      {
        open ? (
          <div className="bg-gray-800 p-2 rounded w-full" ref={ref}>
            <input
              autoFocus
              type="text"
              placeholder="Enter card title"
              className="w-full bg-gray-800 py-3 px-2 rounded text-xs border-gray-400 outline-blue-500 mb-2"
              name="title"
              onChange={(e) => handleChangeEvent(e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') createCard()
              }}
              value={title}
            />
            <div className="flex items-center">
              <button
                onClick={createCard}
                className="px-3 py-3 rounded font-sans text-xs font-semibold outline-black mr-2 bg-blue-700 text-white"
              >
                Add card
              </button>
              <button
                onClick={() => setOpen(false)}
              >
                <XCircleIcon className='h-6 w-6 text-white-400' />
              </button>
            </div>
          </div>
        ) : <div
          onClick={() => setOpen(true)}
          className="flex items-center px-4 h-full transition-all duration-200 bg-transparent hover:bg-gray-700 py-2 cursor-pointer rounded-md">
          <MdAdd color="white" size={24} />
          <p className="ml-2 text-xs text-white">Add a card</p>
        </div>
      }
    </div>
  )
}

export default CreateCardForm