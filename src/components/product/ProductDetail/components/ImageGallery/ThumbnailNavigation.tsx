import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Card, CardMedia, IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import { NAVIGATION_BUTTON_STYLES } from './constants'

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
  const getThumbnailRange = () => {
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
  }

  const { indices: visibleIndices } = getThumbnailRange()
  const visibleThumbnails = visibleIndices.map((index) => ({
    image: images[index],
    index,
  }))

  const handlePrevious = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    )
  }

  const buttonHoverAnimation = { translateY: '-2px' }

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
      <IconButton
        onClick={handlePrevious}
        sx={{ ...NAVIGATION_BUTTON_STYLES, mb: 1 }}
        component={motion.button}
        whileHover={buttonHoverAnimation}
      >
        <KeyboardArrowUpIcon
          sx={{
            color: 'var(--main-color)',
            fontSize: '24px',
          }}
        />
      </IconButton>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: '14px',
          justifyContent: 'center',
        }}
      >
        {visibleThumbnails.map((thumbnail, index) => {
          const actualIndex = thumbnail.index
          const isActive = currentImageIndex === actualIndex

          return (
            <motion.div
              key={actualIndex}
              whileHover={buttonHoverAnimation}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card
                onClick={() => setCurrentImageIndex(actualIndex)}
                sx={{
                  width: '83px',
                  height: '83px',
                  cursor: 'pointer',
                  border: isActive
                    ? '2px solid var(--blue-bright-color)'
                    : 'none',
                  position: 'relative',
                  boxShadow: 'none',
                  '&::before': !isActive
                    ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#04022966',
                        zIndex: 1,
                      }
                    : {},
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'var(--blue-bright1-color)',
                    transform: 'translateY(-2px)',
                    background: 'transparent',
                  },
                }}
              >
                <CardMedia
                  component='img'
                  image={`${directusUrl}assets/${thumbnail.image}`}
                  alt={`${productName} - зображення ${actualIndex + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: '#f5f5f5',
                  }}
                />
              </Card>
            </motion.div>
          )
        })}
      </Box>

      <IconButton
        onClick={handleNext}
        sx={NAVIGATION_BUTTON_STYLES}
        component={motion.button}
        whileHover={buttonHoverAnimation}
      >
        <KeyboardArrowDownIcon
          sx={{
            color: 'var(--main-color)',
            fontSize: '24px',
          }}
        />
      </IconButton>
    </Box>
  )
}
