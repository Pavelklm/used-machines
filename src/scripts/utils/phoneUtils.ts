import { VALIDATION_LIMITS } from '@/components/forms/Form/types/Form.types'

export const formatPhoneInput = (value: string): string => {
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

// Фильтры для инпутов
export const filterEmailInput = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9@._-]/g, '')
}

export const filterNameInput = (value: string): string => {
  return value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґĞ\s]/g, '')
}
