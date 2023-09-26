"use client";
import React, { FormEvent } from 'react'
import { XCircleIcon } from '@heroicons/react/24/solid';
import { mutate } from 'swr';
import Avatar from 'react-avatar';
import { useCardStore } from '@/store/CardStore'

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

  // create new comment in database and mutate
  const createComment = async () => {
    if (!title) return
    const obj = {
      cardId: currentCard._id,
      comment: title,
      creatorName: creatorId,
      creatorId: creatorId,
    }
    // 
    try{
        await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      setTitle('')
      // update all comments
      mutate('/api/comments')
      // update comments for the current card in modal
    }catch(error){
      console.error(error)
    }
  }
  // handle event
  function handleChangeEvent(event: FormEvent<HTMLTextAreaElement>) {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
  }


  return (
    <div className="w-full shrink-0 mb-4 flex gap-2 items-center">
      <Avatar name={creatorId} size="30" round={true}/>
      {
        open ? (
          <div className="rounded w-full flex">
            <div className="rounded w-full">
              <textarea
                autoFocus
                placeholder="Write a comment"
                className="create_comment_form_textarea"
                name="title"
                onChange={(event) => handleChangeEvent(event)}
                value={title}
              />
              <div className="flex items-center">
                <button
                  onClick={createComment}
                  className="create_card_form_commentbutton"
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
        ) : 
        <div
          onClick={() => setOpen(true)}
          className="w-full">
            <p className="text-xs text-white bg-slate-800 p-2 rounded-md w-full">Write a comment</p>
        </div>
      }
    </div>
  )
}

export default CreateCommenForm