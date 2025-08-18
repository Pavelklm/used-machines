import { Product } from '@/types/products'

export const getProductImages = (product: Product): string[] => {
  const images: string[] = []

  if (product.photo_url) {
    images.push(product.photo_url)
  }

  if (product.all_photos && product.all_photos[0]) {
    product.all_photos.forEach((photoItem) => {
      if (
        photoItem.directus_files_id &&
        photoItem.directus_files_id !== product.photo_url
      ) {
        images.push(photoItem.directus_files_id)
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
