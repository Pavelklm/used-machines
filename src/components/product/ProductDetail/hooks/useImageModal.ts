import { useEffect } from 'react'

interface UseImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
}

export const useImageModal = ({
  isOpen,
  onClose,
  images,
  currentImageIndex,
  setCurrentImageIndex,
}: UseImageModalProps) => {
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = '0'

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          setCurrentImageIndex(
            currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
          )
          break
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          setCurrentImageIndex(
            currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
          )
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'Home':
          e.preventDefault()
          setCurrentImageIndex(0)
          break
        case 'End':
          e.preventDefault()
          setCurrentImageIndex(images.length - 1)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow || 'auto'
      document.body.style.position = originalPosition || 'static'
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [isOpen, currentImageIndex, images.length, setCurrentImageIndex, onClose])
}
