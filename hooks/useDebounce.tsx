import {useState, useEffect} from 'react'
// custom hook to debounce a function
export const useDebounce = (value:any, delay=500) => {
  const [debouncedValue, setDebouncedValue] = useState<any>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}
