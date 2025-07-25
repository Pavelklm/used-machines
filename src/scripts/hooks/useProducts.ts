import { loadProducts } from '@/api/loadProducts'
import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'

export const useProducts = () => {
  const products = useAppSelector((state) => state.products.products)
  const dispatch = useAppDispatch()

  const PHOTO_URL = import.meta.env.VITE_API_PHOTO_URL

  const productsArray = useMemo(() => {
    const map = new Map()
    products.forEach((product) => {
      if (!map.has(product.product_name)) {
        map.set(product.product_name, {
          id: product.id,
          product_name: product.product_name,
          price: product.price,
          currency: product.currency_name?.currency_name,
          url: `${PHOTO_URL}/${product.photo_url}`,
        })
      }
    })
    return Array.from(map.values())
  }, [products, PHOTO_URL])

  useEffect(() => {
    dispatch(loadProducts())
  }, [dispatch])

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.categories_names?.categorie_name))
    ).filter(Boolean) as string[]
  }, [products])

  const uniqueStrings = (arr: (string | undefined | null)[]) =>
    Array.from(new Set(arr.filter(Boolean) as string[]))

  const filterOptionsByGroup = useMemo(() => {
    const categoryMap = categories.reduce(
      (acc, category) => {
        const equipmentsForCategory = products
          .filter((item) => item.categories_names?.categorie_name === category)
          .map((item) => item.equipments_names?.equipment_name)

        acc[category] = uniqueStrings(equipmentsForCategory)
        return acc
      },
      {} as Record<string, string[]>
    )

    return {
      Виробники: uniqueStrings(
        products.map((item) => item.brands_names?.brand_name)
      ),
      ...categoryMap,
    }
  }, [products, categories])

  const getFilteredProducts = (name: string) => {
    return products
      .filter(
        (product) =>
          product.equipments_names?.equipment_name === name ||
          product.brands_names?.brand_name === name
      )
      .map((product) => ({
        id: product.id,
        currency: product.currency_name?.currency_name,
        price: product.price,
        product_name: product.product_name,
        url: `${PHOTO_URL}/${product.photo_url}`,
        equipment_name: product.equipments_names?.equipment_name,
        brand: product.brands_names?.brand_name,
        category: product.categories_names?.categorie_name,
      }))
  }

  return {
    productsArray,
    filterOptionsByGroup,
    getFilteredProducts,
  }
}
