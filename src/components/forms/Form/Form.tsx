import { useFormUI } from '@/scripts/hooks/useFormUI'
import { useSendRequestForm } from '@/scripts/hooks/useSendRequestForm'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { FormInput } from './components/FormInput'
import { FormTextarea } from './components/FormTextarea'
import './Form.css'
import { FORM_PLACEHOLDERS } from './types/Form.types'

const Form: React.FC = () => {
  const {
    getOperatorInfo,
    setCurrentOperator,
    setErrors,
    setFormData,
    handleSubmit,
    formData,
    errors,
    isSubmitting,
    currentOperator,
  } = useSendRequestForm()

  const { handleChange } = useFormUI({
    formData,
    setFormData,
    errors,
    setErrors,
    getOperatorInfo,
    setCurrentOperator,
  })

  return (
    <>
      {/* Toaster конфигурация */}
      <Toaster
        position='top-right'
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#363636',
            fontSize: '14px',
            maxWidth: '500px',
          },
          success: {
            duration: 5000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 6000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className='request-form-box'>
        <div className='request-form-content'>
          <h2 className='request-form-title'>Отримати консультацію</h2>

          <p className='request-form-subtitle'>
            Залиште дані — ми допоможемо з<br />
            вибором обладнання
          </p>

          <form onSubmit={handleSubmit} className='request-form' noValidate>
            <FormInput
              name='name'
              type='text'
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <FormInput
              name='phone'
              type='tel'
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              currentOperator={currentOperator}
              additionalProps={{ placeholder: FORM_PLACEHOLDERS.phone }}
            />

            <FormInput
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              additionalProps={{ placeholder: FORM_PLACEHOLDERS.email }}
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

            <p className='request-form-privacy-policy'>
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
