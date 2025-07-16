import { Pagination, Stack } from '@mui/material'

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
      />
    </Stack>
  )
}
