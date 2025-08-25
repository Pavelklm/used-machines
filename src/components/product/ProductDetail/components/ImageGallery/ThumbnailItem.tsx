import { Card, CardMedia } from '@mui/material'
import { motion } from 'framer-motion'

interface ThumbnailItemProps {
  image: string
  index: number
  isActive: boolean
  productName: string
  onClick: (index: number) => void
  size?: number
  borderRadius?: number
  borderWidth?: number
  hoverTranslate?: number
  animationDelay?: number
}

export const ThumbnailItem = ({
  image,
  index,
  isActive,
  productName,
  onClick,
  size = 83,
  borderRadius = 10,
  borderWidth = 2,
  hoverTranslate = 2,
  animationDelay = 0,
}: ThumbnailItemProps) => {
  const hoverAnimation = { translateY: `-${hoverTranslate}px` }

  return (
    <motion.div
      whileHover={hoverAnimation}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: animationDelay }}
    >
      <Card
        onClick={() => onClick(index)}
        sx={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: 'pointer',
          border: isActive
            ? `${borderWidth}px solid var(--blue-bright-color)`
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
                borderRadius: `${borderRadius}px`,
              }
            : {},
          borderRadius: `${borderRadius}px`,
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'var(--blue-bright1-color)',
            transform: `translateY(-${hoverTranslate}px)`,
            background: 'transparent',
          },
        }}
      >
        <CardMedia
          component='img'
          image={image}
          alt={`${productName} - зображення ${index + 1}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: '#f5f5f5',
          }}
        />
      </Card>
    </motion.div>
  )
}
