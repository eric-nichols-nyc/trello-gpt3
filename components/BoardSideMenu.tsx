'use client'
import { use, useEffect } from 'react';
import {AiOutlineClose} from 'react-icons/ai'
import { useBoardStore } from '@/store/BoardStore';
import { mutate } from 'swr';
import axios from 'axios';
import Unsplash from './Unsplash';
import { useWindowResize } from '@/hooks/useWindowResize';

const colors = [
  'bg-gradient-to-r from-fuchsia-600 to-purple-600',
  'bg-gradient-to-r from-blue-200 to-cyan-200',
  'bg-gradient-to-r from-emerald-500 to-emerald-900',
  'bg-gradient-to-r from-blue-800 to-indigo-900',
  'bg-gradient-to-r from-amber-200 to-yellow-500',
  'bg-gradient-to-r from-slate-900 to-slate-700',
  'bg-gradient-to-r from-red-500 to-orange-500',
  'bg-gradient-to-r from-rose-900 to-rose-600',
];

const SideBar = () => {
  // set bg color in store
  const [setBgColor, showMenu, setShowMenu] = useBoardStore((state) => [state.setBGColor, state.showMenu, state.setShowMenu])

  const changeBackground = async(color: string) => {
    await axios.put(`/api/auth/users`, {backgroundColor: color, backgroundImage: null})
    // set bg in state
    setBgColor(color)
    // update user bg in database
    mutate('/api/auth/users')
  }

  const  windowSize = useWindowResize();


  useEffect(() => {
    console.log(windowSize)
  }, [windowSize])

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
           <p className="py-4 rounded w-full">
             Change Background
           </p>
           <div className="flex flex-wrap gap-2">
             {
              colors.map((color) => {
                 return <div
                   key={color}
                   onClick={() => changeBackground(color)}
                   className={`w-[70px] h-16 rounded-lg hover:bg-opacity-75 cursor-pointer ${color}`}>
                 </div>
               })
             }
           </div>
         </div>
          <hr className="mt-3 mb-3"/>
         {/* <Unsplash /> */}
          <div className="h-[40px] w-full fixed left-0  right-0 bottom-0 bg-slate-800">
            <div className="unsplash-disclaimer text-xs px-2">By using images from Unsplash, you agree to their <a href="https://unsplash.com/license" target="_blank">license</a> and <a href="https://unsplash.com/terms" target="_blank">Terms of Service</a></div>
          </div>
       </div> 
  )
}

  export default SideBar