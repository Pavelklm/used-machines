import Box from '@mui/material/Box'
import { useState } from 'react'
import { ImageModal } from './components/ImageGallery/ImageModal'
import { MainImageDisplay } from './components/ImageGallery/MainImageDisplay'
import { ThumbnailNavigation } from './components/ImageGallery/ThumbnailNavigation'
import { GALLERY_SETTINGS } from './components/ImageGallery/constants'
import { useImageNavigation } from './hooks/useImageNavigation'

interface ImageGalleryProps {
  images: string[]
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  productName: string
  brandName: string
}

export const ImageGallery = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  productName,
  brandName,
}: ImageGalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const hasMultipleImages = images.length > 1

  const { visibleThumbnails } = useImageNavigation(
    images,
    currentImageIndex,
    setCurrentImageIndex,
    { maxVisibleThumbnails: GALLERY_SETTINGS.MAX_VISIBLE_THUMBNAILS }
  )

  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      {hasMultipleImages && (
        <ThumbnailNavigation
          images={images}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          productName={productName}
          maxVisibleThumbnails={GALLERY_SETTINGS.MAX_VISIBLE_THUMBNAILS}
        />
      )}

      <MainImageDisplay
        image={images[currentImageIndex] || images[0]}
        productName={productName}
        brandName={brandName}
        onZoomClick={() => setIsModalOpen(true)}
      />

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        productName={productName}
        hasMultipleImages={hasMultipleImages}
        visibleThumbnails={visibleThumbnails}
      />
    </Box>
  )
}