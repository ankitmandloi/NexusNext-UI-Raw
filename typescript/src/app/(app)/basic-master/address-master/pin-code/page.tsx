'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@/components/pagination'
import { PlusIcon, EyeIcon, PencilSquareIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/** City entity interface */
export interface City {
  id: number
  name: string
}

/** Pincode entity interface - matches backend model */
export interface Pincode {
  id: number
  cityId: number
  cityName: string
  pincode: string
}

/** Modal types for different actions */
type ModalType = 'view' | 'edit' | 'delete' | 'add' | null

// ============================================================================
// CUSTOM ICONS
// ============================================================================

/** Custom delete/trash icon */
function DeleteIcon({ className }: { className?: string }) {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      className={className}
    >
      <polyline points="3,6 5,6 21,6"></polyline>
      <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
    </svg>
  )
}

// ============================================================================
// INITIAL DATA
// ============================================================================

// Sample city data
const initialCities: City[] = [
  { id: 1, name: 'Indore City' },
  { id: 2, name: 'Mhow' },
  { id: 3, name: 'Bhopal City' },
  { id: 4, name: 'Raisen' },
  { id: 5, name: 'Mumbai City' },
  { id: 6, name: 'Thane' },
  { id: 7, name: 'Pune City' },
  { id: 8, name: 'Ahmedabad City' },
]

// Sample pincode data
const initialPincodes: Pincode[] = [
  { id: 1, cityId: 1, cityName: 'Indore City', pincode: '452001' },
  { id: 2, cityId: 1, cityName: 'Indore City', pincode: '452002' },
  { id: 3, cityId: 2, cityName: 'Mhow', pincode: '453441' },
  { id: 4, cityId: 3, cityName: 'Bhopal City', pincode: '462001' },
  { id: 5, cityId: 3, cityName: 'Bhopal City', pincode: '462002' },
  { id: 6, cityId: 5, cityName: 'Mumbai City', pincode: '400001' },
  { id: 7, cityId: 5, cityName: 'Mumbai City', pincode: '400002' },
  { id: 8, cityId: 7, cityName: 'Pune City', pincode: '411001' },
]

// ============================================================================
// COMPONENTS
// ============================================================================

function ActionButton({
  children,
  variant,
  title,
  onClick,
}: {
  children: React.ReactNode
  variant: 'view' | 'edit' | 'delete'
  title: string
  onClick?: () => void
}) {
  const variantStyles = {
    view: 'hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10',
    edit: 'hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 dark:hover:text-amber-400 dark:hover:border-amber-500/50 dark:hover:bg-amber-500/10',
    delete: 'hover:text-red-600 hover:border-red-300 hover:bg-red-50 dark:hover:text-red-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10',
  }

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        w-8 h-8 rounded-md
        border border-zinc-200 dark:border-zinc-700
        bg-white dark:bg-zinc-800
        text-zinc-500 dark:text-zinc-400
        transition-all duration-150 ease-in-out
        hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900
        ${variantStyles[variant]}
      `}
    >
      {children}
    </button>
  )
}

// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================

function ViewPincodeAlert({
  isOpen,
  onClose,
  pincode,
}: {
  isOpen: boolean
  onClose: () => void
  pincode: Pincode | null
}) {
  if (!pincode) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Pincode Details</AlertTitle>
      <AlertDescription>
        View the details of the selected pincode below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{pincode.id}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">City:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{pincode.cityName}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Pin Code:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{pincode.pincode}</span>
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

function EditPincodeAlert({
  isOpen,
  onClose,
  pincode,
  cities,
  onSave,
}: {
  isOpen: boolean
  onClose: () => void
  pincode: Pincode | null
  cities: City[]
  onSave: (id: number, cityId: number, cityName: string, pincodeValue: string) => void
}) {
  const [editedCityId, setEditedCityId] = useState<number>(0)
  const [editedPincode, setEditedPincode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populate form when pincode changes
  useEffect(() => {
    if (pincode && isOpen) {
      setEditedCityId(pincode.cityId)
      setEditedPincode(pincode.pincode)
    }
  }, [pincode, isOpen])

  // Handle save action
  const handleSave = async () => {
    if (!pincode || !editedPincode.trim() || editedCityId === 0) return

    setIsSubmitting(true)
    
    const selectedCity = cities.find(c => c.id === editedCityId)
    const cityName = selectedCity?.name || ''

    // Simulating API call with timeout
    setTimeout(() => {
      onSave(pincode.id, editedCityId, cityName, editedPincode.trim())
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  // Handle cancel
  const handleCancel = () => {
    setEditedCityId(0)
    setEditedPincode('')
    onClose()
  }

  if (!pincode) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Pincode</AlertTitle>
      <AlertDescription>
        Update the pincode details below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="editCitySelect" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              City
            </label>
            <select
              id="editCitySelect"
              value={editedCityId}
              onChange={(e) => setEditedCityId(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value={0}>Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="editPincode" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Pin Code
            </label>
            <Input
              id="editPincode"
              type="text"
              value={editedPincode}
              onChange={(e) => setEditedPincode(e.target.value)}
              placeholder="Enter pin code"
              autoFocus
            />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button 
          color="dark/zinc" 
          onClick={handleSave} 
          disabled={!editedPincode.trim() || editedCityId === 0 || isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD PINCODE ALERT COMPONENT
// ============================================================================

function AddPincodeAlert({
  isOpen,
  onClose,
  cities,
  onAdd,
}: {
  isOpen: boolean
  onClose: () => void
  cities: City[]
  onAdd: (cityId: number, cityName: string, pincodeValue: string) => void
}) {
  const [selectedCityId, setSelectedCityId] = useState<number>(0)
  const [newPincode, setNewPincode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedCityId(0)
      setNewPincode('')
    }
  }, [isOpen])

  // Handle add action
  const handleAdd = async () => {
    if (!newPincode.trim() || selectedCityId === 0) return

    setIsSubmitting(true)
    
    const selectedCity = cities.find(c => c.id === selectedCityId)
    const cityName = selectedCity?.name || ''

    // Simulating API call with timeout
    setTimeout(() => {
      onAdd(selectedCityId, cityName, newPincode.trim())
      setIsSubmitting(false)
      setSelectedCityId(0)
      setNewPincode('')
      onClose()
    }, 300)
  }

  // Handle cancel
  const handleCancel = () => {
    setSelectedCityId(0)
    setNewPincode('')
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New Pincode</AlertTitle>
      <AlertDescription>
        Enter the details of the new pincode below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="citySelect" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              City
            </label>
            <select
              id="citySelect"
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              autoFocus
            >
              <option value={0}>Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="newPincode" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Pin Code
            </label>
            <Input
              id="newPincode"
              type="text"
              value={newPincode}
              onChange={(e) => setNewPincode(e.target.value)}
              placeholder="Enter pin code"
            />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button 
          color="dark/zinc" 
          onClick={handleAdd} 
          disabled={!newPincode.trim() || selectedCityId === 0 || isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeletePincodeAlert({
  isOpen,
  onClose,
  pincode,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  pincode: Pincode | null
  onConfirm: (id: number) => void
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!pincode) return

    setIsDeleting(true)

    // Simulating API call with timeout
    setTimeout(() => {
      onConfirm(pincode.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!pincode) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this pincode?</AlertTitle>
      <AlertDescription>
        You are about to delete pincode <strong className="text-zinc-900 dark:text-white">{pincode.pincode}</strong> 
        from <strong className="text-zinc-900 dark:text-white">{pincode.cityName}</strong>. 
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

export default function PincodePage() {
  // State management for the lists
  const [pincodes, setPincodes] = useState<Pincode[]>(initialPincodes)
  const [cities] = useState<City[]>(initialCities)

  // Modal state management
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [selectedPincode, setSelectedPincode] = useState<Pincode | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate pagination
  const totalPages = Math.ceil(pincodes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPincodes = pincodes.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // ============================================================================
  // ACTION HANDLERS
  // ============================================================================

  /** Open view modal for a pincode */
  const handleView = (pincode: Pincode) => {
    setSelectedPincode(pincode)
    setActiveModal('view')
  }

  /** Open edit modal for a pincode */
  const handleEdit = (pincode: Pincode) => {
    setSelectedPincode(pincode)
    setActiveModal('edit')
  }

  /** Open delete confirmation modal for a pincode */
  const handleDelete = (pincode: Pincode) => {
    setSelectedPincode(pincode)
    setActiveModal('delete')
  }

  /** Open add pincode modal */
  const handleAddClick = () => {
    setActiveModal('add')
  }

  /** Close all modals */
  const closeModal = () => {
    setActiveModal(null)
    setSelectedPincode(null)
  }

  // ============================================================================
  // CRUD HANDLERS - Ready for backend integration
  // ============================================================================

  /**
   * Handle Excel import
   * TODO: Integrate with file upload and backend API
   */
  const handleImportExcel = () => {
    console.log('Import from Excel clicked')
  }

  /**
   * Handle Excel export
   * TODO: Integrate with backend API to generate Excel file
   */
  const handleExportExcel = () => {
    console.log('Export to Excel clicked')
  }

  /**
   * Handle format download
   * TODO: Integrate with backend API to download template
   */
  const handleDownloadFormat = () => {
    console.log('Download Format clicked')
  }

  /**
   * Add a new pincode to the list
   * @param cityId - The ID of the city
   * @param cityName - The name of the city
   * @param pincodeValue - The pincode value
   */
  const handleAddPincode = (cityId: number, cityName: string, pincodeValue: string) => {
    // Generate a temporary ID (in production, this would come from the backend)
    const newId = pincodes.length > 0 ? Math.max(...pincodes.map(p => p.id)) + 1 : 1
    const newPincode: Pincode = { id: newId, cityId, cityName, pincode: pincodeValue }
    setPincodes((prevPincodes) => [...prevPincodes, newPincode])
  }

  /**
   * Update a pincode in the list
   * @param id - The ID of the pincode to update
   * @param cityId - The new city ID
   * @param cityName - The new city name
   * @param pincodeValue - The new pincode value
   */
  const handleSaveEdit = (id: number, cityId: number, cityName: string, pincodeValue: string) => {
    setPincodes((prevPincodes) =>
      prevPincodes.map((pincode) =>
        pincode.id === id ? { ...pincode, cityId, cityName, pincode: pincodeValue } : pincode
      )
    )
  }

  /**
   * Delete a pincode from the list
   * @param id - The ID of the pincode to delete
   */
  const handleConfirmDelete = (id: number) => {
    setPincodes((prevPincodes) => prevPincodes.filter((pincode) => pincode.id !== id))
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Pincodes</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all pincodes in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown>
              <DropdownButton outline>
                Your Data
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu>
                <DropdownItem onClick={handleImportExcel}>
                  Import from Excel
                </DropdownItem>
                <DropdownItem onClick={handleExportExcel}>
                  Export to Excel
                </DropdownItem>
                <DropdownItem onClick={handleDownloadFormat}>
                  Download Format
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Add Pincode
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[10%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[40%] text-sm font-medium text-zinc-500 dark:text-zinc-400">City</div>
          <div className="w-[30%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Pin Code</div>
          <div className="w-[20%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
        </div>

        {/* Scrollable Table Body */}
        <div className="flex-1 overflow-y-auto overflow-x-auto
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          {pincodes.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No pincodes found. Click "Add Pincode" to create one.
            </div>
          ) : (
            currentPincodes.map((pincode, index) => (
              <div 
                key={pincode.id} 
                className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                  index === currentPincodes.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="w-[10%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                  {pincode.id}
                </div>
                <div className="w-[40%] text-sm font-medium text-zinc-950 dark:text-white">
                  {pincode.cityName}
                </div>
                <div className="w-[30%] text-sm font-medium text-zinc-950 dark:text-white">
                  {pincode.pincode}
                </div>
                <div className="w-[20%] flex items-center justify-center gap-2">
                  <ActionButton 
                    variant="view" 
                    title="View"
                    onClick={() => handleView(pincode)}
                  >
                    <EyeIcon className="w-4 h-4" />
                  </ActionButton>
                  <ActionButton 
                    variant="edit" 
                    title="Edit"
                    onClick={() => handleEdit(pincode)}
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                  </ActionButton>
                  <ActionButton 
                    variant="delete" 
                    title="Delete"
                    onClick={() => handleDelete(pincode)}
                  >
                    <DeleteIcon className="w-4 h-4" />
                  </ActionButton>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer - Same height as header */}
        <div className="flex items-center justify-center border-t border-zinc-950/5 dark:border-white/5 px-4 h-11 shrink-0">
          <Pagination>
            <button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <PaginationList>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 mx-1 text-sm rounded ${
                    page === currentPage
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {page}
                </button>
              ))}
            </PaginationList>
            <button
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </Pagination>
        </div>
      </div>

      {/* ================================================================== */}
      {/* ALERT MODALS */}
      {/* ================================================================== */}

      {/* Add Pincode Alert */}
      <AddPincodeAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        cities={cities}
        onAdd={handleAddPincode}
      />

      {/* View Pincode Alert */}
      <ViewPincodeAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        pincode={selectedPincode}
      />

      {/* Edit Pincode Alert */}
      <EditPincodeAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        pincode={selectedPincode}
        cities={cities}
        onSave={handleSaveEdit}
      />

      {/* Delete Pincode Alert */}
      <DeletePincodeAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        pincode={selectedPincode}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
