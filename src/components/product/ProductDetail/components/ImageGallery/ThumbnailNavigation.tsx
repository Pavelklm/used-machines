import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box } from '@mui/material'
import { useImageNavigation } from '../../hooks/useImageNavigation'
import { NavigationButton } from './NavigationButton'
import { ThumbnailItem } from './ThumbnailItem'

interface ThumbnailNavigationProps {
  images: string[]
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  directusUrl: string
  productName: string
  maxVisibleThumbnails?: number
}

export const ThumbnailNavigation = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  directusUrl,
  productName,
  maxVisibleThumbnails = 3,
}: ThumbnailNavigationProps) => {
  const { handlePrevious, handleNext, visibleThumbnails } = useImageNavigation(
    images,
    currentImageIndex,
    setCurrentImageIndex,
    { maxVisibleThumbnails }
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80px',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ mb: 1 }}>
        <NavigationButton onClick={handlePrevious}>
          <KeyboardArrowUpIcon
            sx={{
              color: 'var(--main-color)',
              fontSize: '24px',
            }}
          />
        </NavigationButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: '14px',
          justifyContent: 'center',
        }}
      >
        {visibleThumbnails.map((thumbnail, index) => (
          <ThumbnailItem
            key={thumbnail.index}
            image={thumbnail.image}
            index={thumbnail.index}
            isActive={currentImageIndex === thumbnail.index}
            directusUrl={directusUrl}
            productName={productName}
            onClick={setCurrentImageIndex}
            animationDelay={index * 0.05}
          />
        ))}
      </Box>

      <Box sx={{ mt: 1 }}>
        <NavigationButton onClick={handleNext}>
          <KeyboardArrowDownIcon
            sx={{
              color: 'var(--main-color)',
              fontSize: '24px',
            }}
          />
        </NavigationButton>
      </Box>
    </Box>
  )
}