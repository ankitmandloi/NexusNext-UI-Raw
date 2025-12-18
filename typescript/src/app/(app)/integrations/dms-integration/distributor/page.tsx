'use client'

import { useState } from 'react'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import CommonPagination from '../../../basic-master/address-master/common/components/Pagination.jsx'

// ============================================================================
// INITIAL DATA
// ============================================================================
const ITEMS_PER_PAGE = 10

type Distributor = {
  id: number
  distributorCode: string
  distributorName: string
  gstinNumber: string
  customerId: string
  ownerFirstName: string
  ownerLastName: string
  customerCode: string
  status: string
  mobileNumber: string
  address: string
}

const initialDistributors: Distributor[] = [
  {
    id: 1,
    distributorCode: 'DIST001',
    distributorName: 'ABC Distributors Pvt Ltd',
    gstinNumber: '27AABCU9603R1ZM',
    customerId: 'CUST001',
    ownerFirstName: 'Rajesh',
    ownerLastName: 'Kumar',
    customerCode: 'CC001',
    status: 'Active',
    mobileNumber: '9876543210',
    address: '123, Main Street, Mumbai, Maharashtra - 400001',
  },
  {
    id: 2,
    distributorCode: 'DIST002',
    distributorName: 'XYZ Trading Company',
    gstinNumber: '29AADCB2230M1ZP',
    customerId: 'CUST002',
    ownerFirstName: 'Priya',
    ownerLastName: 'Sharma',
    customerCode: 'CC002',
    status: 'Active',
    mobileNumber: '9123456789',
    address: '456, MG Road, Bangalore, Karnataka - 560001',
  },
  {
    id: 3,
    distributorCode: 'DIST003',
    distributorName: 'Global Wholesale Mart',
    gstinNumber: '07AAGCG4569D1ZN',
    customerId: 'CUST003',
    ownerFirstName: 'Amit',
    ownerLastName: 'Patel',
    customerCode: 'CC003',
    status: 'Inactive',
    mobileNumber: '9988776655',
    address: '789, Sector 15, Delhi - 110001',
  },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function DistributorPage() {
  const [distributors] = useState(initialDistributors)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(distributors.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentDistributors = distributors.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Distributor List</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              View all distributors synced from DMS
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900" style={{ minWidth: '2000px' }}>
          <div className="w-[60px] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
              <div className="w-[140px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Distributor Code</div>
              <div className="w-[220px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Distributor Name</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400">GSTIN Number</div>
              <div className="w-[120px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Customer ID</div>
              <div className="w-[150px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Owner First Name</div>
              <div className="w-[150px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Owner Last Name</div>
              <div className="w-[140px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Customer Code</div>
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
          style={{ minWidth: '2000px' }}
        >
          {distributors.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No distributors found.
            </div>
          ) : (
              currentDistributors.map((distributor, index) => (
                <div
                  key={distributor.id}
                  className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                    index === currentDistributors.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div className="w-[60px] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                    {distributor.id}
                  </div>
                  <div className="w-[140px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {distributor.distributorCode}
                  </div>
                  <div className="w-[220px] text-sm font-medium text-zinc-950 dark:text-white truncate pr-4">
                    {distributor.distributorName}
                  </div>
                  <div className="w-[160px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {distributor.gstinNumber}
                  </div>
                  <div className="w-[120px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {distributor.customerId}
                  </div>
                  <div className="w-[150px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {distributor.ownerFirstName}
                  </div>
                  <div className="w-[150px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {distributor.ownerLastName}
                  </div>
                  <div className="w-[140px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {distributor.customerCode}
                  </div>
                  <div className="w-[100px] text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        distributor.status === 'Active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {distributor.status}
                    </span>
                  </div>
                  <div className="w-[140px] text-sm text-zinc-600 dark:text-zinc-300">{distributor.mobileNumber}</div>
                  <div className="flex-1 min-w-[300px] text-sm text-zinc-600 dark:text-zinc-300 pr-4">
                    {distributor.address}
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
