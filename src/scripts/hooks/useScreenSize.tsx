import { updateScreenSize } from '@/context/slices/screenSizeSlice'
import { RootState } from '@/context/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * Хук для получения размера экрана из Redux
 */
export const useScreenSize = () => {
  const dispatch = useDispatch()
  const screenSize = useSelector((state: RootState) => state.screenSize)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        dispatch(updateScreenSize(window.innerWidth))
      }, 150)
    }

    dispatch(updateScreenSize(window.innerWidth))

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [dispatch])

  return screenSize
}
