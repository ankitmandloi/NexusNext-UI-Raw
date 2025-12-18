'use client'

import { useState } from 'react'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import CommonPagination from '../../../basic-master/address-master/common/components/Pagination.jsx'

// ============================================================================
// INITIAL DATA
// ============================================================================
const ITEMS_PER_PAGE = 10

type Retailer = {
  id: number
  retailerCode: string
  retailerName: string
  gstinNumber: string
  distributorCode: string
  distributorName: string
  distributorGstin: string
  customer: string
  ownerFirstName: string
  ownerLastName: string
  status: string
  mobileNumber: string
  address: string
}

const initialRetailers: Retailer[] = [
  {
    id: 1,
    retailerCode: 'RET001',
    retailerName: 'Prime Electronics Store',
    gstinNumber: '27AABCR1234P1Z5',
    distributorCode: 'DIST001',
    distributorName: 'ABC Distributors Pvt Ltd',
    distributorGstin: '27AABCU9603R1ZM',
    customer: 'Prime Electronics',
    ownerFirstName: 'Suresh',
    ownerLastName: 'Singh',
    status: 'Active',
    mobileNumber: '9876543211',
    address: '45, Market Road, Mumbai, Maharashtra - 400002',
  },
  {
    id: 2,
    retailerCode: 'RET002',
    retailerName: 'Tech Solutions Retail',
    gstinNumber: '29AADCR5678Q2Z6',
    distributorCode: 'DIST002',
    distributorName: 'XYZ Trading Company',
    distributorGstin: '29AADCB2230M1ZP',
    customer: 'Tech Solutions',
    ownerFirstName: 'Meena',
    ownerLastName: 'Kumari',
    status: 'Active',
    mobileNumber: '9123456788',
    address: '78, Brigade Road, Bangalore, Karnataka - 560002',
  },
  {
    id: 3,
    retailerCode: 'RET003',
    retailerName: 'Smart Gadgets Hub',
    gstinNumber: '07AAGCR9012R3Z7',
    distributorCode: 'DIST001',
    distributorName: 'ABC Distributors Pvt Ltd',
    distributorGstin: '27AABCU9603R1ZM',
    customer: 'Smart Gadgets',
    ownerFirstName: 'Vikram',
    ownerLastName: 'Verma',
    status: 'Inactive',
    mobileNumber: '9988776654',
    address: '90, Connaught Place, Delhi - 110003',
  },
  {
    id: 4,
    retailerCode: 'RET004',
    retailerName: 'Digital World Store',
    gstinNumber: '33AAECR3456S4Z8',
    distributorCode: 'DIST003',
    distributorName: 'Global Wholesale Mart',
    distributorGstin: '07AAGCG4569D1ZN',
    customer: 'Digital World',
    ownerFirstName: 'Anita',
    ownerLastName: 'Gupta',
    status: 'Active',
    mobileNumber: '9765432109',
    address: '12, Park Street, Kolkata, West Bengal - 700016',
  },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function RetailerPage() {
  const [retailers] = useState(initialRetailers)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(retailers.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentRetailers = retailers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Retailer List</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              View all retailers synced from DMS
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900" style={{ minWidth: '2400px' }}>
          <div className="w-[60px] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
              <div className="w-[130px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Retailer Code</div>
              <div className="w-[200px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Retailer Name</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400">GSTIN Number</div>
              <div className="w-[140px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Distributor Code</div>
              <div className="w-[200px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Distributor Name</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400">GSTIN Number</div>
              <div className="w-[180px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Customer</div>
              <div className="w-[150px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Owner First Name</div>
              <div className="w-[150px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Owner Last Name</div>
              <div className="w-[100px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</div>
              <div className="w-[140px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Mobile Number</div>
          <div className="flex-1 min-w-[300px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Address</div>
        </div>

        {/* Scrollable Table Body */}
        <div
          className="flex-1 overflow-y-auto overflow-x-auto
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
          style={{ minWidth: '2400px' }}
        >
          {retailers.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No retailers found.
            </div>
          ) : (
              currentRetailers.map((retailer, index) => (
                <div
                  key={retailer.id}
                  className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                    index === currentRetailers.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div className="w-[60px] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                    {retailer.id}
                  </div>
                  <div className="w-[130px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {retailer.retailerCode}
                  </div>
                  <div className="w-[200px] text-sm font-medium text-zinc-950 dark:text-white truncate pr-4">
                    {retailer.retailerName}
                  </div>
                  <div className="w-[160px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {retailer.gstinNumber}
                  </div>
                  <div className="w-[140px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {retailer.distributorCode}
                  </div>
                  <div className="w-[200px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {retailer.distributorName}
                  </div>
                  <div className="w-[160px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {retailer.distributorGstin}
                  </div>
                  <div className="w-[180px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {retailer.customer}
                  </div>
                  <div className="w-[150px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {retailer.ownerFirstName}
                  </div>
                  <div className="w-[150px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {retailer.ownerLastName}
                  </div>
                  <div className="w-[100px] text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        retailer.status === 'Active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {retailer.status}
                    </span>
                  </div>
                  <div className="w-[140px] text-sm text-zinc-600 dark:text-zinc-300">{retailer.mobileNumber}</div>
                  <div className="flex-1 min-w-[300px] text-sm text-zinc-600 dark:text-zinc-300 pr-4">
                    {retailer.address}
                  </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer */}
        <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}
