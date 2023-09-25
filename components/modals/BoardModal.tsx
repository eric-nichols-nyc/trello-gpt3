'use client'
import { useState, useEffect } from 'react'
import { useModalStore } from '@/store/ModalStore'
import { useCardStore } from '@/store/CardStore'
import { MdDelete,  MdOutlineMoveDown, MdOutlineSubtitles, MdCopyAll } from 'react-icons/md';
import { LiaCommentSolid } from 'react-icons/lia';
import { IoMdClose } from 'react-icons/io'
import { LuText } from 'react-icons/lu';
import { useDeleteCard } from '@/hooks/useColumn';
import { useUpdateCard } from '@/hooks/useBoard';
import { useSession } from 'next-auth/react';
import { fetcher } from '@/lib/fetch';
import Comment from '../Comment'
import CreateCommentForm from '../forms/CreateCommentForm';
import { useRouter } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import { toast } from 'react-toastify';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
/**
 * Card detail view in modal
 */
const BoardModal = () => {
  const router = useRouter()
  const { data: session } = useSession()

  // zustand state
  const [closeModal] = useModalStore((state) => [state.closeModal]);
  const [currentCard, setCurrentCard] = useCardStore((state) => [state.currentCard, state.setCurrentCard]);
  // get comments from db
  const { data: comments } = useSWR(`/api/cards/${currentCard._id}/comments`, fetcher)
  // hook to delete card from DB
  const deleteCardFromDB = useDeleteCard('/api/cards');
  // hook to update card in DB
  const updateCardInDB = useUpdateCard('/api/cards');
  // swr
  const { data: cards } = useSWR('/api/cards', fetcher)

  //local state
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [showInput, setShowInput] = useState<boolean>(false)
  const [cardComments, setCardComments] = useState<Comment[]>(comments)

  // rte
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState<any>(null);

  const handleDeleteCard = async () => {
    const deleted = await deleteCardFromDB(currentCard._id)
    toast('Card deleted successfully')
    closeModal()
  }
  // update card name is db
  const handleUpdateCardName = async () => {
    setShowInput(!showInput)
    if (!title || title === currentCard.title) return
    try {
      const updated = await updateCardInDB(currentCard._id, { title })
      mutate('/api/cards')
      toast('Card name updated successfully')
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }
  // update descriptoin in db
  const handleUpdateDescription = async () => {
    if (!convertedContent) {
      console.error('ERROR: Please write a description...')
    }
    try {
      await updateCardInDB(currentCard._id, { convertedContent })
      router.refresh()
      toast('Card description updated successfully')
    } catch (error) {
      console.error(error)
      toast('There was an error')
    }
  }

  useEffect(() => {
    const target = cards?.find((c: Card) => c._id === currentCard._id)
    if (!target) return
    setCurrentCard(target)
  }, [cards, currentCard._id,setCurrentCard]);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  // TODO: aggregate comments by card id in db
  useEffect(() => {
    if(!comments) return
    setCardComments(comments.filter((comment: Comment) => comment.cardId === currentCard._id))
  }, [comments, currentCard._id])

  // set initial state for editor
  useEffect(() => {
    if(!currentCard.description) return
    const html = currentCard.description;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [currentCard.description])


  return (
    <div 
    className="
    modal 
    flex
    items-center 
    justify-center
    w-full
    ">
      <div 
        className="
        flex 
        flex-col 
        p-4 
        relative
         min-h-[600px] 
         bg-gray-700 
         text-slate-100 
         rounded-lg
          w-full
         ">
        <div className="
          absolute
          right-2
          text-neutral-100
        ">
          <button onClick={closeModal}><IoMdClose /></button>
        </div>
        {/* ====== Title ===== */}
        <div className="w-full flex mb-5">
          <MdOutlineSubtitles className="mr-2 mt-1" />
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
              <Editor
                toolbar={{
                  options: ['inline'],
                }}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                editorClassName="bg-gray-800 py-3 px-2 rounded text-xs outline-blue-500 mb-2"
                toolbarClassName="bg-gray-800"
              />
              <button
                className="bg-blue-500 py-1 px-4 rounded-md mt-1 mb-10"
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
                    <Comment creatorName={c.creatorName} comment={c.comment} date={c.createdAt} />
                  </div>)}
                </div>)
            }
          </div>
          <div className="modal__options w-1/3 flex justify-end ml-4">
            <div className="flex flex-col">
              <p className="text-sm mb-2">Actions</p>
              <ul className="w-48 text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
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

export default BoardModal;
