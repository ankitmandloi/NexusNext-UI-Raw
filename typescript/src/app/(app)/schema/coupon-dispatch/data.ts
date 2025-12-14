export interface CouponDispatch {
  id: string
  invoiceNumber: string
  invoiceDate: string
  dispatchTo: string
  shipmentNumber: string
  shipmentRemark: string
  shipmentDate: string
  status: string
}

export const statusOptions = [
  { id: 1, name: 'Pending' },
  { id: 2, name: 'Dispatched' },
  { id: 3, name: 'In Transit' },
  { id: 4, name: 'Delivered' },
  { id: 5, name: 'Cancelled' },
]

export const initialCouponDispatches: CouponDispatch[] = [
  {
    id: 'CD-001',
    invoiceNumber: 'INV-2025-001',
    invoiceDate: '2025-01-15',
    dispatchTo: 'ABC Retail Store',
    shipmentNumber: 'SHIP-001-2025',
    shipmentRemark: 'Priority delivery requested',
    shipmentDate: '2025-01-16',
    status: 'Dispatched',
  },
  {
    id: 'CD-002',
    invoiceNumber: 'INV-2025-002',
    invoiceDate: '2025-01-18',
    dispatchTo: 'XYZ Wholesale Ltd',
    shipmentNumber: 'SHIP-002-2025',
    shipmentRemark: 'Standard shipping',
    shipmentDate: '2025-01-19',
    status: 'In Transit',
  },
  {
    id: 'CD-003',
    invoiceNumber: 'INV-2025-003',
    invoiceDate: '2025-01-20',
    dispatchTo: 'Global Distributors Inc',
    shipmentNumber: 'SHIP-003-2025',
    shipmentRemark: 'Express delivery',
    shipmentDate: '2025-01-21',
    status: 'Delivered',
  },
  {
    id: 'CD-004',
    invoiceNumber: 'INV-2025-004',
    invoiceDate: '2025-01-22',
    dispatchTo: 'City Mart',
    shipmentNumber: 'SHIP-004-2025',
    shipmentRemark: 'Handle with care',
    shipmentDate: '2025-01-23',
    status: 'Pending',
  },
  {
    id: 'CD-005',
    invoiceNumber: 'INV-2025-005',
    invoiceDate: '2025-01-25',
    dispatchTo: 'Premium Store Chain',
    shipmentNumber: 'SHIP-005-2025',
    shipmentRemark: 'Urgent shipment',
    shipmentDate: '2025-01-26',
    status: 'Dispatched',
  },
  {
    id: 'CD-006',
    invoiceNumber: 'INV-2025-006',
    invoiceDate: '2025-01-28',
    dispatchTo: 'Downtown Retail',
    shipmentNumber: 'SHIP-006-2025',
    shipmentRemark: 'Regular delivery',
    shipmentDate: '2025-01-29',
    status: 'In Transit',
  },
  {
    id: 'CD-007',
    invoiceNumber: 'INV-2025-007',
    invoiceDate: '2025-02-01',
    dispatchTo: 'Super Store Network',
    shipmentNumber: 'SHIP-007-2025',
    shipmentRemark: 'Bulk order',
    shipmentDate: '2025-02-02',
    status: 'Delivered',
  },
  {
    id: 'CD-008',
    invoiceNumber: 'INV-2025-008',
    invoiceDate: '2025-02-05',
    dispatchTo: 'Elite Shopping Mall',
    shipmentNumber: 'SHIP-008-2025',
    shipmentRemark: 'Fragile items',
    shipmentDate: '2025-02-06',
    status: 'Cancelled',
  },
  {
    id: 'CD-009',
    invoiceNumber: 'INV-2025-009',
    invoiceDate: '2025-02-08',
    dispatchTo: 'Mega Mart',
    shipmentNumber: 'SHIP-009-2025',
    shipmentRemark: 'Standard packaging',
    shipmentDate: '2025-02-09',
    status: 'Pending',
  },
  {
    id: 'CD-010',
    invoiceNumber: 'INV-2025-010',
    invoiceDate: '2025-02-10',
    dispatchTo: 'Quick Shop Ltd',
    shipmentNumber: 'SHIP-010-2025',
    shipmentRemark: 'Next day delivery',
    shipmentDate: '2025-02-11',
    status: 'Dispatched',
  },
]
