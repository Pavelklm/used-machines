// Базовый интерфейс для всех API ответов
export interface IApiResponse {
  success: boolean
  message?: string
  data?: Record<string, unknown>
}

// Ответ от endpoint консультации
export interface ConsultationResponse extends IApiResponse {
  data?: {
    id?: string
    createdAt?: string
    status?: 'pending' | 'processed' | 'completed'
  }
}

// Ошибка сервера с деталями
export interface IServerError {
  field?: string
  message: string
  code?: string
}

// Ответ с ошибками валидации
export interface IServerValidationError extends IApiResponse {
  success: false
  errors?: IServerError[]
}

// Типы HTTP статусов
export type HttpStatus = 400 | 401 | 403 | 404 | 422 | 429 | 500 | 502 | 503 | 504

// Интерфейс для обработки ошибок
export interface IApiError extends Error {
  status?: number  // Изменено с HttpStatus на number для совместимости
  errors?: IServerError[]
  code?: string
}
