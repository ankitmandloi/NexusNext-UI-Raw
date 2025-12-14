'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import Actions from '../address-master/common/components/Actions.jsx'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import CommonPagination from '../address-master/common/components/Pagination.jsx'

import { PlusIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

// ============================================================================
// INITIAL DATA
// ============================================================================
const ITEMS_PER_PAGE = 10

// Sample customer type data - Replace with API call in production
const initialCustomerTypes = [
  { id: 1, customerType: 'Retail', loyaltyEntryType: 'Points' },
  { id: 2, customerType: 'Wholesale', loyaltyEntryType: 'Discount' },
  { id: 3, customerType: 'Distributor', loyaltyEntryType: 'Points' },
  { id: 4, customerType: 'Corporate', loyaltyEntryType: 'Cashback' },
  { id: 5, customerType: 'Individual', loyaltyEntryType: 'Points' },
  { id: 6, customerType: 'Enterprise', loyaltyEntryType: 'Discount' },
  { id: 7, customerType: 'SMB', loyaltyEntryType: 'Points' },
  { id: 8, customerType: 'Partner', loyaltyEntryType: 'Points' },
  { id: 9, customerType: 'Franchise', loyaltyEntryType: 'Discount' },
  { id: 10, customerType: 'Reseller', loyaltyEntryType: 'Cashback' },
  { id: 11, customerType: 'VIP', loyaltyEntryType: 'Points' },
  { id: 12, customerType: 'Premium', loyaltyEntryType: 'Points' },
]

const loyaltyEntryTypes = ['Points', 'Discount', 'Cashback', 'Miles', 'Credits']

// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================

function ViewCustomerTypeAlert({ isOpen, onClose, customerType }) {
  if (!customerType) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Customer Type Details</AlertTitle>
      <AlertDescription>
        View the details of the selected customer type below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{customerType.id}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Customer Type:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{customerType.customerType}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Loyalty Entry Type:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{customerType.loyaltyEntryType}</span>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button color="dark/zinc" onClick={onClose}>Close</Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// EDIT ALERT COMPONENT
// ============================================================================

function EditCustomerTypeAlert({ isOpen, onClose, customerType, onSave }) {
  const [editedCustomerType, setEditedCustomerType] = useState('')
  const [editedLoyaltyEntryType, setEditedLoyaltyEntryType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populate form when customerType changes
  useEffect(() => {
    if (customerType && isOpen) {
      setEditedCustomerType(customerType.customerType)
      setEditedLoyaltyEntryType(customerType.loyaltyEntryType)
    }
  }, [customerType, isOpen])

  // Handle save action
  const handleSave = async () => {
    if (!customerType || !editedCustomerType.trim() || !editedLoyaltyEntryType) return

    setIsSubmitting(true)

    // Simulating API call with timeout
    setTimeout(() => {
      onSave(customerType.id, editedCustomerType.trim(), editedLoyaltyEntryType)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  // Handle cancel
  const handleCancel = () => {
    setEditedCustomerType('')
    setEditedLoyaltyEntryType('')
    onClose()
  }

  if (!customerType) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Customer Type</AlertTitle>
      <AlertDescription>
        Update the customer type details below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="editCustomerType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Customer Type
            </label>
            <Input
              id="editCustomerType"
              type="text"
              value={editedCustomerType}
              onChange={(e) => setEditedCustomerType(e.target.value)}
              placeholder="Enter customer type"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="editLoyaltyEntryType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Loyalty Entry Type
            </label>
            <select
              id="editLoyaltyEntryType"
              value={editedLoyaltyEntryType}
              onChange={(e) => setEditedLoyaltyEntryType(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select loyalty entry type</option>
              {loyaltyEntryTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!editedCustomerType.trim() || !editedLoyaltyEntryType || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD CUSTOMER TYPE ALERT COMPONENT
// ============================================================================

function AddCustomerTypeAlert({ isOpen, onClose, onAdd }) {
  const [newCustomerType, setNewCustomerType] = useState('')
  const [newLoyaltyEntryType, setNewLoyaltyEntryType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setNewCustomerType('')
      setNewLoyaltyEntryType('')
    }
  }, [isOpen])

  // Handle add action
  const handleAdd = async () => {
    if (!newCustomerType.trim() || !newLoyaltyEntryType) return

    setIsSubmitting(true)

    // Simulating API call with timeout
    setTimeout(() => {
      onAdd(newCustomerType.trim(), newLoyaltyEntryType)
      setIsSubmitting(false)
      setNewCustomerType('')
      setNewLoyaltyEntryType('')
      onClose()
    }, 300)
  }

  // Handle cancel
  const handleCancel = () => {
    setNewCustomerType('')
    setNewLoyaltyEntryType('')
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New Customer Type</AlertTitle>
      <AlertDescription>
        Enter the details of the new customer type below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="newCustomerType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Customer Type
            </label>
            <Input
              id="newCustomerType"
              type="text"
              value={newCustomerType}
              onChange={(e) => setNewCustomerType(e.target.value)}
              placeholder="Enter customer type"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="newLoyaltyEntryType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Loyalty Entry Type
            </label>
            <select
              id="newLoyaltyEntryType"
              value={newLoyaltyEntryType}
              onChange={(e) => setNewLoyaltyEntryType(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select loyalty entry type</option>
              {loyaltyEntryTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!newCustomerType.trim() || !newLoyaltyEntryType || isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteCustomerTypeAlert({ isOpen, onClose, customerType, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false)

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!customerType) return

    setIsDeleting(true)

    // Simulating API call with timeout
    setTimeout(() => {
      onConfirm(customerType.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!customerType) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this customer type?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{customerType.customerType}</strong>. 
        This action cannot be undone. All associated data will be permanently removed.
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Yes, Delete'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function CustomerTypePage() {
  // State management for the list
  const [customerTypes, setCustomerTypes] = useState(initialCustomerTypes)

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedCustomerType, setSelectedCustomerType] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(customerTypes.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentCustomerTypes = customerTypes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ACTION HANDLERS

  const handleView = (customerType) => {
    setSelectedCustomerType(customerType)
    setActiveModal('view')
  }

  const handleEdit = (customerType) => {
    setSelectedCustomerType(customerType)
    setActiveModal('edit')
  }

  const handleDelete = (customerType) => {
    setSelectedCustomerType(customerType)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedCustomerType(null)
  }

  // IMPORT/EXPORT HANDLERS
  const handleImportExcel = () => {
    console.log('Import from Excel clicked')
    // TODO: Implement file upload logic
  }

  const handleExportExcel = () => {
    console.log('Export to Excel clicked')
    // TODO: Implement export logic
  }

  const handleDownloadFormat = () => {
    console.log('Download Format clicked')
    // TODO: Implement format download logic
  }

  // CRUD OPERATIONS

  const handleAddCustomerType = (customerType, loyaltyEntryType) => {
    const newId = customerTypes.length > 0 ? Math.max(...customerTypes.map(ct => ct.id)) + 1 : 1
    const newCustomerType = {
      id: newId,
      customerType,
      loyaltyEntryType,
    }
    setCustomerTypes(prev => [...prev, newCustomerType])
  }

  const handleSaveEdit = (id, customerType, loyaltyEntryType) => {
    setCustomerTypes(prev =>
      prev.map(ct =>
        ct.id === id
          ? { ...ct, customerType, loyaltyEntryType }
          : ct
      )
    )
  }

  const handleConfirmDelete = (id) => {
    setCustomerTypes(prev => prev.filter(ct => ct.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Customer Type</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage customer types and loyalty entry types
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
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Add Customer Type
            </Button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        <div className="flex-1 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div className="min-w-[700px] flex flex-col h-full">
            {/* Table Header */}
            <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              <div className="w-[100px] px-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">
                ID
              </div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">
                Customer Type
              </div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">
                Loyalty Entry Type
              </div>
              <div className="w-[160px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">
                Actions
              </div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
              {customerTypes.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                  No customer types found. Click "Add Customer Type" to create one.
                </div>
              ) : (
                currentCustomerTypes.map((customerType, index) => (
                  <div
                    key={customerType.id}
                    className={`flex items-center py-4 border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                      index === currentCustomerTypes.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className="w-[100px] px-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums text-center">
                      {customerType.id}
                    </div>
                    <div className="flex-1 px-4 text-sm font-medium text-zinc-950 dark:text-white text-center">
                      {customerType.customerType}
                    </div>
                    <div className="flex-1 px-4 text-sm text-zinc-600 dark:text-zinc-400 text-center">
                      {customerType.loyaltyEntryType}
                    </div>
                    <div className="w-[160px] px-4 flex items-center justify-center">
                      <Actions
                        onView={() => handleView(customerType)}
                        onEdit={() => handleEdit(customerType)}
                        onDelete={() => handleDelete(customerType)}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* MODALS */}
      <AddCustomerTypeAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        onAdd={handleAddCustomerType}
      />
      <ViewCustomerTypeAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        customerType={selectedCustomerType}
      />
      <EditCustomerTypeAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        customerType={selectedCustomerType}
        onSave={handleSaveEdit}
      />
      <DeleteCustomerTypeAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        customerType={selectedCustomerType}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
