import { setSearchOverlay } from '@/context/slices/overlaySlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
import { useProducts } from '@/scripts/hooks/useProducts'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface SearchOption {
  id: string
  label: string
}

interface UseSearchProps {
  onOverlayChange?: (show: boolean) => void
  onSelectProduct?: (productId: string) => void
}

export function useSearch({
  onOverlayChange,
  onSelectProduct,
}: UseSearchProps = {}) {
  const { productsArray, isLoading } = useProducts()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  const options = useMemo(
    () =>
      productsArray.map((item) => ({
        id: String(item.id),
        label: item.product_name,
      })),
    [productsArray]
  )

  const filteredOptions = useMemo(() => {
    if (!inputValue) return []

    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )

    if (filtered.length === 0) {
      return [{ id: 'no-results', label: 'Нічого не знайдено' }]
    }

    return filtered
  }, [options, inputValue])

  const hasInput = inputValue.length > 0

  const handleChange = useCallback(
    (_: any, value: string | SearchOption | null) => {
      if (value && typeof value === 'object' && 'id' in value) {
        if (value.id === 'no-results') {
          return
        }

        setIsNavigating(true)
        
        // Сначала закрываем плашку и очищаем поле
        setOpen(false)
        setInputValue('')
        
        // Затем закрываем overlay
        if (onOverlayChange) {
          onOverlayChange(false)
        } else {
          dispatch(setSearchOverlay(false))
        }

        // И только потом переходим
        if (onSelectProduct) {
          onSelectProduct(value.id)
        } else {
          navigate(`/product/${value.id}`)
        }
        
        // Обнуляем флаг навигации
        setTimeout(() => setIsNavigating(false), 100)
      }
      
      if (value === null) {
        setInputValue('')
        setOpen(false)
        if (onOverlayChange) {
          onOverlayChange(false)
        } else {
          dispatch(setSearchOverlay(false))
        }
      }
    },
    [navigate, onOverlayChange, onSelectProduct, dispatch]
  )

  const handleInputChange = useCallback(
    (_: any, newInputValue: string) => {
      setInputValue(newInputValue)

      if (isNavigating) {
        return
      }

      if (newInputValue.length > 0) {
        setOpen(true)
        if (onOverlayChange) {
          onOverlayChange(true)
        } else {
          dispatch(setSearchOverlay(true))
        }
      } else {
        setOpen(false)
        if (onOverlayChange) {
          onOverlayChange(false)
        } else {
          dispatch(setSearchOverlay(false))
        }
      }
    },
    [onOverlayChange, dispatch, isNavigating]
  )

  const handleOpen = useCallback(() => {
    if (isNavigating) {
      return
    }

    if (!hasInput) {
      return
    }
    setOpen(true)
    if (onOverlayChange) {
      onOverlayChange(true)
    } else {
      dispatch(setSearchOverlay(true))
    }
  }, [onOverlayChange, dispatch, hasInput, isNavigating])

  const handleClose = useCallback(() => {
    setOpen(false)
    if (onOverlayChange) {
      onOverlayChange(false)
    } else {
      dispatch(setSearchOverlay(false))
    }
    setInputValue('')
  }, [onOverlayChange, dispatch])

  // Дополнительный обработчик Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, handleClose])

  return {
    inputValue,
    open,
    isLoading,
    hasInput,
    filteredOptions,
    handleChange,
    handleInputChange,
    handleOpen,
    handleClose,
  }
}
