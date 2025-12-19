export interface Order {
  id: number
  orderDate: string
  orderNumber: string
  orderSeller: string
  sellerCustomerCode: string
  orderBuyer: string
  buyerCustomerCode: string
  orderQuantity: number
  orderValue: string
  attachImage: string
  orderStatus: string
  sapSaleOrderNumber: string
  sapOrderDate: string
  deliveryDate: string
  remark: string
  flag: string
  shippingDifferentAddress: string
}

export interface Seller {
  id: number
  name: string
  code: string
}

export interface Buyer {
  id: number
  name: string
  code: string
}

export const availableSellers: Seller[] = [
  { id: 1, name: 'Test Account Distributor', code: 'TAD001' },
  { id: 2, name: 'ABC Distributor', code: 'ABC001' },
  { id: 3, name: 'XYZ Distributor', code: 'XYZ001' },
]

export const availableBuyers: Buyer[] = [
  { id: 1, name: 'Ahujamotorparts', code: 'AMP001' },
  { id: 2, name: 'Imast Operations Private Limited', code: 'IOPL001' },
  { id: 3, name: 'Ghi', code: 'GHI001' },
  { id: 4, name: 'Tarun Test1', code: 'TT001' },
  { id: 5, name: 'Test Retailer', code: 'TR001' },
  { id: 6, name: 'Test', code: 'TEST001' },
]

export const orderStatusOptions = [
  { id: '1', name: 'Pending' },
  { id: '2', name: 'Approved' },
  { id: '3', name: 'Rejected' },
  { id: '4', name: 'Completed' },
]

export const flagOptions = [
  { id: '1', name: 'Not Synced' },
  { id: '2', name: 'Synced' },
  { id: '3', name: 'Pending' },
]

export const initialOrders: Order[] = [
  {
    id: 329,
    orderDate: '2023-03-20',
    orderNumber: 'S105320000002',
    orderSeller: 'Test Account Distributor',
    sellerCustomerCode: '',
    orderBuyer: 'Ahujamotorparts',
    buyerCustomerCode: '',
    orderQuantity: 32,
    orderValue: '31779.00',
    attachImage: '',
    orderStatus: 'Approved',
    sapSaleOrderNumber: '',
    sapOrderDate: '',
    deliveryDate: '2023-03-31',
    remark: '',
    flag: 'Not Synced',
    shippingDifferentAddress: '',
  },
  {
    id: 2174,
    orderDate: '2023-05-10',
    orderNumber: 'S10000002',
    orderSeller: 'Test Account Distributor',
    sellerCustomerCode: '',
    orderBuyer: 'Imast Operations Private Limited',
    buyerCustomerCode: '',
    orderQuantity: 1,
    orderValue: '1719.00',
    attachImage: '',
    orderStatus: 'Approved',
    sapSaleOrderNumber: '',
    sapOrderDate: '',
    deliveryDate: '2023-05-11',
    remark: 'Test',
    flag: 'Not Synced',
    shippingDifferentAddress: '',
  },
  {
    id: 2401,
    orderDate: '2023-05-15',
    orderNumber: 'S424070000002',
    orderSeller: 'Test Account Distributor',
    sellerCustomerCode: '',
    orderBuyer: 'Ghi',
    buyerCustomerCode: '',
    orderQuantity: 13,
    orderValue: '6254.00',
    attachImage: '',
    orderStatus: 'Approved',
    sapSaleOrderNumber: '',
    sapOrderDate: '',
    deliveryDate: '2023-05-20',
    remark: '',
    flag: 'Not Synced',
    shippingDifferentAddress: '',
  },
  {
    id: 5024,
    orderDate: '2023-06-30',
    orderNumber: 'S183440000002',
    orderSeller: 'Test Account Distributor',
    sellerCustomerCode: '',
    orderBuyer: 'Tarun Test1',
    buyerCustomerCode: '',
    orderQuantity: 7,
    orderValue: '1260.90',
    attachImage: '',
    orderStatus: 'Approved',
    sapSaleOrderNumber: '',
    sapOrderDate: '',
    deliveryDate: '2023-07-14',
    remark: 'G ufcy@gmail.con r',
    flag: 'Not Synced',
    shippingDifferentAddress: '',
  },
  {
    id: 5025,
    orderDate: '2023-06-30',
    orderNumber: 'S183440000003',
    orderSeller: 'Test Account Distributor',
    sellerCustomerCode: '',
    orderBuyer: 'Tarun Test1',
    buyerCustomerCode: '',
    orderQuantity: 3,
    orderValue: '534.42',
    attachImage: '',
    orderStatus: 'Approved',
    sapSaleOrderNumber: '',
    sapOrderDate: '',
    deliveryDate: '2023-07-04',
    remark: 'Jhj',
    flag: 'Not Synced',
    shippingDifferentAddress: '',
  },
  {
    id: 5026,
    orderDate: '2023-06-30',
    orderNumber: 'S183440000004',
    orderSeller: 'Test Account Distributor',
    sellerCustomerCode: '',
    orderBuyer: 'Tarun Test1',
    buyerCustomerCode: '',
    orderQuantity: 3,
    orderValue: '534.42',
    attachImage: '',
    orderStatus: 'Approved',
    sapSaleOrderNumber: '',
    sapOrderDate: '',
    deliveryDate: '2023-07-04',
    remark: 'Jhj',
    flag: 'Not Synced',
    shippingDifferentAddress: '',
  },
  {
    id: 5029,
    orderDate: '2023-06-30',
    orderNumber: 'S436850000002',
    orderSeller: 'Test Account Distributor',
    sellerCustomerCode: '',
    orderBuyer: 'Test Retailer',
    buyerCustomerCode: '',
    orderQuantity: 4,
    orderValue: '592.28',
    attachImage: '',
    orderStatus: 'Approved',
    sapSaleOrderNumber: '',
    sapOrderDate: '',
    deliveryDate: '2023-07-05',
    remark: 'Test',
    flag: 'Not Synced',
    shippingDifferentAddress: '',
  },
  {
    id: 5042,
    orderDate: '2023-06-30',
    orderNumber: 'S159070000002',
    orderSeller: 'Test Account Distributor',
    sellerCustomerCode: '',
    orderBuyer: 'Test',
    buyerCustomerCode: '',
    orderQuantity: 13,
    orderValue: '7851.52',
    attachImage: '',
    orderStatus: 'Approved',
    sapSaleOrderNumber: '',
    sapOrderDate: '',
    deliveryDate: '2023-07-02',
    remark: '',
    flag: 'Not Synced',
    shippingDifferentAddress: '',
  },
  {
    id: 5043,
    orderDate: '2023-06-30',
    orderNumber: 'S159070000003',
    orderSeller: 'Test Account Distributor',
    sellerCustomerCode: '',
    orderBuyer: 'Test',
    buyerCustomerCode: '',
    orderQuantity: 13,
    orderValue: '7851.52',
    attachImage: '',
    orderStatus: 'Approved',
    sapSaleOrderNumber: '',
    sapOrderDate: '',
    deliveryDate: '2023-07-02',
    remark: '',
    flag: 'Not Synced',
    shippingDifferentAddress: '',
  },
  {
    id: 5065,
    orderDate: '2023-06-30',
    orderNumber: 'S20000002',
    orderSeller: 'Test Account Distributor',
    sellerCustomerCode: '',
    orderBuyer: 'Test',
    buyerCustomerCode: '',
    orderQuantity: 5,
    orderValue: '710.28',
    attachImage: '',
    orderStatus: 'Approved',
    sapSaleOrderNumber: '',
    sapOrderDate: '',
    deliveryDate: '2023-07-11',
    remark: '',
    flag: 'Not Synced',
    shippingDifferentAddress: '',
  },
]
