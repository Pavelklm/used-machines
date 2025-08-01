// components/product/Breadcrumbs/Breadcrumbs.tsx
import {
  Box,
  Link,
  Breadcrumbs as MUIBreadcrumbs,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { triggerScrollToCatalog } from '@/context/slices/scrollSlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
import './style.css'

interface BreadcrumbsProps {
  productName?: string
}

export const Breadcrumbs = ({ productName }: BreadcrumbsProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleHomeClick = (event: React.MouseEvent) => {
    event.preventDefault()
    navigate('/')
  }

  const handleCatalogClick = (event: React.MouseEvent) => {
    event.preventDefault()
    navigate('/')
    dispatch(triggerScrollToCatalog())
  }

  return (
    <Box sx={{ mb: 3 }}>
      <MUIBreadcrumbs
        separator={
          <img
            className='breadcrumbs__arrow'
            loading='lazy'
            draggable='false'
            src={'/icons/arrow.svg'}
            alt='arrow'
          />
        }
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: 'var(--blue-color)',
            margin: '0',
          },
        }}
      >
        <Link
          component='button'
          variant='body2'
          onClick={handleHomeClick}
          sx={{
            color: 'var(--blue-color)',
            textDecoration: 'none',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '19px',
            '&:hover': {
              color: 'var(--main-color)',
            },
          }}
        >
          Головна
        </Link>
        <Link
          component='button'
          variant='body2'
          onClick={handleCatalogClick}
          sx={{
            color: 'var(--blue-color)',
            textDecoration: 'none',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '19px',
            '&:hover': {
              color: 'var(--main-color)',
            },
          }}
        >
          Каталог
        </Link>

        {productName && (
          <Typography
            variant='body2'
            sx={{
              color: 'var(--main-color)',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '19px',
            }}
          >
            {productName}
          </Typography>
        )}
      </MUIBreadcrumbs>
    </Box>
  )
}
