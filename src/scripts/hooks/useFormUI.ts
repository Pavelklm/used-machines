import {
  IFormData,
  IFormErrors,
  VALIDATION_LIMITS,
} from '@/components/forms/Form/types/Form.types'
import { IOperatorInfo } from '@/constants/phoneOperators'
import {
  filterEmailInput,
  filterNameInput,
  formatPhoneInput,
} from '@/scripts/utils/phoneUtils'
import { ChangeEvent } from 'react'

interface UseFormUIProps {
  formData: IFormData
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
  errors: IFormErrors
  setErrors: React.Dispatch<React.SetStateAction<IFormErrors>>
  getOperatorInfo: (phone: string) => IOperatorInfo | null
  setCurrentOperator: (operator: IOperatorInfo | null) => void
}

export const useFormUI = ({
  setFormData,
  errors,
  setErrors,
  getOperatorInfo,
  setCurrentOperator,
}: UseFormUIProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target as {
      name: keyof IFormData
      value: string
    }

    let filteredValue = value

    // Применяем фильтры в зависимости от поля
    switch (name) {
      case 'phone':
        filteredValue = formatPhoneInput(value)
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
        if (value.length <= VALIDATION_LIMITS.comment.max) {
          filteredValue = value
        } else {
          // Не обновляем если превышен лимит
          return
        }
        break
      default:
        filteredValue = value
    }

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }))

    if (errors[name as keyof IFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  return {
    handleChange,
  }
}
