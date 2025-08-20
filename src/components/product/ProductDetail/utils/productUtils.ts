import { Product } from '@/types/products'

const buildOptimizedAssetUrl = (baseUrl: string, assetPath: string, options?: {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif'
}) => {
  if (!assetPath || !baseUrl) return assetPath
  
  // Если это уже полный URL
  if (assetPath.startsWith('http')) return assetPath
  
  const url = `${baseUrl}assets/${assetPath}`
  
  if (options && (options.width || options.height || options.quality || options.format)) {
    const params = new URLSearchParams()
    
    if (options.width) params.set('width', options.width.toString())
    if (options.height) params.set('height', options.height.toString())
    if (options.quality) params.set('quality', options.quality.toString())
    if (options.format) params.set('format', options.format)
    params.set('fit', 'contain')
    
    return `${url}?${params.toString()}`
  }
  
  return url
}

export const getProductImages = (product: Product): string[] => {
  const images: string[] = []
  const directusUrl = import.meta.env.VITE_API_BASE_URL

  if (product.photo_url) {
    images.push(buildOptimizedAssetUrl(directusUrl, product.photo_url, {
      width: 600,
      height: 500,
      quality: 90,
      format: 'webp'
    }))
  }

  if (product.all_photos && product.all_photos[0]) {
    product.all_photos.forEach((photoItem) => {
      if (
        photoItem.directus_files_id &&
        photoItem.directus_files_id !== product.photo_url
      ) {
        images.push(buildOptimizedAssetUrl(directusUrl, photoItem.directus_files_id, {
          width: 600,
          height: 500,
          quality: 90,
          format: 'webp'
        }))
      }
    })
  }

  return images
}

export const formatPrice = (price: number): string => {
  return Math.floor(price || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
