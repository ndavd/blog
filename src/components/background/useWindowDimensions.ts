import { useEffect, useState } from 'react'

const SCROLLBAR_WIDTH = 8

export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - SCROLLBAR_WIDTH,
    height: window.innerHeight,
  })
  useEffect(() => {
    const main = () => {
      setDimensions({
        width: window.innerWidth - SCROLLBAR_WIDTH,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', main)
    return () => {
      window.removeEventListener('resize', main)
    }
  }, [dimensions])
  return dimensions
}
