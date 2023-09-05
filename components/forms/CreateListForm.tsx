import React, { FormEvent } from 'react'
import { MdAdd, MdClose } from "react-icons/md";

interface Props {
  addColumn: (title: string) => void
}

// Create a new list
function CreateListForm({ addColumn }: Props) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  // create new list column in database
  const createList = () => {
    if (!title) return
    addColumn(title)
    setOpen(false)
  }
  // handle event
  function handleChangeEvent(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
  }
  return (
    <div className="py-4 w-72 shrink-0">
      {
        open ? (
          <div className="bg-slate-300 p-2 rounded w-full">
            <input
              autoFocus
              type="text"
              placeholder="Enter list title"
              className="w-full py-3 px-2 rounded text-xs border-slate-400 outline-blue-500 mb-2"
              name="title"
              onChange={(event) => handleChangeEvent(event)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') createList()
              }}
            />
            <div className="flex items-center">
              <button
                onClick={createList}
                className="px-3 py-3 rounded font-sans text-xs font-semibold outline-black mr-2 bg-blue-700 text-white"
              >
                Add list
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
          className="flex items-center px-4 h-full transition-all duration-200 bg-neutral-500/50 hover:bg-blue-400 py-2 cursor-pointer rounded-md">
          <MdAdd color="white" size={24} />
          <p className="ml-2 text-xs text-white">Add another list</p>
        </div>
      }
    </div>
  )
}

export default CreateListForm