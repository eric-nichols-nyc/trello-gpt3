"use client";
import axios from 'axios';
import { set } from 'mongoose';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react'
import { mutate } from 'swr';
import { createApi } from 'unsplash-js'
import {useBoardStore} from '@/store/BoardStore'
const Unsplash = () => {
  const [setBgColor, setBgImage]= useBoardStore((state) => [state.setBGColor, state.setBgImage])
  // local state
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState<any[]>([]);

  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string
  });
  // set bg image in store
  const handleImageClick = async(url:string) => {
    await axios.put(`/api/auth/users`, { backgroundColor: null, backgroundImage: url })
    // set bg in state
    setBgImage(url)
    // update user bg in database
    mutate('/api/auth/users')
  }

  const findImages = useCallback(async(value = 'nature') => {
    const images = await unsplash.search.getPhotos({
      query: value,
      page: currentPage,
      perPage: 10,
      orientation: 'landscape'
    });
    console.log(images.response?.results)
    if(!images.response?.results) return
    setImages(images.response?.results) 
  }, [currentPage]);

  useEffect(() => {
    findImages();
  }, [findImages])
  

  return (
    <div className="flex flex-wrap gap-2">
      {
        images.map((image) => {
          return <Image 
            key={image.id} 
            onClick={() => handleImageClick(image.urls.regular)}
            className="cursor-pointer rounded-lg"
            src={image.urls.thumb} 
            alt={image.alt_description} 
            height={90}
            width={150}
        />
        })
      }
    </div>
  )
}

export default Unsplash

