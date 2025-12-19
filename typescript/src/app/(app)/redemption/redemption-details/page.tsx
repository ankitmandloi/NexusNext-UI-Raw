// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Badge } from '@/components/badge'
import Header from '@/app/(app)/basic-master/address-master/common/components/Header.jsx'
import CommonTable from '@/app/(app)/basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import Actions from '@/app/(app)/basic-master/address-master/common/components/Actions.jsx'
import { RedemptionRecord, redemptionData } from './data'
import { BanknotesIcon, WalletIcon } from '@heroicons/react/24/outline'

const ITEMS_PER_PAGE = 10

type ModalState = 'detail' | null

export default function RedemptionDetailsPage() {
  const [records, setRecords] = useState<RedemptionRecord[]>(redemptionData)
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedRecord, setSelectedRecord] = useState<RedemptionRecord | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [utrNumber, setUtrNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter records by search query
  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return records
    const query = searchQuery.toLowerCase()
    return records.filter(
      (record) =>
        record.customerName.toLowerCase().includes(query) ||
        record.city.toLowerCase().includes(query) ||
        record.customerType.toLowerCase().includes(query) ||
        record.redemptionType.toLowerCase().includes(query)
    )
  }, [records, searchQuery])

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredRecords.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [filteredRecords, currentPage])

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredRecords.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredRecords, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openDetailModal = (record: RedemptionRecord) => {
    setActiveModal('detail')
    setSelectedRecord(record)
    setUtrNumber(record.utrNumber || '')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedRecord(null)
    setUtrNumber('')
    setIsSubmitting(false)
  }

  const handleUpdateUTR = async () => {
    if (!selectedRecord || !utrNumber.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setRecords((prev) =>
        prev.map((record) =>
          record.id === selectedRecord.id
            ? { ...record, utrNumber: utrNumber.trim(), status: 'Completed' }
            : record
        )
      )
      setIsSubmitting(false)
      closeModal()
    }, 500)
  }

  const handleForceClose = async () => {
    if (!selectedRecord) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setRecords((prev) =>
        prev.map((record) =>
          record.id === selectedRecord.id ? { ...record, status: 'Rejected' } : record
        )
      )
      setIsSubmitting(false)
      closeModal()
    }, 500)
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN')
  }

  const tableRows = paginatedRecords.map((record) => ({
    customerName: record.customerName,
    date: record.date,
    city: record.city,
    customerType: record.customerType,
    redemptionType: record.redemptionType,
    points: `${formatNumber(record.points)} Points`,
    status: record.status,
    raw: record,
  }))

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title={
          <>
            Redemption &nbsp;
            <span className="text-zinc-600 dark:text-zinc-300">Redemption Details</span>
          </>
        }
        subtitle="View and manage customer redemption requests"
        addLabel=""
        showAddButton={false}
        dropdownOptions={[
          { label: 'Export to Excel' },
          { label: 'Download Report' },
          { label: 'Filter by Status' },
        ]}
      />

      {/* Search Bar */}
      <div className="px-6 py-4 border-b border-zinc-950/10 dark:border-white/10">
        <Input
          type="text"
          placeholder="Search Customer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* @ts-ignore - CommonTable is a JSX component */}
      <CommonTable
        data={tableRows}
        emptyMessage="No redemption records found."
        minWidth="1400px"
        stickyColumns={true}
        columns={[
          { key: 'customerName', label: 'Customer Name', width: '200px' },
          { key: 'date', label: 'Date', width: '130px' },
          { key: 'city', label: 'City', width: '130px' },
          { key: 'customerType', label: 'Customer Type', width: '150px' },
          { key: 'redemptionType', label: 'Redemption Type', width: '170px' },
          { key: 'points', label: 'Points', width: '130px' },
          { key: 'status', label: 'Status', width: '120px' },
        ]}
        renderActions={(row) => (
          <Actions onView={() => openDetailModal(row.raw)} hideEdit hideDelete />
        )}
        pagination={
          <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        }
      />

      {/* Detail Modal */}
      {selectedRecord && (
        <Alert open={activeModal === 'detail'} onClose={closeModal} size="2xl">
          <AlertTitle className="flex items-center gap-3">
            {selectedRecord.redemptionType === 'Bank' ? (
              <BanknotesIcon className="w-6 h-6 text-green-600" />
            ) : (
              <WalletIcon className="w-6 h-6 text-blue-600" />
            )}
            {selectedRecord.redemptionType}
          </AlertTitle>
          <AlertDescription>
            <div className="space-y-1">
              <div className="text-sm font-medium">Customer Type: {selectedRecord.customerType}</div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                {selectedRecord.customerName}
              </div>
            </div>
          </AlertDescription>

          <AlertBody>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Redemption Request Info */}
              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
                <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Redemption Request
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  This Request generated by customer on {selectedRecord.requestGeneratedOn}
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {formatNumber(selectedRecord.points)}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Redeemed Points</div>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Worth: Rs {formatNumber(selectedRecord.worth || 0)}
                </div>
              </div>

              {/* Customer Details */}
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                  Customer Information
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Name</div>
                    <div className="text-sm font-medium">{selectedRecord.customerName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Type</div>
                    <div className="text-sm font-medium">{selectedRecord.customerType}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Contact</div>
                    <div className="text-sm font-medium">
                      {selectedRecord.contactPerson} - {selectedRecord.contactNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Location</div>
                    <div className="text-sm font-medium">
                      {selectedRecord.city} - {selectedRecord.state}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Assigned Employee</div>
                    <div className="text-sm font-medium">{selectedRecord.assignedEmployee}</div>
                  </div>
                </div>
              </div>

              {/* Points Breakdown */}
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                  Points Breakdown
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex justify-between p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Points:</span>
                    <span className="text-sm font-medium">{formatNumber(selectedRecord.points)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Amount:</span>
                    <span className="text-sm font-medium">Rs {formatNumber(selectedRecord.amount || 0)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">TDS:</span>
                    <span className="text-sm font-medium">{selectedRecord.tds || 0}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Total Point Deducted:</span>
                    <span className="text-sm font-medium">
                      {formatNumber(selectedRecord.totalPointsDeducted || 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bank Information - Only for Bank redemption type */}
              {selectedRecord.redemptionType === 'Bank' && (
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                    Bank Information
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">Account Number:</span>
                      <span className="text-sm font-medium">{selectedRecord.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">Account Holder Name:</span>
                      <span className="text-sm font-medium">{selectedRecord.accountHolderName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">IFSC Code:</span>
                      <span className="text-sm font-medium">{selectedRecord.ifscCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">Bank:</span>
                      <span className="text-sm font-medium">{selectedRecord.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">PAN NUMBER:</span>
                      <span className="text-sm font-medium">{selectedRecord.panNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">Aadhar number:</span>
                      <span className="text-sm font-medium">{selectedRecord.aadharNumber}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* UTR Details */}
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">UTR Details</div>
                <Input
                  type="text"
                  placeholder="Enter UTR Number"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                />
                {selectedRecord.utrNumber && (
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    Current UTR: {selectedRecord.utrNumber}
                  </div>
                )}
              </div>
            </div>
          </AlertBody>

          <AlertActions>
            <Button plain onClick={closeModal} disabled={isSubmitting}>
              Close
            </Button>
            <Button color="red" onClick={handleForceClose} disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Force Close'}
            </Button>
            <Button color="dark/zinc" onClick={handleUpdateUTR} disabled={isSubmitting || !utrNumber.trim()}>
              {isSubmitting ? 'Updating...' : 'Update UTR'}
            </Button>
          </AlertActions>
        </Alert>
      )}
    </div>
  )
}
