import { IOperatorInfo, OPERATORS } from '@/constants/phoneOperators'
import { useState } from 'react'

interface UseOperatorDetectionReturn {
  currentOperator: IOperatorInfo | null
  setCurrentOperator: (operator: IOperatorInfo | null) => void
  getOperatorInfo: (phone: string) => IOperatorInfo | null
}

export const useOperatorDetection = (): UseOperatorDetectionReturn => {
  const [currentOperator, setCurrentOperator] = useState<IOperatorInfo | null>(
    null
  )

  const getOperatorInfo = (phone: string): IOperatorInfo | null => {
    const cleanPhone = phone.replace(/\D/g, '').replace(/^38/, '')

    if (cleanPhone.length >= 3) {
      const operatorCode = cleanPhone.slice(0, 3)
      return OPERATORS[operatorCode] || null
    }

    return null
  }

  return {
    currentOperator,
    setCurrentOperator,
    getOperatorInfo,
  }
}
