// Sample data for Credit Note
export type CreditNote = {
  id: string
  docNo: string
  type: string
  custId: string
  ownerFirstName: string
  ownerLastName: string
  customerMobile: string
  firmName: string
  points: number
  narration: string
  attachment?: string
  status: string
}

// Type Options
export const typeOptions = [
  { id: '1', name: 'Point Adjustment' },
  { id: '2', name: 'Refund' },
  { id: '3', name: 'Bonus' },
  { id: '4', name: 'Correction' },
  { id: '5', name: 'Other' },
]

// Status Options
export const statusOptions = [
  { id: '1', name: 'Pending' },
  { id: '2', name: 'Approved' },
  { id: '3', name: 'Rejected' },
]

// Sample customers for search
export const sampleCustomers = [
  {
    id: '1',
    firmName: 'Imast Operations Private Limited',
    mobile: '+91 9876543210',
    email: 'imast@example.com',
    ownerFirstName: 'Rajesh',
    ownerLastName: 'Kumar',
  },
  {
    id: '2',
    firmName: 'ABC Enterprises Ltd',
    mobile: '+91 9876543211',
    email: 'abc@example.com',
    ownerFirstName: 'Amit',
    ownerLastName: 'Sharma',
  },
  {
    id: '3',
    firmName: 'XYZ Trading Company',
    mobile: '+91 9876543212',
    email: 'xyz@example.com',
    ownerFirstName: 'Priya',
    ownerLastName: 'Singh',
  },
]

// Initial sample credit notes
export const initialCreditNotes: CreditNote[] = [
  {
    id: 'CN001',
    docNo: 'CN-2024-001',
    type: 'Point Adjustment',
    custId: '1',
    ownerFirstName: 'Rajesh',
    ownerLastName: 'Kumar',
    customerMobile: '+91 9876543210',
    firmName: 'Imast Operations Private Limited',
    points: 50,
    narration: 'Point adjustment for invoice discrepancy',
    status: 'Approved',
  },
  {
    id: 'CN002',
    docNo: 'CN-2024-002',
    type: 'Refund',
    custId: '2',
    ownerFirstName: 'Amit',
    ownerLastName: 'Sharma',
    customerMobile: '+91 9876543211',
    firmName: 'ABC Enterprises Ltd',
    points: 100,
    narration: 'Refund for cancelled order',
    status: 'Pending',
  },
  {
    id: 'CN003',
    docNo: 'CN-2024-003',
    type: 'Bonus',
    custId: '3',
    ownerFirstName: 'Priya',
    ownerLastName: 'Singh',
    customerMobile: '+91 9876543212',
    firmName: 'XYZ Trading Company',
    points: 25,
    narration: 'Bonus points for loyalty program',
    status: 'Approved',
  },
]
