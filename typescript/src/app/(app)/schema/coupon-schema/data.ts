// data.js

export const initialCouponProfiles = [
  {
    id: 'CP-001',
    couponProfileName: 'Default Profile',
    couponPattern: 'Alphanumeric',
    couponLength: 8,
    excludingCharacter: '',
    customerTypeRequired: 'No',
    customerType: 'N/A',
    status: 'Active',
  },
]

export const couponPatterns = [
  { id: 1, name: 'Alphanumeric' },
  { id: 2, name: 'Numeric' },
]

export const customerTypeRequiredOptions = [
  { id: 1, name: 'Yes' },
  { id: 2, name: 'No' },
]

export const customerTypes = [
  { id: 1, name: 'Retail' },
  { id: 2, name: 'Wholesale' },
]

export const statusOptions = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Inactive' },
]
