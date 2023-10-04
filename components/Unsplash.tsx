"use client";
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react'
import { mutate } from 'swr';
import { createApi } from 'unsplash-js'
import { useBoardStore } from '@/store/BoardStore'
import { useDebounce } from '@/hooks/useDebounce'
import { BiSearch } from 'react-icons/bi';

const Unsplash = () => {
  const showMenu = useBoardStore((state) => state.showMenu)
  // local state
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState<any[]>([]);
  // debounce search
  const debouncedSearchImages = useDebounce(images, 500);

  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string
  });
  // set bg image in store
  const handleImageClick = async (url: string) => {
    await axios.put(`/api/auth/users`, { backgroundColor: null, backgroundImage: url })
    // set bg in state
    // update user bg in database
    mutate('/api/auth/users')
  }

  const findImages = useCallback(async (value = 'nature') => {
    const images = await unsplash.search.getPhotos({
      query: value,
      page: currentPage,
      perPage: 10,
      orientation: 'landscape'
    });
    if (!images.response?.results) return
    setImages(images.response?.results)
  }, [currentPage]);

  useEffect(() => {
    if (showMenu) {
      findImages();
    }
  }, [showMenu, findImages])

  return (
    <div className="unsplash">
      <div className="absolute top-[7px] left-[7px]">
        <BiSearch className="text-gray-400 absolute top-1" />
      </div>
      <input type="text"
        className="search_input mb-4 w-full"
        placeholder="Search for images"
        onChange={(e) => findImages(e.target.value)} />
      {
        !debouncedSearchImages.length && <p className="text-sm text-gray-400">No images found</p>
      }
      <div className="unsplash_images">

        {
          debouncedSearchImages.map((image: any) => {
            return <Image
              key={image.id}
              onClick={() => handleImageClick(image.urls.regular)}
              className="cursor-pointer rounded-lg"
              src={image.urls.thumb}
              alt={image.alt_description}
              height={90}
              width={148}
            />
          })
        }
      </div>
    </div>
  )
}

export default Unsplash

