import { IOperatorInfo } from '@/constants/phoneOperators'
import React, { useState } from 'react'
import { FORM_PLACEHOLDERS, IFormData } from '../types/Form.types'

interface FormInputProps {
  name: keyof IFormData
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  currentOperator?: IOperatorInfo | null
  additionalProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const OperatorBadge: React.FC<{ operator: IOperatorInfo }> = ({ operator }) => (
  <div
    className='operator-badge'
    style={{
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 8px',
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      border: `1px solid ${operator.color}`,
      fontSize: '12px',
      fontWeight: '600',
      zIndex: 1,
    }}
  >
    <operator.icon className='operator-icon' />
  </div>
)

const InlineErrorTooltip: React.FC<{ error: string; isVisible: boolean }> = ({
  error,
  isVisible,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  if (!isVisible) return null

  return (
    <div
      className={`inline-error-tooltip ${isHovered ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role='alert'
      aria-live='polite'
    >
      {/* Иконка ошибки */}
      <div className='error-icon'>
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <circle cx='8' cy='8' r='8' fill='#ef4444' />
          <path
            d='M8 4v4'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <circle cx='8' cy='11' r='1' fill='white' />
        </svg>
      </div>

      {/* Текст ошибки (показывается при hover) */}
      <div className='error-text'>{error}</div>
    </div>
  )
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  type,
  value,
  onChange,
  error,
  currentOperator,
  additionalProps = {},
}) => {
  const hasError = !!error
  const errorId = `${name}-error`
  const isPhoneField = name === 'phone'

  return (
    <div className='request-form-input-wrapper-inline'>
      <div style={{ position: 'relative' }}>
        <input
          name={name}
          type={type}
          placeholder={FORM_PLACEHOLDERS[name]}
          value={value}
          onChange={onChange}
          className={`request-form-input ${hasError ? 'request-form-input-error' : ''} ${isPhoneField && currentOperator ? 'request-form-input-with-operator' : ''}`}
          aria-label={FORM_PLACEHOLDERS[name]}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          {...additionalProps}
        />

        {/* Показываем оператора для поля телефона */}
        {isPhoneField && currentOperator && (
          <OperatorBadge operator={currentOperator} />
        )}

        {/* Inline ошибка */}
        <InlineErrorTooltip error={error || ''} isVisible={hasError} />
      </div>
    </div>
  )
}
