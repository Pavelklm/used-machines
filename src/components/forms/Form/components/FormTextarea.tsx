import React from 'react'
import { FORM_PLACEHOLDERS, VALIDATION_LIMITS } from '../types/Form.types'

interface FormTextareaProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  maxLength?: number
  rows?: number
  showCounter?: boolean
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  value,
  onChange,
  maxLength = VALIDATION_LIMITS.comment.max,
  rows = 4,
  showCounter = true,
}) => {
  return (
    <div className='request-form-input-wrapper'>
      <textarea
        style={{ resize: 'none' }}
        name={name}
        placeholder={FORM_PLACEHOLDERS[name as keyof typeof FORM_PLACEHOLDERS]}
        value={value}
        onChange={onChange}
        className='request-form-input request-form-textarea'
        aria-label={FORM_PLACEHOLDERS[name as keyof typeof FORM_PLACEHOLDERS]}
        rows={rows}
        maxLength={maxLength}
      />
      {showCounter && value.length > 0 && (
        <div className='character-counter'>
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  )
}
