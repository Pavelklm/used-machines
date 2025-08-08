import { useConsultationForm } from '@/scripts/hooks/useConsultationForm'
import React, { useMemo } from 'react'
import { FormInput } from './components/FormInput'
import { FormTextarea } from './components/FormTextarea'
import './Form.css'
import { FORM_PLACEHOLDERS } from './types/Form.types'

const Form: React.FC = () => {
  const {
    formData,
    errors,
    isSubmitting,
    currentOperator,
    handleChange,
    handleSubmit,
  } = useConsultationForm()

  const memoizedHandleSubmit = useMemo(() => handleSubmit, [handleSubmit])

  return (
    <>
      <div className='request-form-box'>
        <div className='request-form-content'>
          <h2 className='request-form-title'>Отримати консультацію</h2>

          <p className='request-form-subtitle'>
            Залиште дані — ми допоможемо з<br />
            вибором обладнання
          </p>

          <form
            onSubmit={memoizedHandleSubmit}
            className='request-form'
            noValidate
            aria-label='Форма для получения консультации'
          >
            <FormInput
              name='name'
              type='text'
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />

            <FormInput
              name='phone'
              type='tel'
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              currentOperator={currentOperator}
              additionalProps={{
                placeholder: FORM_PLACEHOLDERS.phone,
                'aria-describedby': errors.phone ? 'phone-error' : undefined,
              }}
            />

            <FormInput
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              additionalProps={{
                placeholder: FORM_PLACEHOLDERS.email,
                'aria-describedby': errors.email ? 'email-error' : undefined,
              }}
            />

            <FormTextarea
              name='comment'
              value={formData.comment}
              onChange={handleChange}
            />

            <button
              type='submit'
              disabled={isSubmitting}
              className='request-form-button default_button btn-reset'
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Відправка...' : 'Отримати консультацію'}
            </button>

            <p
              id='privacy-policy-text'
              className='request-form-privacy-policy'
              role='note'
            >
              Натискаючи на кнопку, ви даєте згоду <br /> на обробку
              персональних даних
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Form
