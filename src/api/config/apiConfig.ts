// API конфигурация
export const API_CONFIG = {
  // Базовый URL (можно изменить для разных окружений)
  baseURL: import.meta.env.VITE_API_URL || '',

  // Таймаут запросов (в миллисекундах)
  timeout: 30000,

  // Количество попыток при неудаче
  retryAttempts: 3,

  // Задержка между попытками (мс)
  retryDelay: 1000,
} as const

// API endpoints
export const API_ENDPOINTS = {
  consultation: '/api/consultation',
} as const

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
} as const

// HTTP статусы и их сообщения
export const HTTP_STATUS_MESSAGES = {
  400: 'Невірні дані. Перевірте всі поля форми',
  401: 'Необхідна авторизація',
  403: 'Доступ заборонено',
  404: 'Ресурс не знайдено',
  422: 'Дані не пройшли перевірку на сервері',
  429: 'Забагато запитів. Спробуйте через хвилину',
  500: 'Проблеми на сервері. Спробуйте пізніше',
  502: 'Помилка шлюзу',
  503: 'Сервіс тимчасово недоступний',
  504: 'Час очікування відповіді вичерпано',
} as const

// Сообщения о сетевых ошибках
export const NETWORK_ERROR_MESSAGES = {
  offline: "Немає з'єднання з інтернетом",
  timeout: "Повільне з'єднання. Спробуйте ще раз",
  aborted: 'Запит було скасовано',
  unknown: 'Невідома помилка. Спробуйте пізніше',
} as const

// Типы ошибок
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  SERVER: 'SERVER_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
} as const

export type ErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES]
