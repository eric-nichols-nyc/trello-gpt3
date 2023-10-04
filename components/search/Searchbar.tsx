'use client'
import { fetcher } from '@/lib/fetch';
import { useCallback, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import useSWR from 'swr';
import SearchResultItem from './SearchResultItem';
import { useDetectClickOutside } from 'react-detect-click-outside';

// Searchbar component to filter cards
const Searchbar = () => {
  // swr state
  const { data } = useSWR('/api/cards', fetcher)
  // local state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Card[]>([]);
  const ref = useDetectClickOutside({ onTriggered: () => setSearchTerm('') });

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

  useEffect(() => {
    getResults(searchTerm);
  }, [searchTerm, getResults])
  

  return (
    <div className="relative w-full">
      <div className="absolute top-[7px] left-[7px]">
        <BiSearch className="text-gray-400 absolute top-1" />
      </div>
      <input
        ref={ref}
        placeholder='Search'
        type="text"
        className="search_input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute top-[37px]">
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