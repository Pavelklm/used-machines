// RequestForm.tsx - Обновленная версия с использованием новых типов
import React, { ChangeEvent, FormEvent, useState, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import './Form.css'
import Kyivstar from './svg/Kyivstar'
import Lifecell from './svg/Lifecell'
import Ukrtelecom from './svg/Ukrtelecom'
import Vodafone from './svg/Vodafone'
import {
  API_ENDPOINTS,
  ERROR_MESSAGES,
  FORM_PLACEHOLDERS,
  HTTP_STATUS_MESSAGES,
  IApiResponse,
  IFormData,
  IFormErrors,
  IOperatorInfo,
  NETWORK_ERROR_MESSAGES,
  UKRAINE_OPERATORS,
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from './types/Form.types'

// Определение оператора по номеру
const getOperatorInfo = (phone: string): IOperatorInfo | null => {
  const cleanPhone = phone.replace(/\D/g, '').replace(/^38/, '')

  if (cleanPhone.length >= 3) {
    const operatorCode = cleanPhone.slice(0, 3)
    return OPERATORS_WITH_SVG[operatorCode] || null
  }

  return null
}
const OPERATORS_WITH_SVG: Record<string, IOperatorInfo> = {
  ...UKRAINE_OPERATORS,

  // Vodafone
  '050': { ...UKRAINE_OPERATORS['050'], emoji: <Vodafone className={''} /> },
  '066': { ...UKRAINE_OPERATORS['066'], emoji: <Vodafone className={''} /> },
  '095': { ...UKRAINE_OPERATORS['095'], emoji: <Vodafone className={''} /> },
  '099': { ...UKRAINE_OPERATORS['099'], emoji: <Vodafone className={''} /> },

  // Kyivstar
  '067': { ...UKRAINE_OPERATORS['067'], emoji: <Kyivstar className={''} /> },
  '068': { ...UKRAINE_OPERATORS['068'], emoji: <Kyivstar className={''} /> },
  '096': { ...UKRAINE_OPERATORS['096'], emoji: <Kyivstar className={''} /> },
  '097': { ...UKRAINE_OPERATORS['097'], emoji: <Kyivstar className={''} /> },
  '098': { ...UKRAINE_OPERATORS['098'], emoji: <Kyivstar className={''} /> },

  // lifecell
  '063': { ...UKRAINE_OPERATORS['063'], emoji: <Lifecell className={''} /> },
  '073': { ...UKRAINE_OPERATORS['073'], emoji: <Lifecell className={''} /> },
  '093': { ...UKRAINE_OPERATORS['093'], emoji: <Lifecell className={''} /> },

  // Ukrtelekom
  '091': { ...UKRAINE_OPERATORS['091'], emoji: <Ukrtelecom className={''} /> },
}

const isValidOperatorCode = (phone: string): boolean => {
  return getOperatorInfo(phone) !== null
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    phone: '',
    email: '',
    comment: '',
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errors, setErrors] = useState<IFormErrors>({})
  const [currentOperator, setCurrentOperator] = useState<IOperatorInfo | null>(
    null
  )

  // Ref для телефонного поля
  const phoneInputRef = useRef<HTMLInputElement>(null)

  // Принудительно ставим курсор в конец
  const setCursorToEnd = () => {
    if (phoneInputRef.current) {
      const length = phoneInputRef.current.value.length
      phoneInputRef.current.setSelectionRange(length, length)
    }
  }

  // Обработчик клавиш для телефонного поля
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Блокируем стрелки, Home, End
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home' || e.key === 'End') {
      e.preventDefault()
      setCursorToEnd()
    }
  }

  // Обработчик клика по телефонному полю
  const handlePhoneClick = () => {
    setCursorToEnd()
  }

  // Обработчик выделения текста
  const handlePhoneSelect = () => {
    setCursorToEnd()
  }

  const formatPhoneInput = (value: string): string => {
    const cleaned = value.replace(/\D/g, '').replace(/^38/, '')

    let phoneDigits = cleaned
    if (cleaned.startsWith('0') && cleaned.length > 1) {
      phoneDigits = '38' + cleaned
    } else if (!cleaned.startsWith('38') && cleaned.length > 0) {
      phoneDigits = '38' + cleaned
    }

    // Ограничиваем до 12 цифр (380671234567)
    phoneDigits = phoneDigits.slice(0, VALIDATION_LIMITS.phone.max)

    // Форматируем
    if (phoneDigits.length === 0) return ''
    if (phoneDigits.length <= 2) return `+${phoneDigits}`
    if (phoneDigits.length <= 5)
      return `+${phoneDigits.slice(0, 2)} (${phoneDigits.slice(2)}`
    if (phoneDigits.length <= 8)
      return `+${phoneDigits.slice(0, 2)} (${phoneDigits.slice(2, 5)}) ${phoneDigits.slice(5)}`
    if (phoneDigits.length <= 10)
      return `+${phoneDigits.slice(0, 2)} (${phoneDigits.slice(2, 5)}) ${phoneDigits.slice(5, 8)}-${phoneDigits.slice(8)}`
    return `+${phoneDigits.slice(0, 2)} (${phoneDigits.slice(2, 5)}) ${phoneDigits.slice(5, 8)}-${phoneDigits.slice(8, 10)}-${phoneDigits.slice(10)}`
  }

  // Получение чистых цифр из отформатированного телефона
  const getCleanPhone = (formattedPhone: string): string => {
    return formattedPhone.replace(/\D/g, '')
  }

  // Фильтр для email - только латиница, цифры и специальные символы
  const filterEmailInput = (value: string): string => {
    return value.replace(/[^a-zA-Z0-9@._-]/g, '')
  }

  // Фильтр для имени - только буквы и пробелы (украинские и латинские)
  const filterNameInput = (value: string): string => {
    return value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґĞ\s]/g, '')
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target as { name: keyof IFormData; value: string }

    let filteredValue = value

    // Применяем фильтры в зависимости от поля
    switch (name) {
      case 'phone':
        filteredValue = formatPhoneInput(value)
        const operator = getOperatorInfo(filteredValue)
        setCurrentOperator(operator)
        // Курсор в конец после форматирования
        setTimeout(setCursorToEnd, 0)
        break
      case 'email':
        filteredValue = filterEmailInput(value)
        break
      case 'name':
        filteredValue = filterNameInput(value)
        break
      case 'comment':
        if (value.length <= VALIDATION_LIMITS.comment.max) {
          filteredValue = value
        } else {
          filteredValue = formData.comment // Не обновляем если превышен лимит
        }
        break
      default:
        filteredValue = value
    }

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }))

    // Очистка ошибки при изменении поля
    if (errors[name as keyof IFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: IFormErrors = {}
    const errorToasts: string[] = []

    // Валидация имени
    if (!formData.name.trim()) {
      const error = ERROR_MESSAGES.required.name
      newErrors.name = error
      errorToasts.push(`👤 ${error}`)
    } else if (formData.name.trim().length < VALIDATION_LIMITS.name.min) {
      const error = ERROR_MESSAGES.length.nameMin
      newErrors.name = error
      errorToasts.push(`👤 ${error}`)
    } else if (formData.name.trim().length > VALIDATION_LIMITS.name.max) {
      const error = ERROR_MESSAGES.length.nameMax
      newErrors.name = error
      errorToasts.push(`👤 ${error}`)
    } else if (!VALIDATION_PATTERNS.nameChars.test(formData.name)) {
      const error = ERROR_MESSAGES.invalid.name
      newErrors.name = error
      errorToasts.push(`👤 ${error}`)
    }

    // Валидация телефона
    const cleanPhone = getCleanPhone(formData.phone)
    if (!formData.phone.trim()) {
      const error = ERROR_MESSAGES.required.phone
      newErrors.phone = error
      errorToasts.push(`📱 ${error}`)
    } else if (cleanPhone.length < VALIDATION_LIMITS.phone.min) {
      const error = ERROR_MESSAGES.length.phoneMin
      newErrors.phone = error
      errorToasts.push(`📱 ${error} (зараз: ${cleanPhone.length})`)
    } else if (cleanPhone.length > VALIDATION_LIMITS.phone.max) {
      const error = ERROR_MESSAGES.length.phoneMax
      newErrors.phone = error
      errorToasts.push(`📱 ${error}`)
    } else if (!VALIDATION_PATTERNS.phone.test(cleanPhone)) {
      const error = ERROR_MESSAGES.invalid.phoneFormat
      newErrors.phone = error
      errorToasts.push(`📱 ${error} ${ERROR_MESSAGES.format.phoneExample}`)
    } else if (!isValidOperatorCode(formData.phone)) {
      const error = ERROR_MESSAGES.invalid.phoneOperator
      newErrors.phone = error
      errorToasts.push(`📱 ${error} ${ERROR_MESSAGES.format.phoneOperatorList}`)
    }

    // Валидация email
    if (!formData.email.trim()) {
      const error = ERROR_MESSAGES.required.email
      newErrors.email = error
      errorToasts.push(`📧 ${error}`)
    } else if (!formData.email.includes('@')) {
      const error = ERROR_MESSAGES.format.emailAt
      newErrors.email = error
      errorToasts.push(`📧 ${error}`)
    } else if (!VALIDATION_PATTERNS.email.test(formData.email)) {
      const error = ERROR_MESSAGES.format.emailExample
      newErrors.email = error
      errorToasts.push(`📧 ${error}`)
    } else if (formData.email.length > VALIDATION_LIMITS.email.max) {
      const error = ERROR_MESSAGES.length.emailMax
      newErrors.email = error
      errorToasts.push(`📧 ${error}`)
    }

    setErrors(newErrors)

    if (errorToasts.length > 0) {
      // Общий тост с заголовком
      toast.error('Виправте помилки у формі:', {
        duration: 6000,
        position: 'top-right',
        style: {
          background: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #fecaca',
        },
      })

      errorToasts.forEach((errorMessage, index) => {
        setTimeout(
          () => {
            toast.error(errorMessage, {
              duration: 5000,
              position: 'top-right',
              style: {
                background: '#fef2f2',
                color: '#dc2626',
                fontSize: '14px',
              },
            })
          },
          (index + 1) * 500
        ) // Задержка между тостами
      })
    }

    return Object.keys(newErrors).length === 0
  }

  const resetForm = (): void => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      comment: '',
    })
    setErrors({})
    setCurrentOperator(null)
  }

  // Детализированные сообщения об ошибках сервера
  const getServerErrorMessage = (error: unknown, status?: number): string => {
    if (status) {
      return (
        HTTP_STATUS_MESSAGES[status as keyof typeof HTTP_STATUS_MESSAGES] ||
        `Помилка сервера (${status}). Спробуйте пізніше`
      )
    }

    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        return NETWORK_ERROR_MESSAGES.offline
      }
      if (error.message.includes('timeout')) {
        return NETWORK_ERROR_MESSAGES.timeout
      }
      return error.message
    }

    return NETWORK_ERROR_MESSAGES.unknown
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Показываем тост загрузки
    const loadingToast = toast.loading('Відправляємо вашу заявку...', {
      position: 'top-center',
    })

    try {
      const response = await fetch(API_ENDPOINTS.consultation, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      })

      const contentType = response.headers.get('content-type')

      if (!contentType?.includes('application/json')) {
        throw new Error('Сервер повернув некоректну відповідь')
      }

      const data: IApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || getServerErrorMessage(null, response.status)
        )
      }

      if (data.success) {
        toast.dismiss(loadingToast)

        resetForm()

        toast.success('🎉 Дякуємо за заявку!', {
          duration: 6000,
          position: 'top-center',
          style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #bbf7d0',
            fontSize: '16px',
            fontWeight: '600',
          },
        })

        // Дополнительный информационный тост
        setTimeout(() => {
          toast("Невдовзі ми з вами зв'яжемося", {
            duration: 4000,
            position: 'top-center',
            icon: '📞',
            style: {
              background: '#eff6ff',
              color: '#1e40af',
            },
          })
        }, 1000)
      } else {
        throw new Error(data.message || 'Помилка обробки заявки')
      }
    } catch (error) {
      console.error('Form submission error:', error)

      toast.dismiss(loadingToast)

      // Показываем детализированную ошибку
      const errorMessage = getServerErrorMessage(error, undefined)

      toast.error(`❌ Помилка відправки`, {
        duration: 8000,
        position: 'top-center',
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          fontSize: '16px',
          fontWeight: '600',
        },
      })

      setTimeout(() => {
        toast.error(errorMessage, {
          duration: 6000,
          position: 'top-center',
          style: {
            background: '#fee2e2',
            color: '#dc2626',
            fontSize: '14px',
          },
        })
      }, 500)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderInput = (
    name: keyof IFormData,
    type: string,
    additionalProps?: Record<string, any>
  ) => {
    const hasError = !!errors[name]
    const errorId = `${name}-error`
    const isPhoneField = name === 'phone'

    return (
      <div className='request-form-input-wrapper'>
        <div style={{ position: 'relative' }}>
          <input
            ref={isPhoneField ? phoneInputRef : undefined}
            name={name}
            type={type}
            placeholder={FORM_PLACEHOLDERS[name]}
            value={formData[name]}
            onChange={handleChange}
            onKeyDown={isPhoneField ? handlePhoneKeyDown : undefined}
            onClick={isPhoneField ? handlePhoneClick : undefined}
            onSelect={isPhoneField ? handlePhoneSelect : undefined}
            className={`request-form-input ${hasError ? 'request-form-input-error' : ''} ${isPhoneField && currentOperator ? 'request-form-input-with-operator' : ''}`}
            aria-label={FORM_PLACEHOLDERS[name]}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            {...additionalProps}
          />

          {/* Показываем оператора для поля телефона */}
          {isPhoneField && currentOperator && (
            <div
              className='operator-badge'
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 8px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: `1px solid ${currentOperator.color}`,
                fontSize: '12px',
                fontWeight: '600',
                zIndex: 1,
              }}
            >
              <span>{currentOperator.emoji}</span>
            </div>
          )}
        </div>

        {hasError && (
          <p id={errorId} className='request-form-error-message' role='alert'>
            {errors[name]}
          </p>
        )}

        {/* Показываем дополнительную информацию об операторе */}
        {isPhoneField && currentOperator && !hasError && (
          <div
            style={{
              fontSize: '12px',
              color: '#666',
              marginTop: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          ></div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Toaster конфигурация */}
      <Toaster
        position='top-right'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          className: '',
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
            {renderInput('name', 'text')}
            {renderInput('phone', 'tel', {
              placeholder: FORM_PLACEHOLDERS.phone,
            })}
            {renderInput('email', 'email', {
              placeholder: FORM_PLACEHOLDERS.email,
            })}

            <div className='request-form-input-wrapper'>
              <textarea
                name='comment'
                placeholder={FORM_PLACEHOLDERS.comment}
                value={formData.comment}
                onChange={handleChange}
                className='request-form-input request-form-textarea'
                aria-label={FORM_PLACEHOLDERS.comment}
                rows={4}
                maxLength={VALIDATION_LIMITS.comment.max}
              />
              {formData.comment.length > 0 && (
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginTop: '4px',
                    textAlign: 'right',
                  }}
                >
                  {formData.comment.length}/{VALIDATION_LIMITS.comment.max}
                </div>
              )}
            </div>

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
