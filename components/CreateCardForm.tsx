import { set } from 'mongoose';
import React, { FormEvent } from 'react'
import { MdAdd } from "react-icons/md";

interface Props {
  id: string;
  addCard: (title: string, id:string) => void
}

// Create a new card 
// card is sent to database
// swr hook updates the UI
function CreateCardForm({ addCard, id }: Props) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  // create new list column in database
  const createCard = () => {
    if (!title) return
    // 
    addCard(title, id)
    setTitle('')
    // unlike list form this form does not auto close
    // setOpen(false)
  }
  // handle event
  function handleChangeEvent(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
  }
  return (

    <div className="p-2 w-72 shrink-0">
      {
        open ? (
          <div className="bg-slate-300 p-2 rounded w-full">
            <input
              autoFocus
              type="text"
              placeholder="Enter card title"
              className="w-full py-3 px-2 rounded text-xs border-slate-400 outline-blue-500 mb-2"
              name="title"
              onChange={(event) => handleChangeEvent(event)}
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
                X
              </button>
            </div>
          </div>
        ) : <div
          onClick={() => setOpen(true)}
          className="flex items-center px-4 h-full transition-all duration-200 bg-blue-500 hover:bg-blue-400 py-2 cursor-pointer rounded-md">
          <MdAdd color="white" size={24} />
          <p className="ml-2 text-xs text-white">Create new card</p>
        </div>
      }
    </div>
  )
}

export default CreateCardForm