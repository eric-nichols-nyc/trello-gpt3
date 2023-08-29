import React, { FormEvent } from 'react'
import { MdAdd } from "react-icons/md";
import { XCircleIcon } from '@heroicons/react/24/solid';
import { mutate } from 'swr';
import Avatar from 'react-avatar';
import { useCardStore } from '@/store/CardStore'
import { useDetectClickOutside } from 'react-detect-click-outside';
interface Props {
  id: string;
  creatorId: string;
}

// Create a new comment 
function CreateCommenForm({ id, creatorId }: Props) {

  // global state
  const [currentCard] = useCardStore((state) => [state.currentCard]);
  // local state
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')

  const hideInput = () => {
    setOpen(false)
  }

  const ref = useDetectClickOutside({ onTriggered: hideInput });

  // create new comment in database and mutate
  const createComment = async () => {
    if (!title) return
    const obj = {
      cardId: currentCard._id,
      comment: title,
      creatorName: 'test',
      creatorId: creatorId,
    }
    // 
    try{
      const responae = await fetch(`/api/cards/${currentCard._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      setTitle('')
      mutate(`/api/cards/${id}/comments`)
    }catch(error){
      console.error(error)
    }

    // unlike list form this form does not auto close
    // setOpen(false)
  }
  // handle event
  function handleChangeEvent(event: FormEvent<HTMLTextAreaElement>) {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
  }


  return (

    <div className="w-full shrink-0 mb-4" ref={ref}>
      {
        open ? (
          <div className="rounded w-full flex border border-sky-200">
            <Avatar size="30"/>
            <div className="rounded w-full">
              <textarea
                autoFocus
                placeholder="Write a comment"
                className="w-full bg-gray-800 py-3 px-2 rounded text-xs border-gray-400 outline-blue-500 mb-2"
                name="title"
                onChange={(event) => handleChangeEvent(event)}
                value={title}
              />
              <div className="flex items-center">
                <button
                  onClick={createComment}
                  className="px-3 py-3 rounded font-sans text-xs font-semibold outline-black mr-2 bg-blue-700 text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setOpen(false)}
                >
                  <XCircleIcon className='h-6 w-6 text-white-400' />
                </button>
              </div>
            </div>

          </div>
        ) : <div
          onClick={() => setOpen(true)}
          className="flex items-center px-4 h-full transition-all duration-200 bg-gray-800 hover:bg-gray-400 py-2 cursor-pointer rounded-md">
          <p className="ml-2 text-xs text-white">Write a comment</p>
        </div>
      }
    </div>
  )
}

export default CreateCommenForm