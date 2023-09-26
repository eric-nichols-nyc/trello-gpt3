'use client'
import { useState, useEffect } from 'react'
import { useModalStore } from '@/store/ModalStore'
import { useCardStore } from '@/store/CardStore'
import { MdDelete, MdOutlineMoveDown, MdOutlineSubtitles, MdCopyAll } from 'react-icons/md';
import { LiaCommentSolid } from 'react-icons/lia';
import { IoMdClose } from 'react-icons/io'
import { LuText } from 'react-icons/lu';
import { useDeleteCard } from '@/hooks/useColumn';
import { useUpdateCard } from '@/hooks/useCard';
import { useSession } from 'next-auth/react';
import { fetcher } from '@/lib/fetch';
import Comment from '../Comment'
import CreateCommentForm from '../forms/CreateCommentForm';
import { useRouter } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import { toast } from 'react-toastify';

/**
 * Card detail view in modal
 */
const Modal = () => {
  const router = useRouter()
  const { data: session } = useSession()

  // zustand state
  const [closeModal] = useModalStore((state) => [state.closeModal]);
  const [currentCard, setCurrentCard] = useCardStore((state) => [state.currentCard, state.setCurrentCard]);
  // swr cache
  const { data: comments } = useSWR('/api/comments', fetcher)
  const { data: cards } = useSWR('/api/cards', fetcher)

  // hook to delete card from DB
  const deleteCardFromDB = useDeleteCard('/api/cards');
  // hook to update card in DB
  const updateCardInDB = useUpdateCard('/api/cards');

  //local state
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string | undefined>(undefined)
  const [showInput, setShowInput] = useState<boolean>(false)
  const [cardComments, setCardComments] = useState<Comment[]>(comments)

  // delete card name is db
  const handleDeleteCard = async () => {
    await deleteCardFromDB(currentCard._id)
    toast('Card deleted successfully')
    closeModal()
  }
  // update card name is db
  const handleUpdateCardName = async () => {
    setShowInput(!showInput)
    if (!title || title === currentCard.title) return
    const cardscopy = [...cards]
    const target = cardscopy.find((c: Card) => c._id === currentCard._id)
    target.title = title
    mutate('/api/cards', cardscopy, false)
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
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  // TODO: aggregate comments by card id in db
  useEffect(() => {
    if (!comments) return
    setCardComments(comments.filter((comment: Comment) => comment.cardId === currentCard._id))
  }, [comments, currentCard._id])
  // reset current card when a card is upated
  useEffect(() => {
    const target = cards?.find((c: Card) => c._id === currentCard._id)
    if (!target) return
    setCurrentCard(target)
  }, [cards, currentCard._id, setCurrentCard]);

  return (
    <div className="modal_board">
      <div className="modal_board_content">
        <div className="modal_board_closebutton">
          <button onClick={closeModal}><IoMdClose /></button>
        </div>
        {/* ====== Title ===== */}
        <div className="w-full flex items-center mb-5">
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
                className="w-full p-2 mr-2 bg-slate-700 text-slate-100" />
              <button
                className="modal_board_savebutton"
                onClick={handleUpdateDescription}>
                save
              </button>
            </div>
            {/* ========= Comments ======= */}
            <div className="comments flex items-center mb-5">
              <LiaCommentSolid className="mr-2" />
              <h4>Comments</h4>
            </div>
            <div className="comment__list">
              <CreateCommentForm id={currentCard._id} creatorId={session?.user.name!} />
            </div>
            {
              cardComments && (
                <div className="mt-4">
                  {cardComments.map((c: Comment) => <div key={c._id}>
                    <Comment id={c._id} creatorName={c.creatorName} comment={c.comment} date={c.createdAt} />
                  </div>)}
                </div>)
            }
          </div>
          <div className="modal_board_options w-1/3">
            <div className="flex flex-col">
              <p className="text-sm mb-2">Actions</p>
              <ul className="modal_board_options_list">
                <li className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600">
                  <button
                    className='flex items-center disabled:text-slate-500'
                    disabled
                  ><MdOutlineMoveDown className="mr-2" />
                    Move
                  </button>
                </li>
                <li className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600">
                  <button
                    disabled
                    className='flex items-center disabled:text-slate-500'
                  ><span><MdCopyAll className="mr-2" /></span>
                    Copy
                  </button>
                </li>
                <li className="flex w-full px-4 py-2 border border-gray-200 dark:border-gray-600">
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
    </div>
  )
}

export default Modal;
