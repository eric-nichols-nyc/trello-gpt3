'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore'
import { fetchSuggestion } from '@/lib/fetchSuggestion'
function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString
  ])
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestions] = useState<string>("");

  useEffect(() => {
    // get board data from server
    if(board.columns.size === 0) return
    setLoading(true)
    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      console.log('suggestion>>>>>>', suggestion)
      setSuggestions(suggestion);
      setLoading(false);
    }

    fetchSuggestionFunc();
    return () => {
      // second
    }
  },[board]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounder-b-2xl">
        <Image
          src="http://links.papareact.com/c2cdd5"
          alt="Trello AI Clone"
          width={300}
          height={100}
          className="w-14 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input 
            type="text" 
            placeholder="Search" 
            className="flex-1" 
            onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit" hidden>Search</button>
          </form>
          <Avatar className="cursor-pointer ml-2" name="John Doe" size="50" round={true} />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 md:py-5">
        <p className="flex items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit p-5">
          <UserCircleIcon className={`h-6 w-6 text-gray-400 mr-1
          ${loading && "animate-spin"}`} />
          {suggestion && !loading ? suggestion : "GPT is summarizing your tasks for the day"}
        </p>
      </div>
    </header>
  )
}

export default Header