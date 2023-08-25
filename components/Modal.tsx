'use client'
import { Fragment, useState } from 'react'
import {useModalStore} from '@/store/ModalStore'
// import { useBoardStore } from '@/store/BoardStore';
import TaskTypeRadioGroup from './TaskTypeRadioGroup';
import { MdClose, MdDelete, MdShare, MdOutlineMoveDown } from 'react-icons/md';
import ReactDOM from 'react-dom';
import Avatar from 'react-avatar';

interface Props {
  deleteCard: () => void;
}

const Modal = ({ deleteCard }:Props) => {
const [isOpen, closeModal] = useModalStore((state) => [state.isOpen, state.closeModal]);

 return isOpen ? ReactDOM.createPortal(
  // const [newTask, setNewTask] = useBoardStore((state) => [state.newTask, state.setNewTask]);
    <div className="modal h-full w-full fixed flex  top-0 left-0
    items-center justify-center bg-black bg-opacity-30">
     <div className="flex flex-col p-4 relative w-[768px] min-h-[600px] bg-gray-700 text-slate-100 rounded-lg">
       <div className="flex mb-5">
         <div>Title</div>
       </div>
       <div className="flex justify-between">
        <div className="modal__content  w-2/3">
         <div className="description mb-5">
             <h4 className="mb-2">Description</h4>
             <div>
              <textarea 
              placeholder='Write a more detailed description...'
              className="w-full p-2"/>
            </div>
         </div>
         <div className="comments">
             <h4 className="mb-2">Comments</h4> 
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
        </div>  
        <div className="modal__options w-1/3 flex justify-end">
           <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
             <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
               <button
                 className='flex items-center disabled:text-slate-500'
                 disabled
                 onClick={deleteCard}><MdOutlineMoveDown className="mr-2"/>
                 Move
               </button>
             </li>
             <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
               <button
               disabled
                 className='flex items-center disabled:text-slate-500'
                 onClick={deleteCard}><span><MdShare className="mr-2" /></span>
                 Share
               </button>
             </li>
             <li className="flex w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              <button
                 className='flex items-center'
                 onClick={deleteCard}><span><MdDelete className="mr-2" /></span>
                 Delete
              </button>
             </li>
           </ul>
        </div>
       </div>

        <MdClose 
        className="absolute top-2 right-2 h-6 w-6 text-slate-500 cursor-pointer" 
         onClick={closeModal}/>
      </div>
    </div>, document.body
  ):<div/>
}

export default Modal;
