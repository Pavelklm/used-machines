import { useCallback, useMemo } from 'react'

interface UseImageNavigationOptions {
  maxVisibleThumbnails?: number
}

export const useImageNavigation = (
  images: string[],
  currentImageIndex: number,
  setCurrentImageIndex: (index: number) => void,
  options: UseImageNavigationOptions = {}
) => {
  const { maxVisibleThumbnails = 3 } = options

  const getThumbnailRange = useCallback(() => {
    if (images.length <= maxVisibleThumbnails) {
      return {
        start: 0,
        end: images.length,
        indices: Array.from({ length: images.length }, (_, i) => i),
      }
    }

    const halfVisible = Math.floor(maxVisibleThumbnails / 2)
    const indices = []

    for (let i = -halfVisible; i <= halfVisible; i++) {
      let index = currentImageIndex + i
      if (index < 0) {
        index = images.length + index
      } else if (index >= images.length) {
        index = index - images.length
      }
      indices.push(index)
    }

    return { start: 0, end: indices.length, indices }
  }, [images.length, currentImageIndex, maxVisibleThumbnails])

  const handlePrevious = useCallback(() => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    )
  }, [currentImageIndex, images.length, setCurrentImageIndex])

  const handleNext = useCallback(() => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    )
  }, [currentImageIndex, images.length, setCurrentImageIndex])

  const visibleThumbnails = useMemo(() => {
    const { indices: visibleIndices } = getThumbnailRange()
    return visibleIndices.map((index) => ({
      image: images[index],
      index,
    }))
  }, [getThumbnailRange, images])

  return {
    handlePrevious,
    handleNext,
    getThumbnailRange,
    visibleThumbnails,
  }
}