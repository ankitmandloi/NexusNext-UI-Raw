// Sample data for Point Ledger
export type PointLedger = {
  id: string
  ledgerDate: string
  customerId: string
  firmName: string
  ledgerCategory: string
  earnPoint: number
  redeemPoint: number
  expirePoints: number
  balancePoint: number
  creditNarration?: string
  debitNarration?: string
  totalRecord?: number
}

// Initial sample point ledgers
export const initialPointLedgers: PointLedger[] = [
  {
    id: '139563',
    ledgerDate: '2024-01-29',
    customerId: '1',
    firmName: 'Imast Operations Private Limited',
    ledgerCategory: 'Invoice',
    earnPoint: 20,
    redeemPoint: 1,
    expirePoints: 19,
    balancePoint: 0,
    creditNarration: 'Earn Points On invoice no# IN00042324100035 for 1 Total Records.',
    debitNarration: 'Point Debited against the wallettransfer#WATRF20240510105921046232of 1 Points',
    totalRecord: 1,
  },
  {
    id: '139564',
    ledgerDate: '2024-02-15',
    customerId: '2',
    firmName: 'ABC Enterprises Ltd',
    ledgerCategory: 'Coupon',
    earnPoint: 50,
    redeemPoint: 0,
    expirePoints: 0,
    balancePoint: 50,
    creditNarration: 'Earn Points On coupon redemption#CP00042324100036 for 2 Total Records.',
    debitNarration: '',
    totalRecord: 2,
  },
  {
    id: '139565',
    ledgerDate: '2024-03-10',
    customerId: '3',
    firmName: 'XYZ Trading Company',
    ledgerCategory: 'Invoice',
    earnPoint: 100,
    redeemPoint: 30,
    expirePoints: 10,
    balancePoint: 60,
    creditNarration: 'Earn Points On invoice no# IN00042324100037 for 3 Total Records.',
    debitNarration: 'Point Debited against the redemption#RED20240510105921046233of 30 Points',
    totalRecord: 3,
  },
  {
    id: '139566',
    ledgerDate: '2024-04-05',
    customerId: '4',
    firmName: 'Global Solutions Pvt Ltd',
    ledgerCategory: 'Scheme',
    earnPoint: 75,
    redeemPoint: 25,
    expirePoints: 5,
    balancePoint: 45,
    creditNarration: 'Earn Points On scheme participation for 1 Total Records.',
    debitNarration: 'Point Debited against the reward claim#RWD20240510105921046234of 25 Points',
    totalRecord: 1,
  },
]
