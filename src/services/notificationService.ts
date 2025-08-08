import { toast, ToastOptions } from 'react-hot-toast'
import { IFormErrors } from '@/components/forms/Form/types/Form.types'

// Типы уведомлений
export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'loading'

// Интерфейс для настроек уведомлений
interface NotificationConfig extends Partial<ToastOptions> {
  title?: string
  description?: string
  icon?: string
}

// Стили для разных типов уведомлений
const TOAST_STYLES = {
  success: {
    background: '#f0fdf4',
    color: '#166534',
    border: '1px solid #bbf7d0',
  },
  error: {
    background: '#fef2f2',
    color: '#991b1b',
    border: '1px solid #fecaca',
  },
  warning: {
    background: '#fefce8',
    color: '#854d0e',
    border: '1px solid #fde68a',
  },
  info: {
    background: '#eff6ff',
    color: '#1e40af',
    border: '1px solid #bfdbfe',
  },
} as const

// Дефолтные настройки
const DEFAULT_OPTIONS: ToastOptions = {
  duration: 5000,
  position: 'top-center',
  style: {
    fontSize: '14px',
    maxWidth: '400px',
    padding: '12px 16px',
  },
}

// Иконки для разных типов полей формы
const FIELD_ICONS: Record<string, string> = {
  name: '👤',
  phone: '📱',
  email: '📧',
  comment: '💬',
  default: '⚠️',
}

// Класс для работы с уведомлениями
class NotificationService {
  /**
   * Показать уведомление об успехе
   */
  success(message: string, options?: NotificationConfig): string {
    const { icon = '✅', ...restOptions } = options || {}
    
    return toast.success(`${icon} ${message}`, {
      ...DEFAULT_OPTIONS,
      duration: 6000,
      ...restOptions,
      style: {
        ...DEFAULT_OPTIONS.style,
        ...TOAST_STYLES.success,
        ...restOptions?.style,
      },
    })
  }

  /**
   * Показать уведомление об ошибке
   */
  error(message: string, options?: NotificationConfig): string {
    const { icon = '❌', ...restOptions } = options || {}
    
    return toast.error(`${icon} ${message}`, {
      ...DEFAULT_OPTIONS,
      duration: 7000,
      ...restOptions,
      style: {
        ...DEFAULT_OPTIONS.style,
        ...TOAST_STYLES.error,
        ...restOptions?.style,
      },
    })
  }

  /**
   * Показать предупреждение
   */
  warning(message: string, options?: NotificationConfig): string {
    const { icon = '⚠️', ...restOptions } = options || {}
    
    return toast(`${icon} ${message}`, {
      ...DEFAULT_OPTIONS,
      duration: 5000,
      ...restOptions,
      style: {
        ...DEFAULT_OPTIONS.style,
        ...TOAST_STYLES.warning,
        ...restOptions?.style,
      },
    })
  }

  /**
   * Показать информационное уведомление
   */
  info(message: string, options?: NotificationConfig): string {
    const { icon = 'ℹ️', ...restOptions } = options || {}
    
    return toast(`${icon} ${message}`, {
      ...DEFAULT_OPTIONS,
      ...restOptions,
      style: {
        ...DEFAULT_OPTIONS.style,
        ...TOAST_STYLES.info,
        ...restOptions?.style,
      },
    })
  }

  /**
   * Показать загрузку
   */
  loading(message: string, options?: NotificationConfig): string {
    const { icon = '⏳', ...restOptions } = options || {}
    
    return toast.loading(`${icon} ${message}`, {
      ...DEFAULT_OPTIONS,
      duration: Infinity,
      ...restOptions,
    })
  }

  /**
   * Обновить существующее уведомление
   */
  update(
    toastId: string,
    type: Exclude<NotificationType, 'loading'>,
    message: string,
    options?: NotificationConfig
  ): void {
    const methods = {
      success: this.success.bind(this),
      error: this.error.bind(this),
      warning: this.warning.bind(this),
      info: this.info.bind(this),
    }

    methods[type](message, { ...options, id: toastId })
  }

  /**
   * Убрать уведомление
   */
  dismiss(toastId?: string): void {
    toast.dismiss(toastId)
  }

  /**
   * Показать ошибки валидации формы
   */
  showValidationErrors(errors: IFormErrors): string {
    const errorEntries = Object.entries(errors)
    
    if (errorEntries.length === 0) return ''

    const errorMessages = errorEntries.map(([field, message]) => {
      const icon = FIELD_ICONS[field] || FIELD_ICONS.default
      return `${icon} ${message}`
    })

    return this.error(errorMessages.join('\n'), {
      icon: '',
      duration: 6000,
      style: {
        whiteSpace: 'pre-line',
      },
    })
  }

  /**
   * Показать уведомление об успешной отправке формы
   */
  showFormSuccess(): string {
    return this.success("Дякуємо за заявку!\nНевдовзі ми з вами зв'яжемося", {
      icon: '🎉',
      duration: 6000,
      style: {
        fontSize: '16px',
        fontWeight: '600',
        whiteSpace: 'pre-line',
      },
    })
  }

  /**
   * Показать ошибку сети
   */
  showNetworkError(message?: string): string {
    return this.error(
      message || "Перевірте з'єднання з інтернетом",
      {
        icon: '🌐',
        duration: 7000,
      }
    )
  }

  /**
   * Показать ошибку сервера
   */
  showServerError(message?: string): string {
    return this.error(
      message || 'Проблеми на сервері. Спробуйте пізніше',
      {
        icon: '🔧',
        duration: 7000,
      }
    )
  }

  /**
   * Создать Promise-based уведомление
   */
  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: Error) => string)
    },
    options?: NotificationConfig
  ): Promise<T> {
    return toast.promise(
      promise,
      {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      },
      {
        ...DEFAULT_OPTIONS,
        ...options,
        success: {
          ...DEFAULT_OPTIONS,
          ...options,
          style: {
            ...DEFAULT_OPTIONS.style,
            ...TOAST_STYLES.success,
            ...options?.style,
          },
        },
        error: {
          ...DEFAULT_OPTIONS,
          ...options,
          style: {
            ...DEFAULT_OPTIONS.style,
            ...TOAST_STYLES.error,
            ...options?.style,
          },
        },
      }
    )
  }
}

// Создаем и экспортируем singleton экземпляр
export const notificationService = new NotificationService()

// Экспортируем также класс для возможности создания новых экземпляров
export { NotificationService }
