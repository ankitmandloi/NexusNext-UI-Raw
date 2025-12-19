// @ts-nocheck
'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'
import { Combobox, ComboboxOption } from '@/components/combobox'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/16/solid'
import {
  CreditNote,
  initialCreditNotes,
  typeOptions,
  statusOptions,
  sampleCustomers,
} from './data'

const ITEMS_PER_PAGE = 10

export default function CreditNotePage() {
  const [creditNotes, setCreditNotes] = useState<CreditNote[]>(initialCreditNotes)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Create form state
  const [createForm, setCreateForm] = useState({
    type: '',
    selectedCustomer: null,
    points: '1',
    narration: '',
    attachment: null,
    status: '1',
  })

  // Calculate pagination
  const filteredCreditNotes = creditNotes.filter((cn) => {
    const query = searchQuery.toLowerCase()
    return (
      cn.docNo.toLowerCase().includes(query) ||
      cn.firmName.toLowerCase().includes(query) ||
      cn.ownerFirstName.toLowerCase().includes(query) ||
      cn.ownerLastName.toLowerCase().includes(query) ||
      cn.customerMobile.includes(query)
    )
  })

  const totalPages = Math.max(1, Math.ceil(filteredCreditNotes.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentCreditNotes = filteredCreditNotes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleCreateClick = () => {
    setCreateForm({
      type: '',
      selectedCustomer: null,
      points: '1',
      narration: '',
      attachment: null,
      status: '1',
    })
    setActiveModal('create')
  }

  const closeModal = () => {
    setActiveModal(null)
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

  // Handle Create Credit Note
  const handleCreateCreditNote = () => {
    if (!createForm.type || !createForm.selectedCustomer || !createForm.points) {
      alert('Please fill all required fields')
      return
    }

    const typeOption = typeOptions.find((t) => t.id === createForm.type)
    const statusOption = statusOptions.find((s) => s.id === createForm.status)

    const newCreditNote: CreditNote = {
      id: `CN${Date.now()}`,
      docNo: `CN-${new Date().getFullYear()}-${String(creditNotes.length + 1).padStart(3, '0')}`,
      type: typeOption?.name || '',
      custId: createForm.selectedCustomer.id,
      ownerFirstName: createForm.selectedCustomer.ownerFirstName,
      ownerLastName: createForm.selectedCustomer.ownerLastName,
      customerMobile: createForm.selectedCustomer.mobile,
      firmName: createForm.selectedCustomer.firmName,
      points: Number(createForm.points),
      narration: createForm.narration,
      attachment: createForm.attachment?.name || '',
      status: statusOption?.name || '',
    }

    setCreditNotes([newCreditNote, ...creditNotes])
    closeModal()
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Credit Note List</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all credit notes in the system
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
            <Button color="dark/zinc" onClick={handleCreateClick}>
              <PlusIcon />
              Create Credit Note
            </Button>
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
          <div className="min-w-[1600px]">
            {/* Table Header - Sticky */}
            <div className="sticky top-0 z-10 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              <div className="w-[7%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
              <div className="w-[10%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Doc No.</div>
              <div className="w-[10%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Type</div>
              <div className="w-[7%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Cust ID</div>
              <div className="w-[11%] text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Owner First Name
              </div>
              <div className="w-[11%] text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Owner Last Name
              </div>
              <div className="w-[11%] text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Customer Mobile
              </div>
              <div className="w-[16%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Firm Name</div>
              <div className="w-[7%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Points</div>
              <div className="w-[10%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Narration</div>
            </div>

            {/* Table Body */}
            <div>
              {filteredCreditNotes.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                  No credit notes found.
                </div>
              ) : (
                currentCreditNotes.map((creditNote, index) => (
                  <div
                    key={creditNote.id}
                    className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                      index === currentCreditNotes.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className="w-[7%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                      {creditNote.id}
                    </div>
                    <div className="w-[10%] text-sm font-medium text-zinc-950 dark:text-white">
                      {creditNote.docNo}
                    </div>
                    <div className="w-[10%] text-sm text-zinc-600 dark:text-zinc-400">
                      {creditNote.type}
                    </div>
                    <div className="w-[7%] text-sm text-zinc-600 dark:text-zinc-400">
                      {creditNote.custId}
                    </div>
                    <div className="w-[11%] text-sm text-zinc-600 dark:text-zinc-400">
                      {creditNote.ownerFirstName}
                    </div>
                    <div className="w-[11%] text-sm text-zinc-600 dark:text-zinc-400">
                      {creditNote.ownerLastName}
                    </div>
                    <div className="w-[11%] text-sm text-zinc-600 dark:text-zinc-400">
                      {creditNote.customerMobile}
                    </div>
                    <div className="w-[16%] text-sm text-zinc-600 dark:text-zinc-400 truncate pr-2">
                      {creditNote.firmName}
                    </div>
                    <div className="w-[7%] text-sm font-semibold text-zinc-950 dark:text-white">
                      {creditNote.points}
                    </div>
                    <div className="w-[10%] text-sm text-zinc-600 dark:text-zinc-400 truncate pr-2">
                      {creditNote.narration}
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

      {/* Create Credit Note Modal */}
      {activeModal === 'create' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-950/10 dark:border-white/10">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Create Credit Note
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Type*
                </label>
                <Select
                  value={createForm.type}
                  onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
                >
                  <option value="">Please select</option>
                  {typeOptions.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Firm Name (Searchable) */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Firm Name*
                </label>
                <Combobox
                  value={createForm.selectedCustomer}
                  onChange={(customer) =>
                    setCreateForm({ ...createForm, selectedCustomer: customer })
                  }
                  options={sampleCustomers}
                  displayValue={(customer) => customer?.firmName ?? ''}
                  placeholder="Search Customer Mobile|Name|Email"
                >
                  {(customer) => (
                    <ComboboxOption value={customer}>
                      <div>
                        <div className="font-medium">{customer.firmName}</div>
                        <div className="text-xs text-zinc-500">
                          {customer.mobile} • {customer.email}
                        </div>
                      </div>
                    </ComboboxOption>
                  )}
                </Combobox>
              </div>

              {/* Points */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Points*
                </label>
                <Input
                  type="number"
                  min="1"
                  value={createForm.points}
                  onChange={(e) => setCreateForm({ ...createForm, points: e.target.value })}
                />
              </div>

              {/* Narration */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Narration
                </label>
                <Textarea
                  value={createForm.narration}
                  onChange={(e) => setCreateForm({ ...createForm, narration: e.target.value })}
                  placeholder="Enter narration"
                  rows={3}
                />
              </div>

              {/* Attachment */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Attachment
                </label>
                <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center">
                  <Input
                    type="file"
                    onChange={(e) =>
                      setCreateForm({ ...createForm, attachment: e.target.files[0] })
                    }
                    className="hidden"
                    id="credit-note-file-upload"
                  />
                  <label
                    htmlFor="credit-note-file-upload"
                    className="cursor-pointer text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    Drop files here to upload
                  </label>
                  {createForm.attachment && (
                    <p className="mt-2 text-sm text-zinc-900 dark:text-zinc-100">
                      {createForm.attachment.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Status*
                </label>
                <Select
                  value={createForm.status}
                  onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                >
                  {statusOptions.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-950/10 dark:border-white/10 flex justify-end gap-3">
              <Button plain onClick={closeModal}>
                Cancel
              </Button>
              <Button color="dark/zinc" onClick={handleCreateCreditNote}>
                Create Credit Note
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
