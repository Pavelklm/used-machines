// Общие утилитарные типы

// Делает все поля опциональными кроме указанных
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>

// Делает указанные поля обязательными
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Исключает null и undefined из типа
export type NonNullable<T> = T extends null | undefined ? never : T

// Тип для async функций
export type AsyncFunction<T = void> = () => Promise<T>

// Тип для колбэков
export type Callback<T = void> = (data: T) => void

// Тип для обработчиков ошибок
export type ErrorHandler = (error: Error) => void

// Nullable тип
export type Nullable<T> = T | null

// Optional тип
export type Optional<T> = T | undefined

// Тип для словаря
export type Dictionary<T> = Record<string, T>

// Тип для массива или одного элемента
export type ArrayOrSingle<T> = T | T[]

// Глубокая частичность
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Глубокая readonly
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// Извлечение типа из Promise
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

// Извлечение типа из массива
export type UnwrapArray<T> = T extends Array<infer U> ? U : T

// Типы для пагинации
export interface IPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// Типы для сортировки
export interface ISorting<T = string> {
  field: T
  direction: 'asc' | 'desc'
}

// Типы для фильтрации
export interface IFilter<T = any> {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'like'
  value: T
}

// Базовый интерфейс для сущностей
export interface IEntity {
  id: string | number
  createdAt: Date | string
  updatedAt: Date | string
}

// Статусы загрузки
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Результат операции
export interface IOperationResult<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
