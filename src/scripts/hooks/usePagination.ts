import { useEffect, useMemo, useState } from 'react'

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [items])

  const pageCount = Math.ceil(items.length / itemsPerPage)

  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return items.slice(start, start + itemsPerPage)
  }, [items, page, itemsPerPage])

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return
    setPage(newPage)
  }

  const fullPageItems = [
    ...currentItems,
    ...Array.from({
      length: Math.max(0, itemsPerPage - currentItems.length),
    }).map(
      () =>
        ({
          name: '',
          price: '',
          currency: '',
          url: '',
          isPlaceholder: true,
        }) as unknown as T & { isPlaceholder: boolean }
    ),
  ]

  return { page, pageCount, changePage, fullPageItems }
}
