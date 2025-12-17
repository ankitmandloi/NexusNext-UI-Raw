// @ts-nocheck
'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Alert, AlertActions, AlertDescription, AlertTitle } from '@/components/alert'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { PointLedger, initialPointLedgers } from './data'

const ITEMS_PER_PAGE = 10

export default function PointLedgerPage() {
  const [ledgers, setLedgers] = useState<PointLedger[]>(initialPointLedgers)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedLedger, setSelectedLedger] = useState<PointLedger | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(ledgers.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentLedgers = ledgers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleView = (ledger: PointLedger) => {
    setSelectedLedger(ledger)
    setActiveModal('view')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedLedger(null)
  }

  const handleImportExcel = () => {
    console.log('Import from Excel clicked')
  }

  const handleExportExcel = () => {
    console.log('Export to Excel clicked')
  }

  const handleDownloadFormat = () => {
    console.log('Download Format clicked')
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Point Ledger</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              View all point ledger transactions
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown>
              <DropdownButton outline>
                Your Data
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu>
                <DropdownItem onClick={handleImportExcel}>Import from Excel</DropdownItem>
                <DropdownItem onClick={handleExportExcel}>Export to Excel</DropdownItem>
                <DropdownItem onClick={handleDownloadFormat}>Download Format</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Container with synchronized scroll */}
        <div
          className="flex-1 overflow-auto
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          <div className="min-w-[1400px]">
            {/* Table Header - Sticky */}
            <div className="sticky top-0 z-10 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              <div className="w-[8%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
              <div className="w-[10%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Ledger Date</div>
              <div className="w-[9%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Customer ID</div>
              <div className="w-[18%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Firm Name</div>
              <div className="w-[12%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Ledger Category</div>
              <div className="w-[9%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Earn Point</div>
              <div className="w-[9%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Redeem Point</div>
              <div className="w-[9%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Expire Points</div>
              <div className="w-[8%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Balance Point</div>
              <div className="w-[8%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Action</div>
            </div>

            {/* Table Body */}
            <div>
              {ledgers.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                  No point ledger records found.
                </div>
              ) : (
                currentLedgers.map((ledger, index) => (
                  <div
                    key={ledger.id}
                    className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                      index === currentLedgers.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className="w-[8%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                      {ledger.id}
                    </div>
                    <div className="w-[10%] text-sm text-zinc-600 dark:text-zinc-400">
                      {ledger.ledgerDate}
                    </div>
                    <div className="w-[9%] text-sm text-zinc-600 dark:text-zinc-400">
                      {ledger.customerId}
                    </div>
                    <div className="w-[18%] text-sm font-medium text-zinc-950 dark:text-white truncate pr-2">
                      {ledger.firmName}
                    </div>
                    <div className="w-[12%] text-sm text-zinc-600 dark:text-zinc-400">
                      {ledger.ledgerCategory}
                    </div>
                    <div className="w-[9%] text-sm text-zinc-600 dark:text-zinc-400">
                      {ledger.earnPoint}
                    </div>
                    <div className="w-[9%] text-sm text-zinc-600 dark:text-zinc-400">
                      {ledger.redeemPoint}
                    </div>
                    <div className="w-[9%] text-sm text-zinc-600 dark:text-zinc-400">
                      {ledger.expirePoints}
                    </div>
                    <div className="w-[8%] text-sm text-zinc-600 dark:text-zinc-400">
                      {ledger.balancePoint}
                    </div>
                    <div className="w-[8%] px-2 flex items-center justify-center">
                      <Button color="dark/zinc" onClick={() => handleView(ledger)} className="text-xs">
                        View
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pagination Footer */}
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* View Point Ledger Modal */}
      <Alert open={activeModal === 'view'} onClose={closeModal} size="3xl">
        <AlertTitle>Show Point Ledger</AlertTitle>
        <AlertDescription>Detailed view of point ledger transaction</AlertDescription>

        {selectedLedger && (
          <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">ID</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedLedger.id}
                </div>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Ledger Date
                </div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedLedger.ledgerDate}
                </div>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Customer ID
                </div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedLedger.customerId}
                </div>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Firm Name
                </div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedLedger.firmName}
                </div>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Ledger Category
                </div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedLedger.ledgerCategory}
                </div>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Total Record
                </div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedLedger.totalRecord || 'N/A'}
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Credit Narration
              </div>
              <div className="text-sm text-zinc-900 dark:text-zinc-100">
                {selectedLedger.creditNarration || 'N/A'}
              </div>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Debit Narration
              </div>
              <div className="text-sm text-zinc-900 dark:text-zinc-100">
                {selectedLedger.debitNarration || 'N/A'}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">
                  Earn Point
                </div>
                <div className="text-lg font-bold text-green-700 dark:text-green-300">
                  {selectedLedger.earnPoint}
                </div>
              </div>

              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">
                  Redeem Point
                </div>
                <div className="text-lg font-bold text-red-700 dark:text-red-300">
                  {selectedLedger.redeemPoint}
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-1">
                  Expire Points
                </div>
                <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
                  {selectedLedger.expirePoints}
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                  Balance Point
                </div>
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                  {selectedLedger.balancePoint}
                </div>
              </div>
            </div>
          </div>
        )}

        <AlertActions>
          <Button color="dark/zinc" onClick={closeModal}>
            Close
          </Button>
        </AlertActions>
      </Alert>
    </div>
  )
}
