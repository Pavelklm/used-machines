import ZoomInIcon from '@mui/icons-material/ZoomIn'
import { Box, Card, CardMedia } from '@mui/material'
import { motion } from 'framer-motion'
import { MAIN_IMAGE_STYLES } from './constants'

interface MainImageDisplayProps {
  image: string
  directusUrl: string
  productName: string
  brandName: string
  onZoomClick: () => void
}

export const MainImageDisplay = ({
  image,
  directusUrl,
  productName,
  brandName,
  onZoomClick,
}: MainImageDisplayProps) => {
  return (
    <Box
      sx={{
        width: '600px',
        height: '500px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Card sx={MAIN_IMAGE_STYLES} onClick={onZoomClick}>
          <CardMedia
            component='img'
            image={image}
            alt={`${productName} від ${brandName} - професійне м'ясопереробне обладнання`}
            loading='lazy'
            className='main-image'
            sx={{
              maxWidth: '600px',
              maxHeight: '500px',
              minWidth: '500px',
              minHeight: '400px',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              transition: 'transform 0.3s ease',
            }}
          />

          <Box
            className='zoom-icon'
            sx={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: '50%',
              padding: '8px',
              color: 'white',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ZoomInIcon sx={{ fontSize: '20px' }} />
          </Box>
        </Card>
      </motion.div>
    </Box>
  )
}
