import { fetchBrands, fetchProductById, fetchProducts } from '@/api/cards'
import { Product } from '@/types/products'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useProductsQuery = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  })
}

export const useProductQuery = (id: string) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    initialData: () => {
      const productsData = queryClient.getQueryData(['products']) as Product[]
      return productsData?.find((product) => product.id === id)
    },
  })
}
