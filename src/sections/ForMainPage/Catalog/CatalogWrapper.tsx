import { loadProducts } from '@/api/loadProducts'
import { resetScrollToCatalog } from '@/context/slices/scrollSlice'
import { RootState } from '@/context/store'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Catalog } from './Catalog'

export function CatalogWrapper() {
  const catalogRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  
  const { products, loading } = useSelector((state: RootState) => state.products)
  const scrollToCatalog = useSelector(
    (state: RootState) => state.scroll.scrollToCatalog
  )

  // Загружаем продукты здесь, только один раз
  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(loadProducts() as any)
    }
  }, []) // Пустой массив зависимостей - выполняется только один раз!

  useEffect(() => {
    if (scrollToCatalog && catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      dispatch(resetScrollToCatalog())
    }
  }, [scrollToCatalog, dispatch])

  return <Catalog catalogRef={catalogRef} />
}
