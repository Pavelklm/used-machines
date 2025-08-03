import { triggerScrollToForm } from '@/context/slices/scrollSlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'

const MainButton = () => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(triggerScrollToForm())
  }

  return (
    <button 
      className='main__button btn-reset default_button'
      onClick={handleClick}
    >
      Отримати консультацію
    </button>
  )
}

export default MainButton
