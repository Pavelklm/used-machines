import dotenv from 'dotenv'
import { resolve } from 'path'

// Загружаем .env
dotenv.config({ path: resolve(process.cwd(), '.env') })

const BASE_URL = 'https://secondtech.com.ua'
const API_BASE_URL = process.env.VITE_API_BASE_URL
const API_TOKEN = process.env.VITE_API_TOKEN

/**
 * Получаем все товары из Directus
 */
async function fetchAllProducts() {
  const filter = JSON.stringify({ status: { _eq: 'published' } })
  const encodedFilter = encodeURIComponent(filter)
  // Убрал date_updated - на это поле нет прав у токена
  const url = `${API_BASE_URL}items/products?fields=id&filter=${encodedFilter}&limit=-1`

  console.log('🔍 API URL:', url)
  console.log('🔑 Token:', API_TOKEN ? 'присутствует' : 'отсутствует')

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API Error:', response.status, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Ошибка загрузки товаров для sitemap:', error)
    return []
  }
}

/**
 * Генерируем все URL для sitemap
 */
export async function generateSitemapRoutes() {
  console.log('🔄 Генерация sitemap...')

  // Статические страницы
  const staticPages = [
    {
      url: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      url: '/policy',
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
  ]

  // Динамические страницы товаров
  const products = await fetchAllProducts()
  console.log(`✅ Найдено товаров: ${products.length}`)

  const productPages = products.map((product) => ({
    url: `/product/${product.id}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString(), // Используем текущую дату для всех
  }))

  const allRoutes = [...staticPages, ...productPages]
  console.log(`✅ Всего страниц в sitemap: ${allRoutes.length}`)

  return allRoutes
}

/**
 * Конфигурация для vite-plugin-sitemap
 */
export default async function getSitemapConfig() {
  const routes = await generateSitemapRoutes()

  return {
    hostname: BASE_URL,
    dynamicRoutes: routes.map((route) => route.url),
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString(),
    readable: true, // Красивый XML для людей
  }
}
