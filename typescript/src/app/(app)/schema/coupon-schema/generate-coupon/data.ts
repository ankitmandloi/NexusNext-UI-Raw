// data.ts

export type GeneratedCoupon = {
  id: string
  profile: string
  productType: string
  product: string
  category: string
  quantity: number
}

export const initialGeneratedCoupons: GeneratedCoupon[] = [
  {
    id: 'GC-001',
    profile: 'Default Profile',
    productType: 'Product',
    product: 'Shoes',
    category: 'Fashion',
    quantity: 100,
  },
  {
    id: 'GC-002',
    profile: 'Default Profile',
    productType: 'Category',
    product: 'Electronics',
    category: 'Gadgets',
    quantity: 50,
  },
  {
    id: 'GC-003',
    profile: 'Festival Profile',
    productType: 'Product',
    product: 'T-Shirts',
    category: 'Clothing',
    quantity: 200,
  },
]
