import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

export default function Cards() {
  return (
    <Card
      sx={{
        maxWidth: 289,
        cursor: 'pointer',
        borderRadius: '10px',
        boxShadow: '0 0 0 1px var(--blue-light-color)',
        filter: 'brightness(1)',
        transform: 'translateY(0)',
        transition:
          'transform 0.4s ease, filter 0.4s ease, box-shadow 0.4s ease',
        '&:hover': {
          boxShadow: '0 0 0 1px var(--blue-bright-color)',
          transform: 'translateY(-4px)',
          filter: 'brightness(0.85)',
        },
      }}
    >
      <CardMedia
        component='img'
        height='289'
        image='src/assets/icons/cutter.png'
        alt='Cutter'
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography
          variant='body2'
          sx={{ fontSize: '18px', fontWeight: '400', lineHeight: '21px' }}
        >
          Куттер 20 л.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
          }}
        >
          <Typography
            variant='h6'
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '19px',
              color: 'var(--main-color)',
            }}
          >
            12 000 ₴
          </Typography>
          <ChevronRightIcon color='primary' />
        </Box>
      </CardContent>
    </Card>
  )
}
