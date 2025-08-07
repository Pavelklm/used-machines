import { IOperatorInfo } from '@/constants/phoneOperators'
import React from 'react'
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
    <div className='request-form-input-wrapper'>
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
      </div>

      {hasError && (
        <p id={errorId} className='request-form-error-message' role='alert'>
          {error}
        </p>
      )}
    </div>
  )
}
