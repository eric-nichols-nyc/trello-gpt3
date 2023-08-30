import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { useBoardStore } from '@/store/BoardStore';

const ColumnMenu = () => {
  // set bg color in store
  const [setBgColor, showMenu, setShowMenu] = useBoardStore((state) => [state.setBGColor, state.showMenu, state.setShowMenu])

  // local state

  const colors =[
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-indigo-500',
    'bg-blue-600',
  ]

   return (
     showMenu ? (
       <div className="absolute right-0 top-0 bottom-0 bg-slate-700 text-slate-100 shadow-sm text-sm rounded w-[300px] px-2">
         <div className="flex items-center justify-center p-3 relative">
           <p>Menu</p>
           <AiOutlineClose
             size={25}
             onClick={() => setShowMenu(false)}
             className="absolute right-3 p-1 hover:bg-slate-600 cursor-pointer" />
         </div>
         <hr />
         <div className=" w-full">
           <p className="py-4 rounded cursor-pointer hover:bg-slate-500 w-full">
             Change Background
           </p>
           <div className="flex flex-wrap gap-2">
             {
               colors.map((color) => {
                 return <div
                   key={color}
                   onClick={() => setBgColor(color)}
                   className={`w-16 h-16 rounded-lg hover:bg-opacity-75 cursor-pointer ${color}`}>
                 </div>
               })
             }
           </div>
         </div>
       </div> 
    )  : null
   
  )
}

export default ColumnMenu