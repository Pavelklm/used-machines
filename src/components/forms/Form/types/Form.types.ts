// Form.types.ts - Правильная версия с импортами
// Убери эту строку, она вызывает ошибку:
// import Vodafone from '@/components/forms/Form/svg/vodafone'

import { JSX } from 'react'

export interface IFormData {
  name: string
  phone: string
  email: string
  comment: string
}

export interface IFormErrors {
  name?: string
  phone?: string
  email?: string
  comment?: string
}

export interface IApiResponse {
  success: boolean
  message?: string
  data?: any
}

export interface IOperatorInfo {
  name: string
  color: string
  emoji: JSX.Element
}

// Пока без SVG компонентов, чтобы избежать ошибок импорта
export const UKRAINE_OPERATORS = {
  '067': { name: 'Kyivstar', color: '#185F8D', emoji: '⭐' },
  '068': { name: 'Kyivstar', color: '#185F8D', emoji: '⭐' },
  '096': { name: 'Kyivstar', color: '#185F8D', emoji: '⭐' },
  '097': { name: 'Kyivstar', color: '#185F8D', emoji: '⭐' },
  '098': { name: 'Kyivstar', color: '#185F8D', emoji: '⭐' },

  '050': { name: 'Vodafone', color: '#E60000', emoji: '🔴' },
  '066': { name: 'Vodafone', color: '#E60000', emoji: '🔴' },
  '095': { name: 'Vodafone', color: '#E60000', emoji: '🔴' },
  '099': { name: 'Vodafone', color: '#E60000', emoji: '🔴' },

  '063': { name: 'lifecell', color: '#ffd300', emoji: '🍃' },
  '073': { name: 'lifecell', color: '#ffd300', emoji: '🍃' },
  '093': { name: 'lifecell', color: '#ffd300', emoji: '🍃' },

  '091': { name: 'Укртелеком', color: '#FF8C00', emoji: '🏛️' },
} as const

export const FORM_PLACEHOLDERS = {
  name: "Ваше ім'я",
  phone: '+38 (067) 123-45-67',
  email: 'Email (latin@example.com)',
  comment: "Коментар (необов'язково)",
} as const

export const ERROR_MESSAGES = {
  required: {
    name: "Ім'я обов'язкове для заповнення",
    phone: "Телефон обов'язковий для заповнення",
    email: "Email обов'язковий для заповнення",
  },
  invalid: {
    name: 'Невірний формат імені',
    phone: 'Невірний формат телефону',
    email: 'Невірний формат email',
    phoneOperator: 'Невірний код оператора',
    phoneFormat: 'Невірний формат українського номера',
  },
  length: {
    nameMin: "Ім'я має містити мінімум 2 символи",
    nameMax: "Ім'я не може перевищувати 50 символів",
    phoneMin: 'Телефон має містити мінімум 10 цифр',
    phoneMax: 'Телефон занадто довгий (максимум 12 цифр)',
    emailMax: 'Email занадто довгий',
  },
  format: {
    emailAt: 'Email має містити символ @',
    emailExample: 'Невірний формат email (приклад: test@example.com)',
    phoneExample: '(приклад: +38 (067) 123-45-67)',
    phoneOperatorList: '(підтримуються: Kyivstar, Vodafone, lifecell та інші)',
  },
} as const

export const VALIDATION_PATTERNS = {
  phone: /^(38)?0\d{9}$/, // Украинский номер: 380671234567 или 0671234567
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Только латиница
  name: /^[a-zA-Zа-яА-ЯіІїЇєЄґĞ\s]{2,50}$/, // Украинские и латинские буквы, 2-50 символов
  nameChars: /^[a-zA-Zа-яА-ЯіІїЇєЄґĞ\s]+$/, // Только разрешенные символы
  emailChars: /^[a-zA-Z0-9@._-]+$/, // Только разрешенные символы для email
} as const

export const API_ENDPOINTS = {
  consultation: '/api/consultation',
} as const

// Дополнительные константы для валидации
export const VALIDATION_LIMITS = {
  name: {
    min: 2,
    max: 25,
  },
  phone: {
    min: 10,
    max: 12,
  },
  email: {
    max: 100,
  },
  comment: {
    max: 500,
  },
} as const

export interface IServerError {
  field?: keyof IFormData
  message: string
  code?: string
}

export interface IServerValidationError extends IApiResponse {
  errors?: IServerError[]
}

export const HTTP_STATUS_MESSAGES = {
  400: 'Невірні дані. Перевірте всі поля форми',
  422: 'Дані не пройшли перевірку на сервері',
  429: 'Забагато запитів. Спробуйте через хвилину',
  500: 'Проблеми на сервері. Спробуйте пізніше',
  503: 'Сервіс тимчасово недоступний',
} as const

export const NETWORK_ERROR_MESSAGES = {
  offline: "Немає з'єднання з інтернетом",
  timeout: "Повільне з'єднання. Спробуйте ще раз",
  unknown: 'Невідома помилка. Спробуйте пізніше',
} as const
