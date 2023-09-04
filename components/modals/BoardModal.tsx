/**
 * Card detail view
 */
'use client'
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react'
import { useModalStore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/BoardStore';
import { useCardStore } from '@/store/CardStore'
import { MdDelete, MdShare, MdOutlineMoveDown, MdOutlineSubtitles, MdShortText } from 'react-icons/md';
import { LiaCommentSolid } from 'react-icons/lia';
import { LuText } from 'react-icons/lu';
import { useDeleteCard } from '@/hooks/useColumn';
import { useUpdateCard } from '@/hooks/useBoard';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetch';
import Comment from '../Comment'
import CreateCommentForm from '../CreateCommentForm';
import { useDetectClickOutside } from 'react-detect-click-outside';

const Modal = () => {
  const { data: session } = useSession()

  //local state
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string | undefined>(undefined)
  const [showInput, setShowInput] = useState<boolean>(false)
  // zustand state
  const [closeModal] = useModalStore((state) => [state.closeModal]);
  const [currentCard, deleteCard] = useCardStore((state) => [state.currentCard, state.deleteCard]);
  // get comments from db
  const { data: comments } = useSWR(`/api/cards/${currentCard._id}/comments`, fetcher)
  // hook to delete card from DB
  const deleteCardFromDB = useDeleteCard('/api/cards');
  // hook to update card in DB
  const updateCardInDB = useUpdateCard('/api/cards');
  const ref = useDetectClickOutside({ onTriggered: closeModal });

  const handleDeleteCard = async () => {
    const deleted = await deleteCardFromDB(currentCard._id)
    console.log('deleted', deleted)
    closeModal()
  }
  // update card name is db
  const handleUpdateCardName = async () => {
    setShowInput(!showInput)
    if (!title || title === currentCard.title) return
    try {
      const updated = await updateCardInDB(currentCard._id, { title })
      console.log('name was updated = ', updated)
    } catch (error) {
      console.error(error)
    }
  }
  // update descriptoin in db
  const handleUpdateDescription = async () => {
    if (!description) return
    try {
      const updated = await updateCardInDB(currentCard._id, { description })
      console.log('desc updated = ', updated)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div 
    className="modal flex
    items-center justify-center bg-black bg-opacity-30">
      <div 
        ref={ref}
        className="flex flex-col p-4 relative w-[768px] min-h-[600px] bg-gray-700 text-slate-100 rounded-lg">
        {/* ====== Title ===== */}
        <div className="flex items-center mb-5">
          <MdOutlineSubtitles className="mr-2" />
          <div className='flex flex-col w-2/3'>
            {
              !showInput ? (
                <div
                  onClick={() => setShowInput(!showInput)}
                  className="text-xl font-semibold">{currentCard.title}</div>
              ) :
                <input
                  type="text"
                  className="w-full p-2 text-gray-600"
                  defaultValue={currentCard.title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleUpdateCardName}
                />
            }
          </div>
        </div>
        <div className="flex justify-between">
          <div className="modal__content  w-2/3">
            {/* ====== Description ===== */}
            <div className="flex items-center description mb-5">
              <LuText className="mr-2" />
              <h4>Description</h4>
            </div>
            <div>
              <textarea
                defaultValue={currentCard?.description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Write a more detailed description...'
                className="w-full p-2 text-gray-600" />
              <button
                className="bg-blue-500 py-1 px-4 rounded-md mt-1 mb-10"
                onClick={handleUpdateDescription}>
                save
              </button>
            </div>
            {/* ========= Comments ======= */}
            <div className="comments flex items-center">
              <LiaCommentSolid className="mr-2" />
              <h4 className="mb-2">Comments</h4>
            </div>

            <div className="comment__list">
              <CreateCommentForm id={currentCard._id} creatorId={session?.user._id!} />
            </div>
            {
              comments && (
                <div className="mt-4">
                  {comments.map((c: IComment) => <div key={c._id}>
                    <Comment creatorName={c.creatorName} comment={c.comment} date={c.createdAt} />
                  </div>)}
                </div>)
            }
          </div>
          <div className="modal__options w-1/3 flex justify-end">
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <button
                  className='flex items-center disabled:text-slate-500'
                  disabled
                ><MdOutlineMoveDown className="mr-2" />
                  Move
                </button>
              </li>
              <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                <button
                  disabled
                  className='flex items-center disabled:text-slate-500'
                ><span><MdShare className="mr-2" /></span>
                  Share
                </button>
              </li>
              <li className="flex w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                <button
                  className='flex items-center'
                  onClick={handleDeleteCard}><span><MdDelete className="mr-2" /></span>
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;
