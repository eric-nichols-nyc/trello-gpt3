'use client'
import { Fragment, useEffect, useState } from 'react'
import { useModalStore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/BoardStore';
import { useCardStore } from '@/store/CardStore'
import TaskTypeRadioGroup from './TaskTypeRadioGroup';
import { MdClose, MdDelete, MdShare, MdOutlineMoveDown, MdOutlineSubtitles, MdShortText } from 'react-icons/md';
import { LiaCommentSolid } from 'react-icons/lia';
import { LuText } from 'react-icons/lu';
import ReactDOM from 'react-dom';
import Avatar from 'react-avatar';
import { useDeleteCard } from '@/hooks/useDeleteCard';
import { useUpdateCard } from '@/hooks/useUpdateCard';

const Modal = () => {
  //local state
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string | undefined>(undefined)
  const [showInput, setShowInput] = useState<boolean>(false)
  // zustand state
  const [isOpen, closeModal] = useModalStore((state) => [state.isOpen, state.closeModal]);
  const [currentCard, deleteCard] = useCardStore((state) => [state.currentCard, state.deleteCard]);
  // hook to delete card from DB
  const deleteCardFromDB = useDeleteCard('/api/cards');
  // hook to update card in DB
  const updateCardInDB = useUpdateCard('/api/cards');

  useEffect(() => {
    if (!currentCard) return
    console.log('Current Card from db = ', currentCard)
  }, [currentCard])


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

  return isOpen ? ReactDOM.createPortal(
    // const [newTask, setNewTask] = useBoardStore((state) => [state.newTask, state.setNewTask]);
    <div className="modal h-full w-full fixed flex  top-0 left-0
    items-center justify-center bg-black bg-opacity-30">
      <div className="flex flex-col p-4 relative w-[768px] min-h-[600px] bg-gray-700 text-slate-100 rounded-lg">
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
            <div className="comments flex items-center">
              <LiaCommentSolid className="mr-2" />
              <h4 className="mb-2">Comments</h4>
            </div>
            <div className="comment__list">
              <div className="comment__item flex">
                <Avatar
                  size="40"
                />
                <input
                  className="p-2 w-full"
                  type="text"
                  placeholder='Write a comment...' />
              </div>
            </div>
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
        <MdClose
          className="absolute top-2 right-2 h-6 w-6 text-slate-500 cursor-pointer"
          onClick={closeModal} />
      </div>
    </div>, document.body
  ) : <div />
}

export default Modal;
