import {
  API_ENDPOINTS,
  HTTP_STATUS_MESSAGES,
  IApiResponse,
  IFormData,
  IFormErrors,
  NETWORK_ERROR_MESSAGES,
} from '@/components/forms/Form/types/Form.types'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { validateForm } from '../utils/formValidators'

interface UseFormSubmissionProps {
  formData: IFormData
  resetForm: () => void
}

interface UseFormSubmissionReturn {
  isSubmitting: boolean
  errors: IFormErrors
  setErrors: React.Dispatch<React.SetStateAction<IFormErrors>>
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

export const useFormSubmission = ({
  formData,
  resetForm,
}: UseFormSubmissionProps): UseFormSubmissionReturn => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errors, setErrors] = useState<IFormErrors>({})

  const showValidationErrors = (errors: IFormErrors): void => {
    const errorMessages = Object.entries(errors).map(([field, message]) => {
      const icons = { name: '👤', phone: '📱', email: '📧' }
      return `${icons[field as keyof typeof icons] || '⚠️'} ${message}`
    })

    toast.error(errorMessages.join('\n'), {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#fef2f2',
        color: '#dc2626',
        fontSize: '14px',
        whiteSpace: 'pre-line',
      },
    })
  }

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

  const showSuccessMessage = (): void => {
    toast.success("🎉 Дякуємо за заявку! Невдовзі ми з вами зв'яжемося", {
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
  }

  const showErrorMessage = (errorMessage: string): void => {
    toast.error(`❌ Помилка відправки: ${errorMessage}`, {
      duration: 7000,
      position: 'top-center',
      style: {
        background: '#fef2f2',
        color: '#991b1b',
        fontSize: '14px',
      },
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const validation = validateForm(formData)

    if (!validation.isValid) {
      setErrors(validation.errors)
      showValidationErrors(validation.errors)
      return
    }

    setIsSubmitting(true)

    const loadingToast = toast.loading('Відправляємо вашу заявку...', {
      position: 'top-center',
    })

    try {
      const response = await fetch(API_ENDPOINTS.consultation, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
        showSuccessMessage()
      } else {
        throw new Error(data.message || 'Помилка обробки заявки')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.dismiss(loadingToast)

      const errorMessage = getServerErrorMessage(error, undefined)
      showErrorMessage(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    errors,
    setErrors,
    handleSubmit,
  }
}
