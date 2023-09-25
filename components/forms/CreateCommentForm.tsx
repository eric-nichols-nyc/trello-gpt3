"use client";
import React, { useState, useEffect } from 'react'
import { XCircleIcon } from '@heroicons/react/24/solid';
import { mutate } from 'swr';
import Avatar from 'react-avatar';
import { useCardStore } from '@/store/CardStore'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState<any>(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);


  // create new comment in database and mutate
  const createComment = async () => {
    if (!editorState) {
      console.log('Please write a comment...')
    }

    const obj = {
      cardId: currentCard._id,
      comment: convertedContent,
      creatorName: creatorId,
      creatorId: creatorId,
    }
    // 
    try{
        await fetch(`/api/cards/${currentCard._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      // update all comments
      mutate('/api/comments')
      // update comments for the current card in modal
      mutate(`/api/cards/${id}/comments`)
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div className="w-full shrink-0 mb-4 flex gap-2">
      <Avatar name={creatorId} size="30" round={true}/>
      {
        open ? (
          <div className="rounded w-full flex">
            <div className="rounded w-full">
              <Editor
                toolbar={{
                  options: ['inline'],
                }}
                defaultEditorState={editorState}
                onEditorStateChange={setEditorState}
                editorClassName="bg-gray-800 py-3 px-2 rounded text-xs outline-blue-500 mb-2"
                toolbarClassName="bg-gray-800"
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
          className="w-full flex items-center px-2 h-full transition-all duration-200 bg-gray-800 hover:bg-gray-400 py-2 cursor-pointer rounded-md">
            <p className="text-xs text-white">Write a comment</p>
        </div>
      }
    </div>
  )
}

export default CreateCommenForm