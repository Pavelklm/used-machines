import { BrandInfo, Product } from '@/types/products'
import { useCallback, useMemo } from 'react'
import { useProductsQuery } from './useProductsQuery'
const buildAssetUrl = (baseUrl: string, assetPath: string, options?: {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif'
}) => {
  if (!assetPath) return ''
  
  const url = `${baseUrl}assets/${assetPath}`
  
  // Добавляем параметры оптимизации для Directus изображений
  if (options && (options.width || options.height || options.quality || options.format)) {
    const params = new URLSearchParams()
    
    if (options.width) params.set('width', options.width.toString())
    if (options.height) params.set('height', options.height.toString())
    if (options.quality) params.set('quality', options.quality.toString())
    if (options.format) params.set('format', options.format)
    params.set('fit', 'cover')
    
    return `${url}?${params.toString()}`
  }
  
  return url
}

export const useProducts = () => {
  const { data: products = [], isLoading, error } = useProductsQuery()

  const directusUrl = import.meta.env.VITE_API_BASE_URL

  const allBrands = useMemo(() => {
    const seen = new Set<string>()
    const uniqueBrands: BrandInfo[] = []

    products.forEach((product: Product) => {
      const brand = product.brands_names
      if (!brand?.brand_name) return

      if (!seen.has(brand.brand_name)) {
        seen.add(brand.brand_name)
        uniqueBrands.push({
          brand_name: brand.brand_name,
          brand__image: buildAssetUrl(directusUrl, brand.brand__image, {
            width: 60,
            height: 60,
            quality: 85,
            format: 'webp'
          }),
        })
      }
    })

    return uniqueBrands
  }, [products, directusUrl])

  const productsArray = useMemo(() => {
    const uniqueProducts = products.reduce(
      (acc, product) => {
        if (!acc[product.product_name]) {
          acc[product.product_name] = {
            id: product.id,
            product_name: product.product_name,
            price: product.price,
            currency: product.currency_name?.currency_name,
            url: buildAssetUrl(directusUrl, product.photo_url, {
              width: 289,
              height: 220,
              quality: 85,
              format: 'webp'
            }),
            brand_name: product.brands_names?.brand_name,
            brand_image: product.brands_names?.brand__image
              ? buildAssetUrl(directusUrl, product.brands_names.brand__image, {
                  width: 30,
                  height: 30,
                  quality: 85,
                  format: 'webp'
                })
              : null,
          }
        }
        return acc
      },
      {} as Record<string, any>
    )

    return Object.values(uniqueProducts)
  }, [products, directusUrl])

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.categories_names?.categorie_name))
    ).filter(Boolean) as string[]
  }, [products])

  const filterOptionsByGroup = useMemo(() => {
    const categoryMap = categories.reduce(
      (acc, category) => {
        const equipmentsForCategory = products
          .filter((item) => item.categories_names?.categorie_name === category)
          .map((item) => item.equipments_names?.equipment_name)

        acc[category] = Array.from(
          new Set(equipmentsForCategory.filter(Boolean) as string[])
        )
        return acc
      },
      {} as Record<string, string[]>
    )

    return {
      Виробники: Array.from(
        new Set(
          products
            .map((item) => item.brands_names?.brand_name)
            .filter(Boolean) as string[]
        )
      ),
      ...categoryMap,
    }
  }, [products, categories]) as Record<string, string[]>

  const getFilteredProducts = useCallback(
    (name: string) => {
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
          url: buildAssetUrl(directusUrl, product.photo_url, {
            width: 289,
            height: 220,
            quality: 85,
            format: 'webp'
          }),
          equipment_name: product.equipments_names?.equipment_name,
          brand_name: product.brands_names?.brand_name,
          brand_image: product.brands_names?.brand__image
            ? buildAssetUrl(directusUrl, product.brands_names.brand__image, {
                width: 30,
                height: 30,
                quality: 85,
                format: 'webp'
              })
            : null,
          category: product.categories_names?.categorie_name,
        }))
    },
    [products, directusUrl]
  )

  // Мемоизируем и эту функцию
  const getCategoryFromEquipment = useCallback(
    (equipment: string) => {
      const category = Object.keys(filterOptionsByGroup).find((key) =>
        filterOptionsByGroup[key].includes(equipment)
      )
      return category
    },
    [filterOptionsByGroup]
  )

  return {
    productsArray,
    filterOptionsByGroup,
    getFilteredProducts,
    allBrands,
    getCategoryFromEquipment,
    isLoading,
    error,
  }
}
