export type RedemptionRecord = {
  id: string
  customerName: string
  date: string
  city: string
  state: string
  customerType: string
  redemptionType: string
  points: number
  status: string
  // Detailed info
  contactPerson?: string
  contactNumber?: string
  assignedEmployee?: string
  amount?: number
  tds?: number
  totalPointsDeducted?: number
  accountNumber?: string
  accountHolderName?: string
  ifscCode?: string
  bankName?: string
  panNumber?: string
  aadharNumber?: string
  utrNumber?: string
  requestGeneratedOn?: string
  worth?: number
}

export const redemptionData: RedemptionRecord[] = [
  {
    id: 'RED-001',
    customerName: 'shri hari auto g',
    date: '2025-12-16',
    city: 'Indore',
    state: 'Madhya Pradesh',
    customerType: 'Mechanic',
    redemptionType: 'Bank',
    points: 500,
    status: 'Pending',
    contactPerson: 'Harilal Harilal',
    contactNumber: '9753059768',
    assignedEmployee: 'Pawan Sharma',
    amount: 500,
    tds: 0,
    totalPointsDeducted: 500,
    accountNumber: '31942182002',
    accountHolderName: 'MR. HARILAL HARILAL',
    ifscCode: 'SBIN0004388',
    bankName: 'State Bank of India',
    panNumber: 'Not Available',
    aadharNumber: 'Not Available',
    utrNumber: '',
    requestGeneratedOn: '16 Dec 2025 12:33:15',
    worth: 500,
  },
  {
    id: 'RED-002',
    customerName: 'SAVITA ENTERPRISES',
    date: '2025-12-15',
    city: 'Indore',
    state: 'Madhya Pradesh',
    customerType: 'Distributor',
    redemptionType: 'Wallet Transfer',
    points: 7270,
    status: 'Completed',
    contactPerson: 'Savita Sharma',
    contactNumber: '9876543210',
    assignedEmployee: 'Rahul Kumar',
    amount: 7270,
    tds: 0,
    totalPointsDeducted: 7270,
    requestGeneratedOn: '15 Dec 2025 10:20:30',
    worth: 7270,
  },
  {
    id: 'RED-003',
    customerName: 'SAVITA ENTERPRISES',
    date: '2025-12-15',
    city: 'Indore',
    state: 'Madhya Pradesh',
    customerType: 'Distributor',
    redemptionType: 'Wallet Transfer',
    points: 1,
    status: 'Completed',
    contactPerson: 'Savita Sharma',
    contactNumber: '9876543210',
    assignedEmployee: 'Rahul Kumar',
    amount: 1,
    tds: 0,
    totalPointsDeducted: 1,
    requestGeneratedOn: '15 Dec 2025 09:15:20',
    worth: 1,
  },
  {
    id: 'RED-004',
    customerName: 'SAVITA ENTERPRISES',
    date: '2025-12-15',
    city: 'Indore',
    state: 'Madhya Pradesh',
    customerType: 'Distributor',
    redemptionType: 'Wallet Transfer',
    points: 1,
    status: 'Completed',
    contactPerson: 'Savita Sharma',
    contactNumber: '9876543210',
    assignedEmployee: 'Rahul Kumar',
    amount: 1,
    tds: 0,
    totalPointsDeducted: 1,
    requestGeneratedOn: '15 Dec 2025 08:45:10',
    worth: 1,
  },
  {
    id: 'RED-005',
    customerName: 'SAVITA ENTERPRISES',
    date: '2025-12-15',
    city: 'Indore',
    state: 'Madhya Pradesh',
    customerType: 'Distributor',
    redemptionType: 'Wallet Transfer',
    points: 1,
    status: 'Completed',
    contactPerson: 'Savita Sharma',
    contactNumber: '9876543210',
    assignedEmployee: 'Rahul Kumar',
    amount: 1,
    tds: 0,
    totalPointsDeducted: 1,
    requestGeneratedOn: '15 Dec 2025 07:30:00',
    worth: 1,
  },
  {
    id: 'RED-006',
    customerName: 'SAVITA ENTERPRISES',
    date: '2025-12-15',
    city: 'Indore',
    state: 'Madhya Pradesh',
    customerType: 'Distributor',
    redemptionType: 'Wallet Transfer',
    points: 1,
    status: 'Completed',
    contactPerson: 'Savita Sharma',
    contactNumber: '9876543210',
    assignedEmployee: 'Rahul Kumar',
    amount: 1,
    tds: 0,
    totalPointsDeducted: 1,
    requestGeneratedOn: '15 Dec 2025 06:15:45',
    worth: 1,
  },
  {
    id: 'RED-007',
    customerName: 'vijay',
    date: '2025-11-08',
    city: 'Indore',
    state: 'Madhya Pradesh',
    customerType: 'Mechanic',
    redemptionType: 'Bank',
    points: 1492,
    status: 'Completed',
    contactPerson: 'Vijay Kumar',
    contactNumber: '9988776655',
    assignedEmployee: 'Amit Singh',
    amount: 1492,
    tds: 0,
    totalPointsDeducted: 1492,
    accountNumber: '98765432100',
    accountHolderName: 'VIJAY KUMAR',
    ifscCode: 'HDFC0001234',
    bankName: 'HDFC Bank',
    panNumber: 'ABCDE1234F',
    aadharNumber: '1234 5678 9012',
    utrNumber: 'UTR123456789',
    requestGeneratedOn: '08 Nov 2025 14:20:10',
    worth: 1492,
  },
  {
    id: 'RED-008',
    customerName: 'SAVITA ENTERPRISES',
    date: '2025-10-29',
    city: 'Indore',
    state: 'Madhya Pradesh',
    customerType: 'Distributor',
    redemptionType: 'Wallet Transfer',
    points: 800,
    status: 'Completed',
    contactPerson: 'Savita Sharma',
    contactNumber: '9876543210',
    assignedEmployee: 'Rahul Kumar',
    amount: 800,
    tds: 0,
    totalPointsDeducted: 800,
    requestGeneratedOn: '29 Oct 2025 11:30:20',
    worth: 800,
  },
]

export const REDEMPTION_TYPES = [
  { id: 'bank', name: 'Bank' },
  { id: 'wallet', name: 'Wallet Transfer' },
  { id: 'paytm', name: 'Paytm' },
  { id: 'upi', name: 'UPI' },
]

export const CUSTOMER_TYPES = [
  { id: 'mechanic', name: 'Mechanic' },
  { id: 'distributor', name: 'Distributor' },
  { id: 'retailer', name: 'Retailer' },
  { id: 'dealer', name: 'Dealer' },
]

export const STATUS_OPTIONS = [
  { id: 'pending', name: 'Pending' },
  { id: 'completed', name: 'Completed' },
  { id: 'rejected', name: 'Rejected' },
  { id: 'processing', name: 'Processing' },
]
