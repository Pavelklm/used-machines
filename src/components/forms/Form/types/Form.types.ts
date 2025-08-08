// Этот файл перенесен в новые расположения
// Используйте новые импорты:

// Типы формы
export type {
  IFormData,
  IFormErrors,
} from '@/types/forms/consultationForm.types'

// Константы валидации
export {
  FORM_PLACEHOLDERS,
  ERROR_MESSAGES,
  VALIDATION_PATTERNS,
  VALIDATION_LIMITS,
} from '@/constants/validation/formConstants'

// API типы и константы
export {
  API_ENDPOINTS,
  HTTP_STATUS_MESSAGES,
  NETWORK_ERROR_MESSAGES,
} from '@/api/config/apiConfig'

export type {
  IApiResponse,
  IServerError,
  IServerValidationError,
} from '@/api/types/apiTypes'
