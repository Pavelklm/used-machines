'use client'

import { useEffect, useState } from 'react'
import './style.css'

export const FullWidthLine = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      const screenWidth = window.innerWidth
      setWidth(screenWidth)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return (
    <div className='full-width-line-wrapper'>
      <div className='full-width-line' style={{ width: `${width}px` }}></div>
    </div>
  )
}
