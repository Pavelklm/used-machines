import { Product } from '@/types/products'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

interface CharacteristicsProps {
  product: Product
}

export const Characteristics = ({ product }: CharacteristicsProps) => {
  if (!product.characteristics || !product.characteristics[0]) return null

  const items = [
    { key: 'Бренд', value: product.brands_names.brand_name },
    { key: 'Категорія', value: product.categories_names.categorie_name },
    { key: 'Обладнання', value: product.equipments_names.equipment_name },
    ...product.characteristics.map((item) => ({
      key: item.characteristic,
      value: item.value,
    })),
  ]

  return (
    <>
      {items.map(({ key, value }) => (
        <Box
          key={key}
          sx={{
            display: 'flex',
            alignItems: {
              xl: 'flex-end',
              lg: 'flex-end',
              md: 'flex-end',
              sm: 'flex-end',
              xs: 'flex-start',
            },
            mb: '20px',
            gap: { xl: '10px', lg: '10px', md: '10px', sm: '10px', xs: '0' },
            flexDirection: {
              xl: 'row',
              lg: 'row',
              md: 'row',
              sm: 'row',
              xs: 'column',
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '19px',
              color: 'var(--main-color)',
              minWidth: 'fit-content',
            }}
            variant='body1'
          >
            {key}
          </Typography>

          <Box
            sx={{
              height: 0,
              border: '1px solid rgb(178, 200, 227)',
              flexGrow: 1,
            }}
          />

          <Chip
            label={value}
            sx={{
              justifyContent: {
                xl: 'flex-start',
                lg: 'flex-start',
                md: 'flex-start',
                sm: 'flex-end',
                xs: 'flex-end',
              },
              alignItems: 'flex-end',
              color: '#000',
              backgroundColor: '#fff',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '19px',
              height: {
                xl: '36px',
                lg: '36px',
                md: '36px',
                sm: 'auto',
                xs: 'auto',
              },
              borderRadius: '18px',
              width: {
                xl: '350px',
                lg: '350px',
                md: '350px',
                sm: 'auto',
                xs: 'auto',
              },
              flexShrink: 0,
              '& .MuiChip-label': {
                paddingLeft: 0,
                paddingRight: 0,
              },
            }}
          />
        </Box>
      ))}
    </>
  )
}
