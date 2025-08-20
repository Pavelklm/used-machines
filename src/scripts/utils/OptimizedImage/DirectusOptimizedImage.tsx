import { useState, useRef, useEffect } from 'react'

interface DirectusOptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  fit?: 'cover' | 'contain' | 'inside' | 'outside'
}

export const DirectusOptimizedImage = ({
  src,
  alt,
  width,
  height, 
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'blur',
  fit = 'cover'
}: DirectusOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Intersection Observer для lazy loading
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.1 
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // Проверяем является ли это Directus URL
  const isDirectusAsset = (url: string): boolean => {
    return url.includes('/assets/') || url.includes('admin.hornsandhooves.pp.ua')
  }

  // Генерация URL для разных форматов через Directus API
  const getDirectusUrl = (format?: 'webp' | 'avif', transforms?: string): string => {
    if (!src || !isDirectusAsset(src)) return src

    const url = new URL(src)
    const params = new URLSearchParams()
    
    // Добавляем существующие параметры
    url.searchParams.forEach((value, key) => {
      params.set(key, value)
    })

    // Добавляем format
    if (format) {
      params.set('format', format)
    }

    // Добавляем quality
    params.set('quality', quality.toString())

    // Добавляем размеры если указаны
    if (width) params.set('width', width.toString())
    if (height) params.set('height', height.toString())
    
    // Добавляем fit
    params.set('fit', fit)

    // Добавляем дополнительные трансформации
    if (transforms) {
      params.set('transforms', transforms)
    }

    return `${url.origin}${url.pathname}?${params.toString()}`
  }

  // Responsive размеры
  const responsiveSizes = width 
    ? `(max-width: 768px) ${Math.round(width * 0.8)}px, ${width}px`
    : '100vw'

  // Fallback на оригинальный URL при ошибке
  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  // Если не Directus изображение, возвращаем простой img
  if (!isDirectusAsset(src)) {
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
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: fit,
              transition: 'opacity 0.3s ease',
              opacity: isLoaded ? 1 : 0
            }}
          />
        )}
      </div>
    )
  }

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
          {!hasError && (
            <source 
              srcSet={getDirectusUrl('avif')} 
              type="image/avif"
              sizes={responsiveSizes}
            />
          )}
          
          {/* WebP - поддержка большинством браузеров */}
          {!hasError && (
            <source 
              srcSet={getDirectusUrl('webp')} 
              type="image/webp"
              sizes={responsiveSizes}
            />
          )}
          
          {/* Fallback - оригинальный или без трансформаций при ошибке */}
          <img
            src={hasError ? src : getDirectusUrl()}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: fit,
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

export default DirectusOptimizedImage