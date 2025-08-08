import { ERROR_TYPES } from '@/api/config/apiConfig'
import {
  ApiError,
  consultationService,
} from '@/api/services/consultationService'
import { IOperatorInfo } from '@/constants/phoneOperators'
import { VALIDATION_LIMITS } from '@/constants/validation/formConstants'
import {
  filterEmailInput,
  filterNameInput,
} from '@/scripts/utils/formatters/inputFilters'
import {
  formatPhoneInput,
  getOperatorInfo,
} from '@/scripts/utils/formatters/phoneFormatter'
import { notificationService } from '@/services/notificationService'
import {
  IFormData,
  IFormErrors,
  IValidationResult,
  UseConsultationFormProps,
  UseConsultationFormReturn,
} from '@/types/forms/consultationForm.types'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { validateForm } from '../utils/validators/formValidators'

// Начальное состояние формы
const INITIAL_FORM_DATA: IFormData = {
  name: '',
  phone: '',
  email: '',
  comment: '',
}

export const useConsultationForm = (
  props?: UseConsultationFormProps
): UseConsultationFormReturn => {
  const {
    onSubmitSuccess,
    onSubmitError,
    resetOnSuccess = true,
    validateOnBlur = false,
    validateOnChange = false,
    initialData = {},
  } = props || {}

  // Основное состояние
  const [formData, setFormData] = useState<IFormData>({
    ...INITIAL_FORM_DATA,
    ...initialData,
  })
  const [errors, setErrors] = useState<IFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentOperator, setCurrentOperator] = useState<IOperatorInfo | null>(
    null
  )
  const [isDirty, setIsDirty] = useState(false)
  const [touchedFields, setTouchedFields] = useState<Set<keyof IFormData>>(
    new Set()
  )

  // Эффект для определения оператора при инициализации
  useEffect(() => {
    if (formData.phone) {
      const operator = getOperatorInfo(formData.phone)
      setCurrentOperator(operator)
    }
  }, [])

  // Вычисляемые свойства
  const isValid = Object.keys(errors).length === 0 && isDirty

  // Сброс формы
  const resetForm = useCallback(() => {
    setFormData({ ...INITIAL_FORM_DATA, ...initialData })
    setErrors({})
    setCurrentOperator(null)
    setIsDirty(false)
    setTouchedFields(new Set())
  }, [initialData])

  // Очистка конкретной ошибки
  const clearError = useCallback((fieldName: keyof IFormData) => {
    setErrors((prev) => {
      if (prev[fieldName]) {
        const { [fieldName]: _, ...rest } = prev
        return rest
      }
      return prev
    })
  }, [])

  // Валидация отдельного поля
  const validateField = useCallback(
    (fieldName: keyof IFormData, value?: string): string | null => {
      const valueToValidate = value ?? formData[fieldName]
      const tempData = { ...formData, [fieldName]: valueToValidate }
      const validation = validateForm(tempData)
      return validation.errors[fieldName] || null
    },
    [formData]
  )

  // Валидация всей формы
  const validateFormData = useCallback((): IValidationResult => {
    return validateForm(formData)
  }, [formData])

  // Установка значения поля
  const setFieldValue = useCallback(
    (fieldName: keyof IFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }))
      setIsDirty(true)
    },
    []
  )

  // Получение ошибки поля
  const getFieldError = useCallback(
    (fieldName: keyof IFormData): string | undefined => {
      return errors[fieldName]
    },
    [errors]
  )

  // Проверка наличия ошибки
  const hasError = useCallback(
    (fieldName: keyof IFormData): boolean => {
      return !!errors[fieldName]
    },
    [errors]
  )

  // Обработчик изменений в полях
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target as {
        name: keyof IFormData
        value: string
      }

      let filteredValue = value

      // Применяем фильтры в зависимости от поля
      switch (name) {
        case 'phone':
          filteredValue = formatPhoneInput(value)
          // Определяем оператора
          const operator = getOperatorInfo(filteredValue)
          setCurrentOperator(operator)
          break

        case 'email':
          filteredValue = filterEmailInput(value)
          break

        case 'name':
          filteredValue = filterNameInput(value)
          break

        case 'comment':
          // Ограничиваем длину комментария
          if (value.length > VALIDATION_LIMITS.comment.max) {
            return // Не обновляем состояние если превышен лимит
          }
          filteredValue = value
          break

        default:
          filteredValue = value
      }

      // Обновляем данные формы
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue,
      }))

      setIsDirty(true)

      // Валидация при изменении, если включена
      if (validateOnChange) {
        const error = validateField(name, filteredValue)
        if (error) {
          setErrors((prev) => ({ ...prev, [name]: error }))
        } else {
          clearError(name)
        }
      } else if (errors[name]) {
        // Если есть ошибка, очищаем её при изменении
        clearError(name)
      }
    },
    [errors, clearError, validateField, validateOnChange]
  )

  // Обработчик потери фокуса
  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target as { name: keyof IFormData }

      // Добавляем поле в touched
      setTouchedFields((prev) => new Set(prev).add(name))

      // Валидация при потере фокуса, если включена
      if (validateOnBlur) {
        const error = validateField(name)
        if (error) {
          setErrors((prev) => ({ ...prev, [name]: error }))
        } else {
          clearError(name)
        }
      }
    },
    [clearError, validateField, validateOnBlur]
  )

  // Основной обработчик отправки формы
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // Валидация
      const validation = validateForm(formData)
      if (!validation.isValid) {
        setErrors(validation.errors)
        notificationService.showValidationErrors(validation.errors)

        // Фокус на первое поле с ошибкой
        const firstErrorField = Object.keys(validation.errors)[0]
        if (firstErrorField) {
          const element = document.getElementById(`input-${firstErrorField}`)
          element?.focus()
        }
        return
      }

      setIsSubmitting(true)

      // Показываем индикатор загрузки
      const loadingToastId = notificationService.loading(
        'Відправляємо вашу заявку...'
      )

      try {
        // Отправляем данные
        const response = await consultationService.submit(formData)

        // Успешная отправка
        notificationService.update(
          loadingToastId,
          'success',
          'Заявку успішно відправлено!'
        )

        // Сбрасываем форму если нужно
        if (resetOnSuccess) {
          resetForm()
        }

        // Вызываем callback успеха
        onSubmitSuccess?.()

        // Аналитика (если нужна)
        if (typeof window !== 'undefined' && 'gtag' in window) {
          ;(window as any).gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'consultation_form',
          })
        }
      } catch (error) {
        console.error('Form submission error:', error)

        let errorMessage = 'Невідома помилка'

        if (error instanceof ApiError) {
          // Определяем тип ошибки и показываем соответствующее сообщение
          switch (error.type) {
            case ERROR_TYPES.NETWORK:
              errorMessage = "Немає з'єднання з інтернетом"
              notificationService.update(
                loadingToastId,
                'error',
                errorMessage,
                {
                  icon: '🌐',
                }
              )
              break
            case ERROR_TYPES.TIMEOUT:
              errorMessage = "Повільне з'єднання. Спробуйте ще раз"
              notificationService.update(
                loadingToastId,
                'error',
                errorMessage,
                {
                  icon: '⏱️',
                }
              )
              break
            case ERROR_TYPES.VALIDATION:
              // Если есть ошибки валидации с сервера
              if (error.errors && error.errors.length > 0) {
                const serverErrors: IFormErrors = {}
                error.errors.forEach((err) => {
                  if (err.field) {
                    serverErrors[err.field as keyof IFormData] = err.message
                  }
                })
                setErrors(serverErrors)
                notificationService.showValidationErrors(serverErrors)
              } else {
                errorMessage = error.message || 'Дані не пройшли перевірку'
                notificationService.update(
                  loadingToastId,
                  'error',
                  errorMessage
                )
              }
              break
            case ERROR_TYPES.SERVER:
              errorMessage = error.message || 'Проблеми на сервері'
              notificationService.update(
                loadingToastId,
                'error',
                errorMessage,
                {
                  icon: '🔧',
                }
              )
              break
            default:
              errorMessage = error.message || 'Невідома помилка'
              notificationService.update(loadingToastId, 'error', errorMessage)
          }
        } else if (error instanceof Error) {
          errorMessage = error.message
          notificationService.update(loadingToastId, 'error', errorMessage)
        } else {
          notificationService.update(loadingToastId, 'error', errorMessage)
        }

        // Вызываем callback ошибки
        onSubmitError?.(error as Error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, resetForm, onSubmitSuccess, onSubmitError, resetOnSuccess]
  )

  // Возвращаем все необходимые методы и состояние
  return {
    // Состояние
    formData,
    errors,
    isSubmitting,
    isValid,
    isDirty,
    currentOperator,

    // Основные методы
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    setFormData,
    setErrors,

    // Вспомогательные методы
    clearError,
    validateField,
    validateForm: validateFormData,
    setFieldValue,
    getFieldError,
    hasError,
  }
}
