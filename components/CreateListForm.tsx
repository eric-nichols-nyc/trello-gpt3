/** Add a new list */
import React, { FormEvent } from 'react'
import { MdAdd, MdClose } from "react-icons/md";

function CreateListForm() {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  // create new list column in database
  const createList = () => {
    if (!title) return
    console.log('createList', title)
  }
  // handle event
  function handleChangeEvent(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
    console.log(target.value);
  }
  return (

    <div className="p-2 w-72 shrink-0">
      {
        open ? (
          <div className="bg-slate-300 p-2 rounded w-full">
            <input
              type="text"
              placeholder="Enter list title"
              className="w-full py-3 px-2 rounded text-xs border-slate-400 outline-blue-500 mb-2"
              name="title"
              onChange={(event) => handleChangeEvent(event)}
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
          className="flex items-center px-4 h-full transition-all duration-200 bg-blue-500 hover:bg-blue-400 py-2 cursor-pointer rounded-md">
          <MdAdd color="white" size={24} />
          <p className="ml-2 text-xs text-white">Create new list</p>
        </div>
      }
    </div>
  )
}

export default CreateListForm