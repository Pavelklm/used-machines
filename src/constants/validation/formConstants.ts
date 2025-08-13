// Лимиты валидации
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

// Паттерны валидации
export const VALIDATION_PATTERNS = {
  phone: /^(38)?0\d{9}$/, // Украинский номер: 380671234567 или 0671234567
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Только латиница
  name: /^[a-zA-Zа-яА-ЯіІїЇєЄґĞ\s]{2,50}$/, // Украинские и латинские буквы, 2-50 символов
  nameChars: /^[a-zA-Zа-яА-ЯіІїЇєЄґĞ\s]+$/, // Только разрешенные символы
  emailChars: /^[a-zA-Z0-9@._-]+$/, // Только разрешенные символы для email
} as const

// Сообщения об ошибках
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
    commentMax: 'Коментар занадто довгий (максимум 500 символів)',
  },
  format: {
    emailAt: 'Email має містити символ @',
    emailExample: 'Невірний формат email (приклад: test@example.com)',
    phoneExample: '(приклад: +38 (067) 123-45-67)',
    phoneOperatorList: '(підтримуються: Kyivstar, Vodafone, lifecell та інші)',
    nameLettersOnly: "Ім'я може містити тільки літери",
    nameNoNumbers: "Ім'я не може містити цифри",
    nameNoSpecialChars: "Ім'я не може містити спеціальні символи",
  },
} as const

// Плейсхолдеры для полей формы
export const FORM_PLACEHOLDERS = {
  name: "Ім'я",
  phone: '+38 (067) 000-00-00',
  email: 'Email',
  comment: "Коментар (необов'язково)",
} as const

// Лейблы для полей формы
export const FORM_LABELS = {
  name: "Ім'я",
  phone: 'Телефон',
  email: 'Email',
  comment: 'Коментар',
} as const

// Сообщения успеха
export const SUCCESS_MESSAGES = {
  formSubmitted: "Дякуємо за заявку! Невдовзі ми з вами зв'яжемося",
  fieldValid: 'Поле заповнено правильно',
  allFieldsValid: 'Всі поля заповнені правильно',
} as const

// Сообщения подсказок
export const HINT_MESSAGES = {
  nameHint: "Введіть ваше повне ім'я",
  phoneHint: 'Введіть український номер телефону',
  emailHint: 'Введіть діючу email адресу',
  commentHint: 'Додайте коментар за бажанням',
} as const

// Автозаполнение для полей
export const FORM_AUTOCOMPLETE = {
  name: 'name',
  phone: 'tel',
  email: 'email',
  comment: 'off',
} as const

// Input modes для мобильных устройств
export const FORM_INPUT_MODES = {
  name: 'text',
  phone: 'tel',
  email: 'email',
  comment: 'text',
} as const

// Типы полей
export const FORM_FIELD_TYPES = {
  name: 'text',
  phone: 'tel',
  email: 'email',
  comment: 'textarea',
} as const
