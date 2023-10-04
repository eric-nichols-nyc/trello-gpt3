"use client"
import {useState, useEffect} from 'react'
export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: NaN,
    height: NaN,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}