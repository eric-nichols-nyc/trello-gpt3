import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { useDetectClickOutside } from 'react-detect-click-outside';

interface Props {
  id:string;
  show: boolean;
  closeMenu: any;
  deleteColumn: (id:string) => void;
} 
// right column menu
const ColumnOptions = ({
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
       <div className="column_options" ref={ref}>
         <div className="column_options_actions">
          <p>List actions</p>
           <AiOutlineClose 
           size={25}
             onClick={() => close()}
             className="column_options_actions_close"/> 
         </div>
        <ul className="text-slate-100 w-full">
           {/* <li className="column_options_actions_li">
            Add card...
          </li>
           <li className="column_options_actions_li">
            Copy list...
          </li> */}
           <li 
           onClick={() => deleteColumn(id)}
           className="column_options_actions_li">
            Archive this list
          </li>
        </ul>
     </div> : null
  )
}

export default ColumnOptions