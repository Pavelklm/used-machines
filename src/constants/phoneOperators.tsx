import Kyivstar from '@/components/forms/Form/svg/Kyivstar'
import Lifecell from '@/components/forms/Form/svg/Lifecell'
import Ukrtelecom from '@/components/forms/Form/svg/Ukrtelecom'
import Vodafone from '@/components/forms/Form/svg/Vodafone'

export interface IOperatorInfo {
  name: string
  color: string
  icon: React.ComponentType<{ className?: string }>
  fallbackEmoji: string
}

// Базовые данные операторов
const BASE_OPERATORS = {
  // Kyivstar
  '067': { name: 'Kyivstar', color: '#185F8D', fallbackEmoji: '⭐' },
  '068': { name: 'Kyivstar', color: '#185F8D', fallbackEmoji: '⭐' },
  '077': { name: 'Kyivstar', color: '#185F8D', fallbackEmoji: '⭐' },
  '096': { name: 'Kyivstar', color: '#185F8D', fallbackEmoji: '⭐' },
  '097': { name: 'Kyivstar', color: '#185F8D', fallbackEmoji: '⭐' },
  '098': { name: 'Kyivstar', color: '#185F8D', fallbackEmoji: '⭐' },

  // Vodafone
  '050': { name: 'Vodafone', color: '#E60000', fallbackEmoji: '🔴' },
  '066': { name: 'Vodafone', color: '#E60000', fallbackEmoji: '🔴' },
  '095': { name: 'Vodafone', color: '#E60000', fallbackEmoji: '🔴' },
  '099': { name: 'Vodafone', color: '#E60000', fallbackEmoji: '🔴' },

  // lifecell
  '063': { name: 'lifecell', color: '#ffd300', fallbackEmoji: '🍃' },
  '073': { name: 'lifecell', color: '#ffd300', fallbackEmoji: '🍃' },
  '093': { name: 'lifecell', color: '#ffd300', fallbackEmoji: '🍃' },

  // Укртелеком
  '091': { name: 'Укртелеком', color: '#FF8C00', fallbackEmoji: '🏛️' },
} as const

// Экспортируем операторов с SVG компонентами
export const OPERATORS: Record<string, IOperatorInfo> = {
  // Kyivstar
  '067': { ...BASE_OPERATORS['067'], icon: Kyivstar },
  '077': { ...BASE_OPERATORS['077'], icon: Kyivstar },
  '068': { ...BASE_OPERATORS['068'], icon: Kyivstar },
  '096': { ...BASE_OPERATORS['096'], icon: Kyivstar },
  '097': { ...BASE_OPERATORS['097'], icon: Kyivstar },
  '098': { ...BASE_OPERATORS['098'], icon: Kyivstar },

  // Vodafone
  '050': { ...BASE_OPERATORS['050'], icon: Vodafone },
  '066': { ...BASE_OPERATORS['066'], icon: Vodafone },
  '095': { ...BASE_OPERATORS['095'], icon: Vodafone },
  '099': { ...BASE_OPERATORS['099'], icon: Vodafone },

  // lifecell
  '063': { ...BASE_OPERATORS['063'], icon: Lifecell },
  '073': { ...BASE_OPERATORS['073'], icon: Lifecell },
  '093': { ...BASE_OPERATORS['093'], icon: Lifecell },

  // Укртелеком
  '091': { ...BASE_OPERATORS['091'], icon: Ukrtelecom },
}
