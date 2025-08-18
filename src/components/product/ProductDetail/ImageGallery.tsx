import { Box } from '@mui/material'
import { useState } from 'react'
import { ImageModal } from './components/ImageGallery/ImageModal'
import { MainImageDisplay } from './components/ImageGallery/MainImageDisplay'
import { ThumbnailNavigation } from './components/ImageGallery/ThumbnailNavigation'
import { GALLERY_SETTINGS } from './components/ImageGallery/constants'

interface ImageGalleryProps {
  images: string[]
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  directusUrl: string
  productName: string
  brandName: string
}

export const ImageGallery = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  directusUrl,
  productName,
  brandName,
}: ImageGalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const hasMultipleImages = images.length > 1

  const getThumbnailRange = () => {
    const { MAX_VISIBLE_THUMBNAILS } = GALLERY_SETTINGS

    if (images.length <= MAX_VISIBLE_THUMBNAILS) {
      return {
        start: 0,
        end: images.length,
        indices: Array.from({ length: images.length }, (_, i) => i),
      }
    }

    const halfVisible = Math.floor(MAX_VISIBLE_THUMBNAILS / 2)
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
  }

  const { indices: visibleIndices } = getThumbnailRange()
  const visibleThumbnails = visibleIndices.map((index) => ({
    image: images[index],
    index,
  }))

  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      {hasMultipleImages && (
        <ThumbnailNavigation
          images={images}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          directusUrl={directusUrl}
          productName={productName}
          maxVisibleThumbnails={GALLERY_SETTINGS.MAX_VISIBLE_THUMBNAILS}
        />
      )}

      <MainImageDisplay
        image={images[currentImageIndex] || images[0]}
        directusUrl={directusUrl}
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
        directusUrl={directusUrl}
        productName={productName}
        hasMultipleImages={hasMultipleImages}
        visibleThumbnails={visibleThumbnails}
      />
    </Box>
  )
}
