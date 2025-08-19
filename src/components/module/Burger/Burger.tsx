import { setBurgerOverlay } from '@/context/slices/overlaySlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
import { ClickAwayListener } from '@mui/material'
import { useRef, useState } from 'react'
import './style.css'

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const burgerRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const toggleMenu = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setIsOpen(!isOpen)

    if (!isOpen) {
      dispatch(setBurgerOverlay(true))
    } else {
      dispatch(setBurgerOverlay(false))
    }
  }

  const handleAnimationEnd = () => {
    setIsAnimating(false)
  }

  const handleClickAway = () => {
    setIsOpen(false)
    dispatch(setBurgerOverlay(false))
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div
        ref={burgerRef}
        className={`burger ${isOpen ? 'open' : 'closed'}`}
        onClick={toggleMenu}
        onAnimationEnd={handleAnimationEnd}
        style={{ cursor: 'pointer' }}
      >
        <div className='burger-main'>
          <div className='burger-inner'>
            <span className='top'></span>
            <span className='mid'></span>
            <span className='bot'></span>
          </div>
        </div>

        <div className='svg-main'>
          <svg viewBox='0 0 68 68'>
            <path
              className='path'
              fill='none'
              stroke='#000'
              strokeMiterlimit='10'
              strokeWidth='4'
              d='M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2'
            />
          </svg>
        </div>

        <div className='path-burger'>
          <div className='animate-path'>
            <div className='path-rotation'></div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  )
}

export default Burger
