export type RewardProduct = {
  id: string
  name: string
  baseCategory: string
  code: string
  hsn: string
  basePrice: string
  listPrice: string
  mrp: string
  tax: string
  points: string
  details: string
  image: string
  rewardType: string
}

export type RewardBaseCategory = {
  id: string
  name: string
  slug: string
  primaryCategoryId: string
  primaryCategoryName: string
  image: string
  products: RewardProduct[]
}

export type RewardPrimaryCategory = {
  id: string
  name: string
  slug: string
  image: string
  baseCategories: RewardBaseCategory[]
}

export const REWARD_TYPE_OPTIONS = [
  { id: 'paytm-voucher', name: 'Paytm Voucher' },
  { id: 'gift', name: 'Gift' },
  { id: 'bank', name: 'Bank' },
  { id: 'cashback', name: 'Cashback' },
  { id: 'discount-coupon', name: 'Discount Coupon' },
]

const DUMMY_PRODUCTS: RewardProduct[] = [
  {
    id: 'RP-001',
    name: 'Paytm Gift Card ₹500',
    baseCategory: 'Digital Vouchers',
    code: 'PGC500',
    hsn: '998599',
    basePrice: '450',
    listPrice: '475',
    mrp: '500',
    tax: '18',
    points: '500',
    details: 'Paytm gift card worth ₹500, can be used for various transactions',
    image: '/rewards/paytm-card.jpg',
    rewardType: 'Paytm Voucher',
  },
  {
    id: 'RP-002',
    name: 'Amazon Gift Voucher ₹1000',
    baseCategory: 'Digital Vouchers',
    code: 'AGV1000',
    hsn: '998599',
    basePrice: '950',
    listPrice: '975',
    mrp: '1000',
    tax: '18',
    points: '1000',
    details: 'Amazon gift voucher worth ₹1000 for online shopping',
    image: '/rewards/amazon-voucher.jpg',
    rewardType: 'Gift',
  },
  {
    id: 'RP-003',
    name: 'Flipkart E-Gift Card ₹750',
    baseCategory: 'Digital Vouchers',
    code: 'FGC750',
    hsn: '998599',
    basePrice: '700',
    listPrice: '725',
    mrp: '750',
    tax: '18',
    points: '750',
    details: 'Flipkart e-gift card for shopping electronics and more',
    image: '/rewards/flipkart-card.jpg',
    rewardType: 'Gift',
  },
  {
    id: 'RP-004',
    name: 'Direct Bank Transfer',
    baseCategory: 'Cash Rewards',
    code: 'DBT500',
    hsn: '997159',
    basePrice: '500',
    listPrice: '500',
    mrp: '500',
    tax: '0',
    points: '500',
    details: 'Direct bank transfer of ₹500 to customer account',
    image: '/rewards/bank-transfer.jpg',
    rewardType: 'Bank',
  },
  {
    id: 'RP-005',
    name: 'Bluetooth Headphones',
    baseCategory: 'Electronics',
    code: 'BTH150',
    hsn: '851830',
    basePrice: '1200',
    listPrice: '1400',
    mrp: '1500',
    tax: '18',
    points: '1500',
    details: 'Premium wireless Bluetooth headphones with noise cancellation',
    image: '/rewards/headphones.jpg',
    rewardType: 'Gift',
  },
  {
    id: 'RP-006',
    name: 'Smart Watch',
    baseCategory: 'Electronics',
    code: 'SW250',
    hsn: '851770',
    basePrice: '2000',
    listPrice: '2400',
    mrp: '2500',
    tax: '18',
    points: '2500',
    details: 'Fitness tracking smart watch with heart rate monitor',
    image: '/rewards/smartwatch.jpg',
    rewardType: 'Gift',
  },
  {
    id: 'RP-007',
    name: 'Premium Tea Gift Set',
    baseCategory: 'Food & Beverages',
    code: 'PTGS100',
    hsn: '090230',
    basePrice: '800',
    listPrice: '950',
    mrp: '1000',
    tax: '5',
    points: '1000',
    details: 'Assorted premium tea collection in elegant gift packaging',
    image: '/rewards/tea-set.jpg',
    rewardType: 'Gift',
  },
  {
    id: 'RP-008',
    name: 'Cashback Offer 10%',
    baseCategory: 'Cash Rewards',
    code: 'CB10',
    hsn: '997159',
    basePrice: '100',
    listPrice: '100',
    mrp: '100',
    tax: '0',
    points: '100',
    details: '10% cashback on next purchase, maximum ₹100',
    image: '/rewards/cashback.jpg',
    rewardType: 'Cashback',
  },
]

export const rewardHierarchy: RewardPrimaryCategory[] = [
  {
    id: 'RPC-001',
    name: 'Digital Rewards',
    slug: 'digital-rewards',
    image: '/rewards/digital-category.jpg',
    baseCategories: [
      {
        id: 'RBC-001',
        name: 'Digital Vouchers',
        slug: 'digital-vouchers',
        primaryCategoryId: 'RPC-001',
        primaryCategoryName: 'Digital Rewards',
        image: '/rewards/vouchers.jpg',
        products: DUMMY_PRODUCTS.filter((p) => p.baseCategory === 'Digital Vouchers'),
      },
      {
        id: 'RBC-002',
        name: 'Cash Rewards',
        slug: 'cash-rewards',
        primaryCategoryId: 'RPC-001',
        primaryCategoryName: 'Digital Rewards',
        image: '/rewards/cash.jpg',
        products: DUMMY_PRODUCTS.filter((p) => p.baseCategory === 'Cash Rewards'),
      },
    ],
  },
  {
    id: 'RPC-002',
    name: 'Physical Rewards',
    slug: 'physical-rewards',
    image: '/rewards/physical-category.jpg',
    baseCategories: [
      {
        id: 'RBC-003',
        name: 'Electronics',
        slug: 'electronics',
        primaryCategoryId: 'RPC-002',
        primaryCategoryName: 'Physical Rewards',
        image: '/rewards/electronics.jpg',
        products: DUMMY_PRODUCTS.filter((p) => p.baseCategory === 'Electronics'),
      },
      {
        id: 'RBC-004',
        name: 'Food & Beverages',
        slug: 'food-and-beverages',
        primaryCategoryId: 'RPC-002',
        primaryCategoryName: 'Physical Rewards',
        image: '/rewards/food.jpg',
        products: DUMMY_PRODUCTS.filter((p) => p.baseCategory === 'Food & Beverages'),
      },
    ],
  },
  {
    id: 'RPC-003',
    name: 'Experience Rewards',
    slug: 'experience-rewards',
    image: '/rewards/experience-category.jpg',
    baseCategories: [],
  },
]

export function slugifyLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
