import {
  API_CONFIG,
  API_ENDPOINTS,
  DEFAULT_HEADERS,
  ERROR_TYPES,
  ErrorType,
  HTTP_STATUS_MESSAGES,
  NETWORK_ERROR_MESSAGES,
} from '@/api/config/apiConfig'
import {
  ConsultationResponse,
  IApiError,
  IServerValidationError,
} from '@/api/types/apiTypes'
import { IFormData } from '@/components/forms/Form/types/Form.types'

// Класс для API ошибок
class ApiError extends Error implements IApiError {
  status?: number
  errors?: IServerValidationError['errors']
  code?: string
  type: ErrorType

  constructor(
    message: string,
    status?: number,
    errors?: IServerValidationError['errors'],
    type: ErrorType = ERROR_TYPES.UNKNOWN
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
    this.type = type
  }
}

// Функция для создания AbortController с таймаутом
const createAbortController = (timeout: number): AbortController => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), timeout)
  return controller
}

// Функция для определения типа ошибки
const getErrorType = (error: unknown): ErrorType => {
  if (error instanceof Error) {
    if (error.name === 'AbortError') return ERROR_TYPES.TIMEOUT
    if (error.message.includes('Failed to fetch')) return ERROR_TYPES.NETWORK
    if (error.message.includes('NetworkError')) return ERROR_TYPES.NETWORK
  }
  return ERROR_TYPES.UNKNOWN
}

// Функция для получения сообщения об ошибке
const getErrorMessage = (error: unknown, status?: number): string => {
  // Проверяем статус код
  if (
    status &&
    HTTP_STATUS_MESSAGES[status as keyof typeof HTTP_STATUS_MESSAGES]
  ) {
    return HTTP_STATUS_MESSAGES[status as keyof typeof HTTP_STATUS_MESSAGES]
  }

  // Проверяем тип ошибки
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return NETWORK_ERROR_MESSAGES.timeout
    }
    if (
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError')
    ) {
      return NETWORK_ERROR_MESSAGES.offline
    }
    return error.message
  }

  return NETWORK_ERROR_MESSAGES.unknown
}

// Функция задержки для retry
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

// Основная функция отправки с retry логикой
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries = API_CONFIG.retryAttempts
): Promise<Response> => {
  let lastError: Error | null = null

  for (let i = 0; i <= retries; i++) {
    try {
      const controller = createAbortController(API_CONFIG.timeout)

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })

      // Если запрос успешен или это клиентская ошибка (4xx), возвращаем ответ
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response
      }

      // Для серверных ошибок (5xx) делаем retry
      if (response.status >= 500 && i < retries) {
        await delay(API_CONFIG.retryDelay * (i + 1)) // Увеличиваем задержку с каждой попыткой
        continue
      }

      return response
    } catch (error) {
      lastError = error as Error

      // Не делаем retry для отмененных запросов
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError(
          NETWORK_ERROR_MESSAGES.timeout,
          undefined,
          undefined,
          ERROR_TYPES.TIMEOUT
        )
      }

      // Для последней попытки выбрасываем ошибку
      if (i === retries) {
        throw new ApiError(
          getErrorMessage(error),
          undefined,
          undefined,
          getErrorType(error)
        )
      }

      // Ждем перед следующей попыткой
      await delay(API_CONFIG.retryDelay * (i + 1))
    }
  }

  throw lastError || new Error(NETWORK_ERROR_MESSAGES.unknown)
}

// Сервис для работы с консультациями
export const consultationService = {
  // Функция отправки консультации
  async submit(data: IFormData): Promise<ConsultationResponse> {
    try {
      const response = await fetchWithRetry(
        API_CONFIG.baseURL + API_ENDPOINTS.consultation,
        {
          method: 'POST',
          headers: DEFAULT_HEADERS,
          body: JSON.stringify(data),
        }
      )

      // Проверяем content-type
      const contentType = response.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        throw new ApiError(
          'Сервер повернув некоректну відповідь',
          response.status,
          undefined,
          ERROR_TYPES.SERVER
        )
      }

      // Парсим ответ
      const responseData: ConsultationResponse | IServerValidationError =
        await response.json()

      // Если ответ не успешен
      if (!response.ok) {
        const errorData = responseData as IServerValidationError
        throw new ApiError(
          errorData.message || getErrorMessage(null, response.status),
          response.status,
          errorData.errors,
          response.status === 422 ? ERROR_TYPES.VALIDATION : ERROR_TYPES.SERVER
        )
      }

      // Проверяем успешность на уровне данных
      if (!responseData.success) {
        throw new ApiError(
          responseData.message || 'Помилка обробки заявки',
          response.status,
          undefined,
          ERROR_TYPES.SERVER
        )
      }

      return responseData as ConsultationResponse
    } catch (error) {
      // Если это уже ApiError, пробрасываем дальше
      if (error instanceof ApiError) {
        throw error
      }

      // Иначе создаем новую ApiError
      throw new ApiError(
        getErrorMessage(error),
        undefined,
        undefined,
        getErrorType(error)
      )
    }
  },

  /**
   * Проверка доступности API
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(API_CONFIG.baseURL + '/api/health', {
        method: 'GET',
        signal: createAbortController(5000).signal,
      })
      return response.ok
    } catch {
      return false
    }
  },
}

// Экспортируем класс ошибки для использования в других местах
export { ApiError }
