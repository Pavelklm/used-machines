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
  productName: string
  maxVisibleThumbnails?: number
}

export const ThumbnailNavigation = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
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
        alignItems: 'center',
        width: { xl: 'auto', lg: 'auto', md: 'auto', sm: '100%', xs: '100%' },
        height: {
          xl: '400px',
          lg: '400px',
          md: '400px',
          sm: '100%',
          xs: '100%',
        },
        justifyContent: 'space-between',
        flexDirection: {
          md: 'column',
          sm: 'row',
          xs: 'row',
          lg: 'column',
          xl: 'column',
        },
      }}
    >
      <Box
        sx={{
          mb: { md: 1, sm: '0', xs: '0', lg: 1, xl: 1 },
          mr: { md: 0, sm: '10px', xs: '10px', lg: 0, xl: 0 },
        }}
      >
        <NavigationButton onClick={handlePrevious}>
          <KeyboardArrowUpIcon
            sx={{
              color: 'var(--main-color)',
              fontSize: '24px',
              transform: {
                md: 'rotate(0deg)',
                sm: 'rotate(270deg)',
                xs: 'rotate(270deg)',
                lg: 'rotate(0deg)',
                xl: 'rotate(0deg)',
              },
            }}
          />
        </NavigationButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          height: '100%',
          gap: { md: '14px', sm: '14px', xs: '5px', lg: '14px', xl: '14px' },
          justifyContent: 'center',
          flexDirection: {
            md: 'column',
            sm: 'row',
            xs: 'row',
            lg: 'column',
            xl: 'column',
          },
        }}
      >
        {visibleThumbnails.map((thumbnail, index) => (
          <ThumbnailItem
            key={thumbnail.index}
            image={thumbnail.image}
            index={thumbnail.index}
            isActive={currentImageIndex === thumbnail.index}
            productName={productName}
            onClick={setCurrentImageIndex}
            animationDelay={index * 0.05}
          />
        ))}
      </Box>

      <Box
        sx={{
          mt: { md: 1, sm: '0', xs: '0', lg: 1, xl: 1 },
          ml: { md: 0, sm: '10px', xs: '10px', lg: 0, xl: 0 },
        }}
      >
        <NavigationButton onClick={handleNext}>
          <KeyboardArrowDownIcon
            sx={{
              color: 'var(--main-color)',
              fontSize: '24px',
              transform: {
                md: 'rotate(0deg)',
                sm: 'rotate(270deg)',
                xs: 'rotate(270deg)',
                lg: 'rotate(0deg)',
                xl: 'rotate(0deg)',
              },
            }}
          />
        </NavigationButton>
      </Box>
    </Box>
  )
}
