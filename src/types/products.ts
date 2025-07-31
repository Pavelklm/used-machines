export interface BrandInfo {
  brand_name: string
  brand__image: string
}

export type Product = {
  id: any
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
