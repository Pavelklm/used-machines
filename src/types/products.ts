export interface BrandInfo {
  brand_name: string
  brand__image: string
}

export type Product = {
  all_photos: [
    {
      directus_files_id: string
      id: string | number
      products_id: string | number
    },
  ]
  teaser: string
  description: string
  id: string | number
  price: number
  photo_url: string
  product_name: string
  currency_name?: {
    currency_name: string
  }
  brands_names: BrandInfo

  categories_names: {
    categorie_name: string
  }
  equipments_names: {
    equipment_name: string
  }
}
