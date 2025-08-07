import {
  ERROR_MESSAGES,
  IFormData,
  IFormErrors,
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from '@/components/forms/Form/types/Form.types'
import { OPERATORS } from '@/constants/phoneOperators'

const getCleanPhone = (formattedPhone: string): string => {
  return formattedPhone.replace(/\D/g, '')
}

const isValidOperatorCode = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '').replace(/^38/, '')
  if (cleanPhone.length >= 3) {
    const operatorCode = cleanPhone.slice(0, 3)
    return OPERATORS[operatorCode] !== undefined
  }
  return false
}

export const validateName = (name: string): string | null => {
  if (!name.trim()) return ERROR_MESSAGES.required.name
  if (name.trim().length < VALIDATION_LIMITS.name.min)
    return ERROR_MESSAGES.length.nameMin
  if (name.trim().length > VALIDATION_LIMITS.name.max)
    return ERROR_MESSAGES.length.nameMax
  if (!VALIDATION_PATTERNS.nameChars.test(name))
    return ERROR_MESSAGES.invalid.name
  return null
}

export const validatePhone = (phone: string): string | null => {
  const cleanPhone = getCleanPhone(phone)
  if (!phone.trim()) return ERROR_MESSAGES.required.phone
  if (cleanPhone.length < VALIDATION_LIMITS.phone.min)
    return ERROR_MESSAGES.length.phoneMin
  if (cleanPhone.length > VALIDATION_LIMITS.phone.max)
    return ERROR_MESSAGES.length.phoneMax
  if (!VALIDATION_PATTERNS.phone.test(cleanPhone))
    return ERROR_MESSAGES.invalid.phoneFormat
  if (!isValidOperatorCode(phone)) return ERROR_MESSAGES.invalid.phoneOperator
  return null
}

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return ERROR_MESSAGES.required.email
  if (!email.includes('@')) return ERROR_MESSAGES.format.emailAt
  if (!VALIDATION_PATTERNS.email.test(email))
    return ERROR_MESSAGES.format.emailExample
  if (email.length > VALIDATION_LIMITS.email.max)
    return ERROR_MESSAGES.length.emailMax
  return null
}

export const validateForm = (
  formData: IFormData
): { errors: IFormErrors; isValid: boolean } => {
  const errors: IFormErrors = {}

  const nameError = validateName(formData.name)
  if (nameError) errors.name = nameError

  const phoneError = validatePhone(formData.phone)
  if (phoneError) errors.phone = phoneError

  const emailError = validateEmail(formData.email)
  if (emailError) errors.email = emailError

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}
