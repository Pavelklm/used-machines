import { useState, useRef, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean // Для LCP изображений
  quality?: number
  placeholder?: 'blur' | 'empty'
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height, 
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'blur'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority) // Priority изображения загружаем сразу
  const imgRef = useRef<HTMLImageElement>(null)

  // Intersection Observer для lazy loading
  useEffect(() => {
    if (priority) return // Priority изображения не lazy

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        rootMargin: '50px', // Загружаем за 50px до появления
        threshold: 0.1 
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // Генерация WebP/AVIF источников
  const getOptimizedSrc = (format: 'webp' | 'avif') => {
    // Если это внешний URL, возвращаем как есть
    if (src.startsWith('http')) return src
    
    // Для локальных файлов генерируем WebP/AVIF версии
    const [name, ext] = src.split('.')
    return `${name}.${format}`
  }

  // Responsive размеры
  const responsiveSizes = width 
    ? `(max-width: 768px) ${Math.round(width * 0.8)}px, ${width}px`
    : '100vw'

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto',
        backgroundColor: placeholder === 'blur' ? '#f3f4f6' : 'transparent'
      }}
    >
      {isInView && (
        <picture>
          {/* AVIF - самый эффективный формат */}
          <source 
            srcSet={getOptimizedSrc('avif')} 
            type="image/avif"
            sizes={responsiveSizes}
          />
          
          {/* WebP - поддержка большинством браузеров */}
          <source 
            srcSet={getOptimizedSrc('webp')} 
            type="image/webp"
            sizes={responsiveSizes}
          />
          
          {/* Fallback - оригинальный формат */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.3s ease',
              opacity: isLoaded ? 1 : 0
            }}
            // Preload для LCP изображений
            {...(priority && {
              fetchPriority: 'high' as const
            })}
          />
        </picture>
      )}
      
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite'
          }}
        />
      )}
    </div>
  )
}

export default OptimizedImage