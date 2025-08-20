import { setBurgerOverlay } from '@/context/slices/overlaySlice'
import { RootState } from '@/context/store'
import { useAppDispatch, useAppSelector } from '@/scripts/hooks/hooks'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './style.css'

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const burgerRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const burgerOverlay = useAppSelector(
    (state) => state.overlay.source === 'burger'
  )

  const screenData = useSelector((state: RootState) => state.screenSize)
  const { isLaptop } = screenData

  useEffect(() => {
    setIsOpen(burgerOverlay)

    if (!isLaptop) {
      dispatch(setBurgerOverlay(false))
    }
  }, [burgerOverlay, isLaptop, dispatch])

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    if (isAnimating) {
      return
    }

    setIsAnimating(true)

    const newState = !isOpen
    setIsOpen(newState)
    dispatch(setBurgerOverlay(newState))
  }

  const handleAnimationEnd = () => {
    setIsAnimating(false)
  }

  return (
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
            stroke='var(--main-color)'
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
  )
}

export default Burger
