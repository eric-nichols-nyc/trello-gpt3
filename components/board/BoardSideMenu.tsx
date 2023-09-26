import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { useBoardStore } from '@/store/BoardStore';
import useSWR, { Fetcher, mutate } from 'swr';
import axios from 'axios';

const fetcher: Fetcher<[], string> = (...args: string[]) => fetch(...args as [string, RequestInit]).then((res) => res.json());

interface Props {
  user: User,
}

const SideBar = ({
  user,
}:Props) => {
  // set bg color in store
  const [setBgColor, showMenu, setShowMenu] = useBoardStore((state) => [state.setBGColor, state.showMenu, state.setShowMenu])
  //const { data, error } = useSWR(`/api/auth/users/${user._id}`, fetcher)

  const changeBackground = async(color: string) => {
    await axios.put(`/api/auth/users`, {backgroundColor: color})
    // set bg in state
    setBgColor(color)
    // update user bg in database
    mutate('/api/auth/users')
  }

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
       <div className={`
        board-sidemenu
        ${showMenu ? "translate-x-0 " : "translate-x-full"}
       `}
     >
         <div className="flex items-center justify-center p-3 relative">
           <p>Menu</p>
           <AiOutlineClose
             size={25}
             onClick={() => setShowMenu(false)}
             className="board-sidemenu_close" />
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
                   onClick={() => changeBackground(color)}
                   className={`w-16 h-16 rounded-lg hover:bg-opacity-75 cursor-pointer ${color}`}>
                 </div>
               })
             }
           </div>
         </div>
       </div> 
  )
}

  export default SideBar