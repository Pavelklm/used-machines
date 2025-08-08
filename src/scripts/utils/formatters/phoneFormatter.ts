import { IOperatorInfo, OPERATORS } from '@/constants/phoneOperators'
import { VALIDATION_LIMITS } from '@/constants/validation/formConstants'

/**
 * Очистка телефона от всех символов кроме цифр
 */
export const getCleanPhone = (phone: string): string => {
  return phone.replace(/\D/g, '')
}

/**
 * Удаление кода страны из телефона
 */
export const removeCountryCode = (phone: string): string => {
  const cleaned = getCleanPhone(phone)
  return cleaned.replace(/^38/, '')
}

/**
 * Форматирование ввода телефона
 */
export const formatPhoneInput = (value: string): string => {
  const cleaned = removeCountryCode(value)

  let phoneDigits = cleaned
  
  // Добавляем код страны
  if (cleaned.startsWith('0') && cleaned.length > 1) {
    phoneDigits = '38' + cleaned
  } else if (!cleaned.startsWith('38') && cleaned.length > 0) {
    phoneDigits = '38' + cleaned
  }

  // Ограничиваем до максимальной длины
  phoneDigits = phoneDigits.slice(0, VALIDATION_LIMITS.phone.max)

  // Форматируем в зависимости от длины
  if (phoneDigits.length === 0) return ''
  if (phoneDigits.length <= 2) return `+${phoneDigits}`
  if (phoneDigits.length <= 5) {
    return `+${phoneDigits.slice(0, 2)} (${phoneDigits.slice(2)}`
  }
  if (phoneDigits.length <= 8) {
    return `+${phoneDigits.slice(0, 2)} (${phoneDigits.slice(2, 5)}) ${phoneDigits.slice(5)}`
  }
  if (phoneDigits.length <= 10) {
    return `+${phoneDigits.slice(0, 2)} (${phoneDigits.slice(2, 5)}) ${phoneDigits.slice(5, 8)}-${phoneDigits.slice(8)}`
  }
  
  return `+${phoneDigits.slice(0, 2)} (${phoneDigits.slice(2, 5)}) ${phoneDigits.slice(5, 8)}-${phoneDigits.slice(8, 10)}-${phoneDigits.slice(10)}`
}

/**
 * Получение информации об операторе по номеру телефона
 */
export const getOperatorInfo = (phone: string): IOperatorInfo | null => {
  const cleanPhone = removeCountryCode(phone)

  if (cleanPhone.length >= 3) {
    const operatorCode = cleanPhone.slice(0, 3)
    return OPERATORS[operatorCode] || null
  }

  return null
}

/**
 * Проверка валидности кода оператора
 */
export const isValidOperatorCode = (phone: string): boolean => {
  return getOperatorInfo(phone) !== null
}

/**
 * Форматирование телефона для отображения (без ввода)
 */
export const formatPhoneDisplay = (phone: string): string => {
  const cleaned = getCleanPhone(phone)
  
  if (cleaned.length !== 12) return phone
  
  return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10)}`
}

/**
 * Проверка, является ли номер украинским
 */
export const isUkrainianPhone = (phone: string): boolean => {
  const cleaned = getCleanPhone(phone)
  return cleaned.startsWith('380') || (cleaned.startsWith('0') && cleaned.length === 10)
}

/**
 * Получение маски для телефона
 */
export const getPhoneMask = (): string => {
  return '+38 (0__) ___-__-__'
}

/**
 * Нормализация телефона для отправки на сервер
 */
export const normalizePhoneForSubmit = (phone: string): string => {
  const cleaned = getCleanPhone(phone)
  
  // Если номер начинается с 0, добавляем код страны
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return '38' + cleaned
  }
  
  return cleaned
}
