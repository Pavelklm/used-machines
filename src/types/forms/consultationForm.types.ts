import { ChangeEvent, FormEvent } from 'react'
import { IOperatorInfo } from '@/constants/phoneOperators'

// Основные данные формы
export interface IFormData {
  name: string
  phone: string
  email: string
  comment: string
}

// Ошибки валидации формы
export interface IFormErrors {
  name?: string
  phone?: string
  email?: string
  comment?: string
}

// Результат валидации
export interface IValidationResult {
  isValid: boolean
  errors: IFormErrors
}

// Параметры хука useConsultationForm
export interface UseConsultationFormProps {
  onSubmitSuccess?: () => void
  onSubmitError?: (error: Error) => void
  resetOnSuccess?: boolean
  validateOnBlur?: boolean
  validateOnChange?: boolean
  initialData?: Partial<IFormData>
}

// Возвращаемое значение хука useConsultationForm
export interface UseConsultationFormReturn {
  // Состояние формы
  formData: IFormData
  errors: IFormErrors
  isSubmitting: boolean
  isValid: boolean
  isDirty: boolean
  currentOperator: IOperatorInfo | null

  // Методы формы
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  resetForm: () => void
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
  setErrors: React.Dispatch<React.SetStateAction<IFormErrors>>
  
  // Вспомогательные методы
  clearError: (fieldName: keyof IFormData) => void
  validateField: (fieldName: keyof IFormData, value?: string) => string | null
  validateForm: () => IValidationResult
  setFieldValue: (fieldName: keyof IFormData, value: string) => void
  getFieldError: (fieldName: keyof IFormData) => string | undefined
  hasError: (fieldName: keyof IFormData) => boolean
}

// Статус отправки формы
export type FormSubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

// Расширенное состояние формы
export interface IFormState extends IFormData {
  status: FormSubmitStatus
  lastSubmittedAt?: Date
  submitCount: number
}

// Типы полей формы
export type FormFieldName = keyof IFormData

// Конфигурация поля формы
export interface IFormFieldConfig {
  name: FormFieldName
  label: string
  placeholder: string
  type: 'text' | 'email' | 'tel' | 'textarea'
  required: boolean
  maxLength?: number
  minLength?: number
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric'
}

// Мета-информация о поле
export interface IFieldMeta {
  touched: boolean
  dirty: boolean
  error?: string
  validating: boolean
}

// Состояние всех полей
export type FormFieldsMeta = Record<FormFieldName, IFieldMeta>
