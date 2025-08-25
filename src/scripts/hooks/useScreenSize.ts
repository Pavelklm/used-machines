import { updateScreenSize } from '@/context/slices/screenSizeSlice'
import { RootState } from '@/context/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useScreenSize = () => {
  const dispatch = useDispatch()
  const screenSize = useSelector((state: RootState) => state.screenSize)

  useEffect(() => {
    const handleResize = () => {
      dispatch(updateScreenSize(window.innerWidth))
    }

    dispatch(updateScreenSize(window.innerWidth))

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch])

  return screenSize
}
