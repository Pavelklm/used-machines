import { useCallback, useMemo } from 'react'
import { useProductsQuery } from './useProductsQuery'
import { useScreenSize } from './useScreenSize'

// ========================= CONSTANTS =========================

const IMAGE_QUALITY = 100
const IMAGE_FORMAT = 'webp' as const
const BRAND_IMAGE_SIZE = { width: 60, height: 60 }
const SMALL_BRAND_IMAGE_SIZE = { width: 30, height: 30 }

// ========================= TYPES =========================

interface ImageOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif'
}

interface ProcessedProduct {
  id: string | number
  product_name: string
  price: number
  currency: string | undefined
  url: string
  brand_name: string | undefined
  brand_image: string | null
}

interface FilteredProduct extends ProcessedProduct {
  equipment_name: string | undefined
  category: string | undefined
}

// Типизация для filterOptionsByGroup с индексной сигнатурой
interface FilterOptionsByGroup {
  Виробники: string[]
  [categoryName: string]: string[] // Индексная сигнатура
}

// ========================= UTILITIES =========================

const buildAssetUrl = (
  baseUrl: string,
  assetPath: string | null | undefined,
  options?: ImageOptions
): string => {
  if (!assetPath || !baseUrl) return ''

  const url = `${baseUrl}assets/${assetPath}`
  if (!options) return url

  const {
    width,
    height,
    quality = IMAGE_QUALITY,
    format = IMAGE_FORMAT,
  } = options
  if (!width && !height && !quality && !format) return url

  const searchParams = new URLSearchParams()

  if (width) searchParams.set('width', width.toString())
  if (height) searchParams.set('height', height.toString())
  if (quality) searchParams.set('quality', quality.toString())
  if (format) searchParams.set('format', format)
  searchParams.set('fit', 'cover')

  return `${url}?${searchParams.toString()}`
}

// Overloaded функция для правильной типизации
function createUniqueArray<T, K extends string | number>(
  items: T[],
  keySelector: (item: T) => K | undefined
): T[]

function createUniqueArray<T, K extends string | number, R>(
  items: T[],
  keySelector: (item: T) => K | undefined,
  mapper: (item: T) => R
): R[]

function createUniqueArray<T, K extends string | number, R>(
  items: T[],
  keySelector: (item: T) => K | undefined,
  mapper?: (item: T) => R
): (T | R)[] {
  const seen = new Set<K>()
  const result: (T | R)[] = []

  for (const item of items) {
    const key = keySelector(item)
    if (!key || seen.has(key)) continue

    seen.add(key)
    result.push(mapper ? mapper(item) : item)
  }

  return result
}

// ========================= MAIN HOOK =========================

export const useProducts = () => {
  const screenSize = useScreenSize()
  const { data: products = [], isLoading, error } = useProductsQuery()

  const directusUrl = import.meta.env.VITE_API_BASE_URL

  // Чистая функция для безопасных URL
  const safeUrl = useCallback(
    (path?: string | null, options?: ImageOptions): string | null => {
      return path ? buildAssetUrl(directusUrl, path, options) : null
    },
    [directusUrl]
  )

  // ========================= RESPONSIVE DIMENSIONS =========================

  // ========================= BRANDS =========================

  const allBrands = useMemo(
    () =>
      createUniqueArray(
        products,
        (product) => product.brands_names?.brand_name,
        (product) => ({
          brand_name: product.brands_names!.brand_name,
          brand__image: buildAssetUrl(
            directusUrl,
            product.brands_names?.brand__image,
            {
              ...BRAND_IMAGE_SIZE,
              quality: IMAGE_QUALITY,
              format: IMAGE_FORMAT,
            }
          ),
        })
      ),
    [products, directusUrl]
  )

  // ========================= PRODUCTS =========================

  const productsArray = useMemo(
    () =>
      createUniqueArray(
        products,
        (product) => product.product_name,
        (product) => ({
          id: product.id,
          product_name: product.product_name,
          price: product.price,
          currency: product.currency_name?.currency_name,
          url: buildAssetUrl(directusUrl, product.photo_url, {
            quality: IMAGE_QUALITY,
            format: IMAGE_FORMAT,
          }),
          brand_name: product.brands_names?.brand_name,
          brand_image: safeUrl(product.brands_names?.brand__image, {
            ...SMALL_BRAND_IMAGE_SIZE,
            quality: IMAGE_QUALITY,
            format: IMAGE_FORMAT,
          }),
        })
      ),
    [products, directusUrl, , safeUrl]
  )

  // ========================= CATEGORIES =========================

  const categories = useMemo(
    () =>
      createUniqueArray(
        products,
        (product) => product.categories_names?.categorie_name
      ).map((product) => product.categories_names!.categorie_name),
    [products]
  )

  // ========================= FILTER OPTIONS =========================

  const filterOptionsByGroup = useMemo(() => {
    const brands = createUniqueArray(
      products,
      (product) => product.brands_names?.brand_name
    ).map((product) => product.brands_names!.brand_name)

    // Отдельно оборудование по категориям
    const categoryToEquipments = categories.reduce(
      (acc, category) => {
        const equipments = createUniqueArray(
          products.filter(
            (product) => product.categories_names?.categorie_name === category
          ),
          (product) => product.equipments_names?.equipment_name
        ).map((product) => product.equipments_names!.equipment_name)

        acc[category] = equipments
        return acc
      },
      {} as Record<string, string[]>
    )

    return {
      Виробники: brands,
      ...categoryToEquipments,
    } as FilterOptionsByGroup // Явное приведение к типу с индексной сигнатурой
  }, [products, categories])

  // ========================= FILTER FUNCTIONS =========================

  const getFilteredProducts = useCallback(
    (filterName: string): FilteredProduct[] =>
      products
        .filter(
          (product) =>
            product.equipments_names?.equipment_name === filterName ||
            product.brands_names?.brand_name === filterName
        )
        .map((product) => ({
          id: product.id,
          currency: product.currency_name?.currency_name,
          price: product.price,
          product_name: product.product_name,
          url: buildAssetUrl(directusUrl, product.photo_url, {
            quality: IMAGE_QUALITY,
            format: IMAGE_FORMAT,
          }),
          equipment_name: product.equipments_names?.equipment_name,
          brand_name: product.brands_names?.brand_name,
          brand_image: safeUrl(product.brands_names?.brand__image, {
            ...SMALL_BRAND_IMAGE_SIZE,
            quality: IMAGE_QUALITY,
            format: IMAGE_FORMAT,
          }),
          category: product.categories_names?.categorie_name,
        })),
    [products, directusUrl, safeUrl]
  )

  // ========================= NAVIGATION HELPERS =========================

  // Универсальная функция: ищем группу/категорию для любого элемента
  const getCategoryFromEquipment = useCallback(
    (itemName: string): string | undefined =>
      Object.keys(filterOptionsByGroup).find((groupKey) =>
        filterOptionsByGroup[groupKey]?.includes(itemName)
      ),
    [filterOptionsByGroup]
  )

  // Семантические помощники для ясности кода
  const getGroupFromBrand = useCallback(
    (brandName: string): 'Виробники' | undefined => {
      const group = getCategoryFromEquipment(brandName)
      return group === 'Виробники' ? 'Виробники' : undefined
    },
    [getCategoryFromEquipment]
  )

  const getCategoryFromEquipmentOnly = useCallback(
    (equipmentName: string): string | undefined => {
      const category = getCategoryFromEquipment(equipmentName)
      return category !== 'Виробники' ? category : undefined
    },
    [getCategoryFromEquipment]
  )

  return {
    // Data
    productsArray,
    allBrands,
    filterOptionsByGroup,

    // Filter functions
    getFilteredProducts,

    // Navigation helpers
    getCategoryFromEquipment, // Универсальная (бренды + equipment)
    getGroupFromBrand, // Только для брендов
    getCategoryFromEquipmentOnly, // Только для equipment

    // State
    isLoading,
    error,
  } as const
}
