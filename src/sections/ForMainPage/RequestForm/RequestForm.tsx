import Form from '@/components/forms/Form/Form'
import { LineBackground } from '@/components/module/LineBackground/LineBackground'
import { resetScrollToForm } from '@/context/slices/scrollSlice'
import { useAppDispatch, useAppSelector } from '@/scripts/hooks/hooks'
import { useEffect, useRef } from 'react'
import './style.css'

export const RequestForm = () => {
  const formRef = useRef<HTMLDivElement>(null)
  const scrollToForm = useAppSelector(
    (state) => state.scroll.scrollToForm
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (scrollToForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      setTimeout(() => {
        dispatch(resetScrollToForm())
      }, 100) // Небольшая задержка для плавности
    }
  }, [scrollToForm, dispatch])

  return (
    <div ref={formRef} className='main-form'>
      <LineBackground className={'full-width-line-form'} />
      <div className='request-form-container container'>
        <div className='request-form-wrapper'>
          <div className='request-form-image-section'>
            <img
              src='/icons/cutter.png'
              alt='Обладнання для різання'
              className='request-form-image'
              loading='lazy'
              draggable='false'
            />
          </div>
          <div className='form__content_right'>
            <Form />
          </div>
        </div>
      </div>
    </div>
  )
}
