// Searchbar component to filter cards
import { BiSearch } from 'react-icons/bi'
const Searchbar = () => {
  return (
    <div className="relative">
      <div className="absolute top-[7px] left-[7px]">
        <BiSearch className="text-gray-400" />
      </div>
      <input
        disabled
        placeholder='Search'
        type="text"
        className="
          w-full 
          bg-gray-600 
          py-2 
          px-6 
          rounded 
          text-xs 
          text-slate-200
          border-gray-400 
          outline-blue-500"
      />
    </div>
  )
}

export default Searchbar