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
    <div className="create_list_form">
      {
        open ? (
          <div className="bg-slate-300 p-2 rounded w-full">
            <input
              autoFocus
              type="text"
              placeholder="Enter list title"
              className="create_list_form_input"
              name="title"
              onChange={(event) => handleChangeEvent(event)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') createList()
              }}
            />
            <div className="flex items-center">
              <button
                onClick={createList}
                className="create_list_form_input_addbutton"
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
            className="create_list_form_copybutton">
          <MdAdd color="white" size={24} />
          <p className="ml-2 text-xs text-white">Add another list</p>
        </div>
      }
    </div>
  )
}

export default CreateListForm