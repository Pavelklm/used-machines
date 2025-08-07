import { IFormData } from '@/components/forms/Form/types/Form.types'
import { useState } from 'react'

interface UseFormStateReturn {
  formData: IFormData
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
  resetForm: () => void
}

export const useFormState = (): UseFormStateReturn => {
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    phone: '',
    email: '',
    comment: '',
  })

  const resetForm = (): void => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      comment: '',
    })
  }

  return {
    formData,
    setFormData,
    resetForm,
  }
}
