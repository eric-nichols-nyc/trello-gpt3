import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { useDetectClickOutside } from 'react-detect-click-outside';

interface Props {
  id:string;
  show: boolean;
  closeMenu: any;
  deleteColumn: (id:string) => void;
} 

const ColumnMenu = ({
  id,
  show,
  closeMenu,
  deleteColumn
}:Props) => {

  const close = () => {
    closeMenu(false)
  }


  const hideInput = () => {
    close()
  }

  const ref = useDetectClickOutside({ onTriggered: hideInput });
   return (
     show ? 
       <div className="absolute right-0 top-10 bg-slate-700 shadow-sm text-sm rounded w-[300px]" ref={ref}>
         <div className="flex items-center justify-center p-3 relative">
          <p>List actions</p>
           <AiOutlineClose 
           size={25}
             onClick={() => close()}
             className="absolute right-3 p-1 hover:bg-slate-600 cursor-pointer"/> 
         </div>
        <ul className="text-slate-100 w-full">
           <li className="p-2 rounded cursor-pointer hover:bg-slate-500 w-full">
            Add card...
          </li>
           <li className="p-2 rounded cursor-pointer hover:bg-slate-500 w-full">
            Copy list...
          </li>
           <li 
           onClick={() => deleteColumn(id)}
           className="p-2 rounded cursor-pointer hover:bg-slate-500 w-full">
            Archive this list
          </li>
        </ul>
     </div> : null
  )
}

export default ColumnMenu