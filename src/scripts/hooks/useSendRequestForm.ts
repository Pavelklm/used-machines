import { useFormState } from './useFormState'
import { useFormSubmission } from './useFormSubmission'
import { useOperatorDetection } from './useOperatorDetection'

export const useSendRequestForm = () => {
  const { formData, setFormData, resetForm: resetFormData } = useFormState()
  const { currentOperator, setCurrentOperator, getOperatorInfo } =
    useOperatorDetection()

  const resetForm = (): void => {
    resetFormData()
    setCurrentOperator(null)
  }

  const { isSubmitting, errors, setErrors, handleSubmit } = useFormSubmission({
    formData,
    resetForm,
  })

  return {
    handleSubmit,
    getOperatorInfo,
    setCurrentOperator,
    setFormData,
    setErrors,
    formData,
    errors,
    isSubmitting,
    currentOperator,
  }
}
