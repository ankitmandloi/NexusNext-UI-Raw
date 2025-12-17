export interface Invoice {
  id: string
  invoiceNumber: string
  date: string
  buyerName: string
  buyerType: string
  status: string
}

export interface Product {
  id: string
  code: string
  name: string
}

export interface BuyerSeller {
  id: string
  name: string
  code: string
  address: string
  city: string
  district: string
  state: string
  mobileNumber: string
  type?: string
}

export interface InvoiceLineItem {
  id: string
  productCode: string
  productName: string
  quantity: number
  rate: number
  amount: number
}

export interface InvoiceDetails {
  invoiceNumber: string
  status: string
  invoiceDate: string
  claimDate: string
  validatedBy: string
  loyaltyPoints: number
  supplierDetails: {
    name: string
    code: string
    address: string
    city: string
    district: string
    state: string
    mobileNumber: string
  }
  buyerDetails: {
    name: string
    code: string
    portalAccess: string
    customerStatus: string
    address: string
    city: string
    district: string
    state: string
    mobileNumber: string
  }
  lineItems: {
    description: string
    code: string
    hsn: string
    quantity: number
    unit: string
    rate: number
    amount: number
    points: number
  }[]
  invoiceImage?: string
  pointSummary: {
    schemeDetails: string
    points: number
  }[]
}

export const statusOptions = [
  { id: 1, name: 'Open' },
  { id: 2, name: 'Validated' },
  { id: 3, name: 'Approved' },
  { id: 4, name: 'Rejected' },
]

export const buyerTypes = [
  { id: 1, name: 'Retailer' },
  { id: 2, name: 'Wholesaler' },
  { id: 3, name: 'Distributor' },
  { id: 4, name: 'Corporate' },
]

export const availableProducts: Product[] = [
  { id: 'P001', code: 'OFHINO2LIL', name: 'OFHINO002' },
  { id: 'P002', code: 'OFHINO3LIL', name: 'OFHINO003' },
  { id: 'P003', code: 'PROD001', name: 'Product A' },
  { id: 'P004', code: 'PROD002', name: 'Product B' },
  { id: 'P005', code: 'PROD003', name: 'Product C' },
]

export const availableBuyersSellers: BuyerSeller[] = [
  {
    id: 'BS001',
    name: 'AURA INDIA CORPORATION',
    code: '80234',
    address: '119, Chetak Centre Annex, Near Hotel Shreemaya, Indore',
    city: 'Indore',
    district: 'Indore',
    state: 'Madhya Pradesh',
    mobileNumber: '7721906464',
    type: 'Seller',
  },
  {
    id: 'BS002',
    name: 'New Supar Auto Parts',
    code: '42302',
    address: 'New Loha Mandi',
    city: 'Indore',
    district: 'Indore',
    state: 'Madhya Pradesh',
    mobileNumber: '9826305629',
    type: 'Buyer',
  },
  {
    id: 'BS003',
    name: 'Sharma Trading Co',
    code: '42303',
    address: 'Main Market Road',
    city: 'Indore',
    district: 'Indore',
    state: 'Madhya Pradesh',
    mobileNumber: '9876543210',
    type: 'Buyer',
  },
  {
    id: 'BS004',
    name: 'Gupta Enterprises',
    code: '42304',
    address: 'Station Road',
    city: 'Mumbai',
    district: 'Mumbai',
    state: 'Maharashtra',
    mobileNumber: '9988776655',
    type: 'Buyer',
  },
]

export const initialInvoices: Invoice[] = [
  {
    id: 'INV-001',
    invoiceNumber: 'IN02572526100099',
    date: '15-12-2025',
    buyerName: 'New Supar Auto Parts',
    buyerType: 'Retailer',
    status: 'Approved',
  },
  {
    id: 'INV-002',
    invoiceNumber: 'IN02572526100100',
    date: '14-12-2025',
    buyerName: 'Sharma Trading Co',
    buyerType: 'Wholesaler',
    status: 'Validated',
  },
  {
    id: 'INV-003',
    invoiceNumber: 'IN02572526100101',
    date: '14-12-2025',
    buyerName: 'Gupta Enterprises',
    buyerType: 'Retailer',
    status: 'Open',
  },
  {
    id: 'INV-004',
    invoiceNumber: 'IN02572526100102',
    date: '13-12-2025',
    buyerName: 'Patel Distributors',
    buyerType: 'Distributor',
    status: 'Rejected',
  },
  {
    id: 'INV-005',
    invoiceNumber: 'IN02572526100103',
    date: '13-12-2025',
    buyerName: 'Mehta Motors',
    buyerType: 'Retailer',
    status: 'Approved',
  },
  {
    id: 'INV-006',
    invoiceNumber: 'IN02572526100104',
    date: '12-12-2025',
    buyerName: 'Kumar Auto Spares',
    buyerType: 'Retailer',
    status: 'Validated',
  },
  {
    id: 'INV-007',
    invoiceNumber: 'IN02572526100105',
    date: '12-12-2025',
    buyerName: 'Singh Corporation',
    buyerType: 'Corporate',
    status: 'Open',
  },
  {
    id: 'INV-008',
    invoiceNumber: 'IN02572526100106',
    date: '11-12-2025',
    buyerName: 'Verma Traders',
    buyerType: 'Wholesaler',
    status: 'Approved',
  },
]

export const invoiceDetailsMap: Record<string, InvoiceDetails> = {
  'IN02572526100099': {
    invoiceNumber: 'IN02572526100099',
    status: 'Approved',
    invoiceDate: '15-12-2025',
    claimDate: '15-12-2025',
    validatedBy: 'Not Available',
    loyaltyPoints: 5,
    supplierDetails: {
      name: 'AURA INDIA CORPORATION',
      code: '80234',
      address: '119, Chetak Centre Annex, Near Hotel Shreemaya, Indore',
      city: 'Indore',
      district: 'Indore',
      state: 'Madhya Pradesh',
      mobileNumber: '7721906464',
    },
    buyerDetails: {
      name: 'New Supar Auto Parts',
      code: '42302',
      portalAccess: 'Active',
      customerStatus: 'Open',
      address: 'New Loha Mandi',
      city: 'Indore',
      district: 'Indore',
      state: 'Madhya Pradesh',
      mobileNumber: '9826305629',
    },
    lineItems: [
      {
        description: 'OFHINO002',
        code: 'OFHINO2LIL',
        hsn: '84212300',
        quantity: 1,
        unit: 'PCS',
        rate: 159.90,
        amount: 159.9,
        points: 5,
      },
    ],
    pointSummary: [
      {
        schemeDetails: 'RLP Basic Retailer Scheme FY 2025',
        points: 5,
      },
    ],
  },
  // Additional invoice details for other invoices
  'IN02572526100100': {
    invoiceNumber: 'IN02572526100100',
    status: 'Validated',
    invoiceDate: '14-12-2025',
    claimDate: '14-12-2025',
    validatedBy: 'Admin User',
    loyaltyPoints: 10,
    supplierDetails: {
      name: 'AURA INDIA CORPORATION',
      code: '80234',
      address: '119, Chetak Centre Annex, Near Hotel Shreemaya, Indore',
      city: 'Indore',
      district: 'Indore',
      state: 'Madhya Pradesh',
      mobileNumber: '7721906464',
    },
    buyerDetails: {
      name: 'Sharma Trading Co',
      code: '42303',
      portalAccess: 'Active',
      customerStatus: 'Open',
      address: 'Main Market Road',
      city: 'Indore',
      district: 'Indore',
      state: 'Madhya Pradesh',
      mobileNumber: '9876543210',
    },
    lineItems: [
      {
        description: 'OFHINO003',
        code: 'OFHINO3LIL',
        hsn: '84212300',
        quantity: 2,
        unit: 'PCS',
        rate: 199.90,
        amount: 399.8,
        points: 10,
      },
    ],
    pointSummary: [
      {
        schemeDetails: 'RLP Basic Retailer Scheme FY 2025',
        points: 10,
      },
    ],
  },
}
