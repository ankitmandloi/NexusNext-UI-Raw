'use client'

import { useState } from 'react'
import { Heading } from '@/components/heading'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import CommonPagination from '../../../basic-master/address-master/common/components/Pagination.jsx'
import { ArrowPathIcon } from '@heroicons/react/16/solid'

// ============================================================================
// INITIAL DATA
// ============================================================================
const ITEMS_PER_PAGE = 10

type InvoiceTransaction = {
  id: number
  distributorCode: string
  distributorName: string
  distributorGstin: string
  parentCustomer: string
  retailerCode: string
  retailerName: string
  retailerGstin: string
  childCustomer: string
  childGstinNumber: string
  invoiceDate: string
  invoiceNumber: string
  batchNumber: string
  uniqueKey: string
  financialYear: string
  status: string
}

const initialInvoices: InvoiceTransaction[] = [
  {
    id: 1,
    distributorCode: 'DIST001',
    distributorName: 'ABC Distributors Pvt Ltd',
    distributorGstin: '27AABCU9603R1ZM',
    parentCustomer: 'ABC Distributors',
    retailerCode: 'RET001',
    retailerName: 'Prime Electronics Store',
    retailerGstin: '27AABCR1234P1Z5',
    childCustomer: 'Prime Electronics',
    childGstinNumber: '27AABCR1234P1Z5',
    invoiceDate: '2024-01-15',
    invoiceNumber: 'INV-2024-001',
    batchNumber: 'BATCH-001',
    uniqueKey: 'UK-001-2024',
    financialYear: '2024-25',
    status: 'Synced',
  },
  {
    id: 2,
    distributorCode: 'DIST002',
    distributorName: 'XYZ Trading Company',
    distributorGstin: '29AADCB2230M1ZP',
    parentCustomer: 'XYZ Trading',
    retailerCode: 'RET002',
    retailerName: 'Tech Solutions Retail',
    retailerGstin: '29AADCR5678Q2Z6',
    childCustomer: 'Tech Solutions',
    childGstinNumber: '29AADCR5678Q2Z6',
    invoiceDate: '2024-01-16',
    invoiceNumber: 'INV-2024-002',
    batchNumber: 'BATCH-002',
    uniqueKey: 'UK-002-2024',
    financialYear: '2024-25',
    status: 'Synced',
  },
  {
    id: 3,
    distributorCode: 'DIST001',
    distributorName: 'ABC Distributors Pvt Ltd',
    distributorGstin: '27AABCU9603R1ZM',
    parentCustomer: 'ABC Distributors',
    retailerCode: 'RET003',
    retailerName: 'Smart Gadgets Hub',
    retailerGstin: '07AAGCR9012R3Z7',
    childCustomer: 'Smart Gadgets',
    childGstinNumber: '07AAGCR9012R3Z7',
    invoiceDate: '2024-01-17',
    invoiceNumber: 'INV-2024-003',
    batchNumber: 'BATCH-003',
    uniqueKey: 'UK-003-2024',
    financialYear: '2024-25',
    status: 'Pending',
  },
  {
    id: 4,
    distributorCode: 'DIST003',
    distributorName: 'Global Wholesale Mart',
    distributorGstin: '07AAGCG4569D1ZN',
    parentCustomer: 'Global Wholesale',
    retailerCode: 'RET004',
    retailerName: 'Digital World Store',
    retailerGstin: '33AAECR3456S4Z8',
    childCustomer: 'Digital World',
    childGstinNumber: '33AAECR3456S4Z8',
    invoiceDate: '2024-01-18',
    invoiceNumber: 'INV-2024-004',
    batchNumber: 'BATCH-004',
    uniqueKey: 'UK-004-2024',
    financialYear: '2024-25',
    status: 'Failed',
  },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function InvoiceTransactionPage() {
  const [invoices] = useState(initialInvoices)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSyncing, setIsSyncing] = useState(false)

  const totalPages = Math.max(1, Math.ceil(invoices.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentInvoices = invoices.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSync = () => {
    setIsSyncing(true)
    // Simulate sync operation
    setTimeout(() => {
      setIsSyncing(false)
      alert('Sync completed successfully!')
    }, 2000)
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Invoice Transaction</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              View all invoice transactions synced from DMS
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button color="dark/zinc" onClick={handleSync} disabled={isSyncing}>
              <ArrowPathIcon className={isSyncing ? 'animate-spin' : ''} />
              {isSyncing ? 'Syncing...' : 'Sync'}
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900" style={{ minWidth: '2600px' }}>
          <div className="w-[60px] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
              <div className="w-[140px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Distributor Code</div>
              <div className="w-[200px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Distributor Name</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400">GSTIN Number</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Parent Customer</div>
              <div className="w-[130px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Retailer Code</div>
              <div className="w-[180px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Retailer Name</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400">GSTIN Number</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Child Customer</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Child GSTIN Number</div>
              <div className="w-[130px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Invoice Date</div>
              <div className="w-[150px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Invoice Number</div>
              <div className="w-[130px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Batch Number</div>
              <div className="w-[140px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Unique Key</div>
              <div className="w-[130px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Financial Year</div>
          <div className="w-[110px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</div>
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
          style={{ minWidth: '2600px' }}
        >
          {invoices.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No invoice transactions found.
            </div>
          ) : (
              currentInvoices.map((invoice, index) => (
                <div
                  key={invoice.id}
                  className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                    index === currentInvoices.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div className="w-[60px] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                    {invoice.id}
                  </div>
                  <div className="w-[140px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {invoice.distributorCode}
                  </div>
                  <div className="w-[200px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {invoice.distributorName}
                  </div>
                  <div className="w-[160px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {invoice.distributorGstin}
                  </div>
                  <div className="w-[160px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {invoice.parentCustomer}
                  </div>
                  <div className="w-[130px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {invoice.retailerCode}
                  </div>
                  <div className="w-[180px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {invoice.retailerName}
                  </div>
                  <div className="w-[160px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {invoice.retailerGstin}
                  </div>
                  <div className="w-[160px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {invoice.childCustomer}
                  </div>
                  <div className="w-[160px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {invoice.childGstinNumber}
                  </div>
                  <div className="w-[130px] text-sm text-zinc-600 dark:text-zinc-300">{invoice.invoiceDate}</div>
                  <div className="w-[150px] text-sm font-medium text-zinc-950 dark:text-white truncate pr-4">
                    {invoice.invoiceNumber}
                  </div>
                  <div className="w-[130px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {invoice.batchNumber}
                  </div>
                  <div className="w-[140px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {invoice.uniqueKey}
                  </div>
                  <div className="w-[130px] text-sm text-zinc-600 dark:text-zinc-300">{invoice.financialYear}</div>
                  <div className="w-[110px] text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        invoice.status === 'Synced'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : invoice.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {invoice.status}
                    </span>
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
