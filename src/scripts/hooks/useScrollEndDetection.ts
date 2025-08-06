import { useCallback, useRef } from 'react'

interface ScrollEndOptions {
  threshold?: number
  stableFrames?: number
}

export const useScrollEndDetection = (
  onScrollEnd: () => void,
  options: ScrollEndOptions = {}
) => {
  const rafRef = useRef<number | undefined>(undefined)
  const { threshold = 1, stableFrames = 3 } = options

  const startTracking = useCallback(() => {
    if (rafRef.current !== undefined) {
      cancelAnimationFrame(rafRef.current)
    }

    // Проверка на существование window (SSR)
    if (typeof window === 'undefined') {
      onScrollEnd()
      return
    }

    let lastScrollY = window.scrollY
    let stableCount = 0

    const checkScrollStability = () => {
      const currentScrollY = window.scrollY

      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        stableCount++
        if (stableCount >= stableFrames) {
          onScrollEnd()
          return
        }
      } else {
        stableCount = 0
        lastScrollY = currentScrollY
      }

      rafRef.current = requestAnimationFrame(checkScrollStability)
    }

    rafRef.current = requestAnimationFrame(checkScrollStability)
  }, [onScrollEnd, threshold, stableFrames])

  const stopTracking = useCallback(() => {
    if (rafRef.current !== undefined) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = undefined
    }
  }, [])

  return { startTracking, stopTracking }
}
