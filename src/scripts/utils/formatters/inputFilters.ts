import { VALIDATION_LIMITS } from '@/constants/validation/formConstants'

/**
 * Фильтр для email - только латинские буквы и разрешенные символы
 */
export const filterEmailInput = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, '')
    .slice(0, VALIDATION_LIMITS.email.max)
}

/**
 * Фильтр для имени - украинские и латинские буквы
 */
export const filterNameInput = (value: string): string => {
  return value
    .replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґĞ\s]/g, '')
    .replace(/\s+/g, ' ') // Заменяем множественные пробелы одним
    .slice(0, VALIDATION_LIMITS.name.max)
}

/**
 * Фильтр для комментария
 */
export const filterCommentInput = (value: string): string => {
  // Разрешаем больше символов для комментария
  return value
    .replace(/[<>]/g, '') // Убираем потенциально опасные символы
    .slice(0, VALIDATION_LIMITS.comment.max)
}

/**
 * Удаление лишних пробелов в начале и конце
 */
export const trimInput = (value: string): string => {
  return value.trim()
}

/**
 * Капитализация первой буквы
 */
export const capitalizeFirst = (value: string): string => {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

/**
 * Капитализация каждого слова
 */
export const capitalizeWords = (value: string): string => {
  return value
    .split(' ')
    .map(word => capitalizeFirst(word))
    .join(' ')
}

/**
 * Нормализация имени (капитализация каждого слова)
 */
export const normalizeNameInput = (value: string): string => {
  const filtered = filterNameInput(value)
  const trimmed = trimInput(filtered)
  return capitalizeWords(trimmed)
}

/**
 * Безопасная обработка текста (экранирование HTML)
 */
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  
  return text.replace(/[&<>"']/g, (char) => map[char])
}

/**
 * Проверка на наличие только пробелов
 */
export const isOnlyWhitespace = (value: string): boolean => {
  return value.trim().length === 0
}

/**
 * Удаление emoji из текста
 */
export const removeEmoji = (text: string): string => {
  return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
}

/**
 * Фильтр для числовых значений
 */
export const filterNumericInput = (value: string): string => {
  return value.replace(/[^0-9]/g, '')
}

/**
 * Фильтр для десятичных чисел
 */
export const filterDecimalInput = (value: string): string => {
  // Разрешаем только цифры и одну точку
  const filtered = value.replace(/[^0-9.]/g, '')
  const parts = filtered.split('.')
  
  if (parts.length > 2) {
    // Если больше одной точки, оставляем только первую
    return parts[0] + '.' + parts.slice(1).join('')
  }
  
  return filtered
}
