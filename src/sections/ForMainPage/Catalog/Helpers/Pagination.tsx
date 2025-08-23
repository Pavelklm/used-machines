import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import '../style.css'

type Props = {
  pageCount: number
  page?: number
  onChange?: (page: number) => void
}

export default function PaginationRounded({
  pageCount,
  page,
  onChange,
}: Props) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        shape='rounded'
        page={page}
        onChange={(_, value) => onChange?.(value)}
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'var(--main-color)!important',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid var(--blue-light-color) !important',
            borderRadius: '10px',
            margin: '5px',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'var(--blue-bright-color) !important',
              color: '#fff' + '!important',
            },
          },
          '& .MuiPaginationItem-previousNext[aria-label="Go to previous page"]':
            {
              marginRight: {
                xl: '50px',
                lg: '50px',
                md: '60px',
                sm: '60px',
                xs: '30px',
              },
            },
          '& .MuiPaginationItem-previousNext[aria-label="Go to next page"]': {
            marginLeft: {
              xl: '50px',
              lg: '50px',
              md: '60px',
              sm: '60px',
              xs: '30px',
            },
          },
          '& .Mui-selected': {
            backgroundColor: 'var(--main-color) !important',
            color: '#fff' + '!important',
            '&:hover': {
              backgroundColor: 'var(--main-color) !important',
              opacity: 0.5,
            },
          },
        }}
      />
    </Stack>
  )
}
