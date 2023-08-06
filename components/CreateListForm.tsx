/** Add a new list */
import React from 'react'
import { MdAdd, MdClose } from "react-icons/md";

function CreateListForm() {
  // create new list column in database
  const createList = () => {
    console.log('createList')
  }
  return (
    <div>
      {/* Open */}
      <div className="bg-slate-300 p-2 shrink-0 w-72 rounded overflow-hidden">
        <input 
          type="text" 
          placeholder="Enter list title" 
          className="w-full py-3 px-2 rounded text-xs border-slate-400 outline-blue-500 mb-2"
          name="title"
        />
        <div className="flex items-center">
          <button 
          onClick={createList}
          className="px-3 py-3 rounded font-sans text-xs font-semibold outline-black mr-2 bg-blue-700 text-white"
          >
            Add list
          </button>
          <button>
            X
          </button>
        </div>
      </div>
      {/* Closed */}
      <div className="flex items-center px-4 h-full transition-all duration-200 bg-blue-500 hover:bg-blue-400 py-2 cursor-pointer rounded-md">
        <MdAdd color="white" size={24} />
        <p className="ml-2 text-xs text-white">Create new list</p>
      </div>
    </div>
  )
}

export default CreateListForm