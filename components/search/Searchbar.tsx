import { fetcher } from '@/lib/fetch';
import { set } from 'mongoose';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import useSWR from 'swr';
import SearchResultItem from './SearchResultItem';

// Searchbar component to filter cards
const Searchbar = () => {
  // swr state
  const { data } = useSWR('/api/cards', fetcher)
  // local state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Card[]>([]);

  const getResults = useCallback((search:string) => {
    // if input is empty, return
    if (!data || !search.length) {
      setSearchResults([])
      return
    }
    // filter cards by title
    const results = data.filter((card: Card) => card?.title!.toLowerCase().includes(search.toLowerCase()))
    setSearchResults(results)
  },[data])

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    // filter cards by title
  
  }

  useEffect(() => {
    getResults(searchTerm);
  }, [searchTerm, getResults])
  

  return (
    <div className="relative w-full">
      <div className="absolute top-[7px] left-[7px]">
        <BiSearch className="text-gray-400 absolute top-1" />
      </div>
      <input
        placeholder='Search'
        type="text"
        className="
          w-[250px] 
          bg-gray-600 
          py-2 
          px-6 
          rounded 
          text-sm 
          text-slate-200
          border-gray-400 
          outline-blue-500
        "
        value={searchTerm}
        onBlur={() => setSearchTerm('')}
        onChange={(e) => handleOnChange(e)}
      />
      <div className="absolute top-[34px]">
        {
          searchResults.map((card: Card) => (
           <SearchResultItem
             key={card.title}
            card={card}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Searchbar