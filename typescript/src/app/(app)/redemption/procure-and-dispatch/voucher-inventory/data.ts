export type VoucherInventory = {
  id: string
  product: string
  code: string
  purchaseDate: string
  expiryDate: string
  status: string
  referenceNumber?: string
  uploadedBy?: string
}

export const voucherInventoryData: VoucherInventory[] = [
  {
    id: 'VI-001',
    product: 'Amazon Gift Voucher ₹1000',
    code: 'AMZ1000-001',
    purchaseDate: '2025-01-15',
    expiryDate: '2026-01-15',
    status: 'Active',
    referenceNumber: 'REF-AMZ-2025-001',
    uploadedBy: 'Admin User',
  },
  {
    id: 'VI-002',
    product: 'Flipkart E-Gift Card ₹500',
    code: 'FKT500-002',
    purchaseDate: '2025-02-10',
    expiryDate: '2026-02-10',
    status: 'Active',
    referenceNumber: 'REF-FKT-2025-002',
    uploadedBy: 'Admin User',
  },
  {
    id: 'VI-003',
    product: 'Paytm Gift Card ₹250',
    code: 'PTM250-003',
    purchaseDate: '2025-03-05',
    expiryDate: '2025-12-31',
    status: 'Expired',
    referenceNumber: 'REF-PTM-2025-003',
    uploadedBy: 'Manager',
  },
  {
    id: 'VI-004',
    product: 'BookMyShow Voucher ₹300',
    code: 'BMS300-004',
    purchaseDate: '2025-06-20',
    expiryDate: '2026-06-20',
    status: 'Active',
    referenceNumber: 'REF-BMS-2025-004',
    uploadedBy: 'Admin User',
  },
  {
    id: 'VI-005',
    product: 'Google Play Gift Card ₹500',
    code: 'GPL500-005',
    purchaseDate: '2025-07-15',
    expiryDate: '2026-07-15',
    status: 'Active',
    referenceNumber: 'REF-GPL-2025-005',
    uploadedBy: 'Operator',
  },
  {
    id: 'VI-006',
    product: 'Myntra Gift Voucher ₹1000',
    code: 'MYN1000-006',
    purchaseDate: '2025-08-10',
    expiryDate: '2026-08-10',
    status: 'Used',
    referenceNumber: 'REF-MYN-2025-006',
    uploadedBy: 'Admin User',
  },
  {
    id: 'VI-007',
    product: 'Swiggy Food Voucher ₹200',
    code: 'SWG200-007',
    purchaseDate: '2025-09-25',
    expiryDate: '2026-09-25',
    status: 'Active',
    referenceNumber: 'REF-SWG-2025-007',
    uploadedBy: 'Manager',
  },
  {
    id: 'VI-008',
    product: 'Zomato Gift Card ₹300',
    code: 'ZMT300-008',
    purchaseDate: '2025-10-12',
    expiryDate: '2026-10-12',
    status: 'Active',
    referenceNumber: 'REF-ZMT-2025-008',
    uploadedBy: 'Admin User',
  },
]

export const STATUS_OPTIONS = [
  { id: 'active', name: 'Active' },
  { id: 'used', name: 'Used' },
  { id: 'expired', name: 'Expired' },
  { id: 'reserved', name: 'Reserved' },
]

export const PRODUCT_OPTIONS = [
  { id: 'amazon-1000', name: 'Amazon Gift Voucher ₹1000' },
  { id: 'flipkart-500', name: 'Flipkart E-Gift Card ₹500' },
  { id: 'paytm-250', name: 'Paytm Gift Card ₹250' },
  { id: 'bookmyshow-300', name: 'BookMyShow Voucher ₹300' },
  { id: 'googleplay-500', name: 'Google Play Gift Card ₹500' },
  { id: 'myntra-1000', name: 'Myntra Gift Voucher ₹1000' },
  { id: 'swiggy-200', name: 'Swiggy Food Voucher ₹200' },
  { id: 'zomato-300', name: 'Zomato Gift Card ₹300' },
]
