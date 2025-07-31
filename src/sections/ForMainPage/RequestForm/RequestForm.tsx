import Form from '@/components/forms/Form/Form'
import { LineBackground } from '@/components/module/LineBackground/LineBackground'
import './style.css'

export const RequestForm = () => {
  return (
    <div className='main-form'>
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
