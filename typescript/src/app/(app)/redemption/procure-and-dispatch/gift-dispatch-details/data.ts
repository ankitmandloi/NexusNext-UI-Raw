export type GiftDispatch = {
  id: string
  redemptionHeader: string
  redemptionDetail: string
  consignmentReference: string
  docket: string
  shippingDate: string
  deliveryDate?: string
  deliveryProof?: string
  status: string
  address?: string
}

export const giftDispatchData: GiftDispatch[] = [
  {
    id: 'GD-001',
    redemptionHeader: 'RH-2025-001',
    redemptionDetail: 'Smart Watch - Samsung Galaxy Watch 5',
    consignmentReference: 'CNR-2025-001-BLR',
    docket: 'DKT-456789123',
    shippingDate: '2025-12-10',
    deliveryDate: '2025-12-14',
    deliveryProof: 'POD-001.pdf',
    status: 'Delivered',
    address: '123, MG Road, Bangalore, Karnataka - 560001',
  },
  {
    id: 'GD-002',
    redemptionHeader: 'RH-2025-002',
    redemptionDetail: 'Bluetooth Headphones - Sony WH-1000XM5',
    consignmentReference: 'CNR-2025-002-DEL',
    docket: 'DKT-789456321',
    shippingDate: '2025-12-11',
    deliveryDate: '2025-12-15',
    deliveryProof: 'POD-002.pdf',
    status: 'Delivered',
    address: '45, Connaught Place, New Delhi, Delhi - 110001',
  },
  {
    id: 'GD-003',
    redemptionHeader: 'RH-2025-003',
    redemptionDetail: 'Premium Tea Gift Set - Assorted Collection',
    consignmentReference: 'CNR-2025-003-IND',
    docket: 'DKT-321654987',
    shippingDate: '2025-12-12',
    status: 'In Transit',
    address: '78, AB Road, Indore, Madhya Pradesh - 452001',
  },
  {
    id: 'GD-004',
    redemptionHeader: 'RH-2025-004',
    redemptionDetail: 'Fitness Tracker - Mi Band 7 Pro',
    consignmentReference: 'CNR-2025-004-MUM',
    docket: 'DKT-147258369',
    shippingDate: '2025-12-13',
    status: 'Processing',
    address: '22, Marine Drive, Mumbai, Maharashtra - 400002',
  },
  {
    id: 'GD-005',
    redemptionHeader: 'RH-2025-005',
    redemptionDetail: 'Wireless Mouse - Logitech MX Master 3',
    consignmentReference: 'CNR-2025-005-CHN',
    docket: 'DKT-963852741',
    shippingDate: '2025-12-14',
    status: 'Pending',
    address: '56, Anna Salai, Chennai, Tamil Nadu - 600002',
  },
  {
    id: 'GD-006',
    redemptionHeader: 'RH-2025-006',
    redemptionDetail: 'Power Bank - Anker 20000mAh',
    consignmentReference: 'CNR-2025-006-HYD',
    docket: 'DKT-852963741',
    shippingDate: '2025-12-09',
    deliveryDate: '2025-12-13',
    deliveryProof: 'POD-006.pdf',
    status: 'Delivered',
    address: '89, Hitech City, Hyderabad, Telangana - 500081',
  },
  {
    id: 'GD-007',
    redemptionHeader: 'RH-2025-007',
    redemptionDetail: 'Portable Speaker - JBL Flip 6',
    consignmentReference: 'CNR-2025-007-PUN',
    docket: 'DKT-741852963',
    shippingDate: '2025-12-15',
    status: 'In Transit',
    address: '34, FC Road, Pune, Maharashtra - 411004',
  },
  {
    id: 'GD-008',
    redemptionHeader: 'RH-2025-008',
    redemptionDetail: 'Coffee Maker - Philips HD7431',
    consignmentReference: 'CNR-2025-008-KOL',
    docket: 'DKT-369258147',
    shippingDate: '2025-12-08',
    deliveryDate: '2025-12-12',
    deliveryProof: 'POD-008.pdf',
    status: 'Delivered',
    address: '12, Park Street, Kolkata, West Bengal - 700016',
  },
]

export const DISPATCH_STATUS_OPTIONS = [
  { id: 'pending', name: 'Pending' },
  { id: 'processing', name: 'Processing' },
  { id: 'in-transit', name: 'In Transit' },
  { id: 'delivered', name: 'Delivered' },
  { id: 'cancelled', name: 'Cancelled' },
  { id: 'returned', name: 'Returned' },
]
