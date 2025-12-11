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
} from '@/components/pagination'
import { PlusIcon, EyeIcon, PencilSquareIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/** District entity interface */
export interface District {
  id: number
  name: string
}

/** City entity interface - matches backend model */
export interface City {
  id: number
  districtId: number
  districtName: string
  cityName: string
}

/** Modal types for different actions */
type ModalType = 'view' | 'edit' | 'delete' | 'add' | null

// ============================================================================
// CONSTANTS
// ============================================================================

const ITEMS_PER_PAGE = 10

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

// Sample district data
const initialDistricts: District[] = [
  { id: 1, name: 'Indore' },
  { id: 2, name: 'Bhopal' },
  { id: 3, name: 'Gwalior' },
  { id: 4, name: 'Mumbai' },
  { id: 5, name: 'Pune' },
  { id: 6, name: 'Nashik' },
  { id: 7, name: 'Ahmedabad' },
  { id: 8, name: 'Surat' },
]

// Sample city data
const initialCities: City[] = [
  { id: 1, districtId: 1, districtName: 'Indore', cityName: 'Indore City' },
  { id: 2, districtId: 1, districtName: 'Indore', cityName: 'Mhow' },
  { id: 3, districtId: 2, districtName: 'Bhopal', cityName: 'Bhopal City' },
  { id: 4, districtId: 2, districtName: 'Bhopal', cityName: 'Raisen' },
  { id: 5, districtId: 4, districtName: 'Mumbai', cityName: 'Mumbai City' },
  { id: 6, districtId: 4, districtName: 'Mumbai', cityName: 'Thane' },
  { id: 7, districtId: 5, districtName: 'Pune', cityName: 'Pune City' },
  { id: 8, districtId: 7, districtName: 'Ahmedabad', cityName: 'Ahmedabad City' },
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

function ViewCityAlert({
  isOpen,
  onClose,
  city,
}: {
  isOpen: boolean
  onClose: () => void
  city: City | null
}) {
  if (!city) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>City Details</AlertTitle>
      <AlertDescription>
        View the details of the selected city below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{city.id}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">District:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{city.districtName}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">City Name:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{city.cityName}</span>
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

function EditCityAlert({
  isOpen,
  onClose,
  city,
  districts,
  onSave,
}: {
  isOpen: boolean
  onClose: () => void
  city: City | null
  districts: District[]
  onSave: (id: number, districtId: number, districtName: string, cityName: string) => void
}) {
  const [editedDistrictId, setEditedDistrictId] = useState<number>(0)
  const [editedCityName, setEditedCityName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populate form when city changes
  useEffect(() => {
    if (city && isOpen) {
      setEditedDistrictId(city.districtId)
      setEditedCityName(city.cityName)
    }
  }, [city, isOpen])

  // Handle save action
  const handleSave = async () => {
    if (!city || !editedCityName.trim() || editedDistrictId === 0) return

    setIsSubmitting(true)
    
    const selectedDistrict = districts.find(d => d.id === editedDistrictId)
    const districtName = selectedDistrict?.name || ''

    // Simulating API call with timeout
    setTimeout(() => {
      onSave(city.id, editedDistrictId, districtName, editedCityName.trim())
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  // Handle cancel
  const handleCancel = () => {
    setEditedDistrictId(0)
    setEditedCityName('')
    onClose()
  }

  if (!city) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit City</AlertTitle>
      <AlertDescription>
        Update the city details below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="editDistrictSelect" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              District
            </label>
            <select
              id="editDistrictSelect"
              value={editedDistrictId}
              onChange={(e) => setEditedDistrictId(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value={0}>Select a district</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="editCityName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              City Name
            </label>
            <Input
              id="editCityName"
              type="text"
              value={editedCityName}
              onChange={(e) => setEditedCityName(e.target.value)}
              placeholder="Enter city name"
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
          disabled={!editedCityName.trim() || editedDistrictId === 0 || isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD CITY ALERT COMPONENT
// ============================================================================

function AddCityAlert({
  isOpen,
  onClose,
  districts,
  onAdd,
}: {
  isOpen: boolean
  onClose: () => void
  districts: District[]
  onAdd: (districtId: number, districtName: string, cityName: string) => void
}) {
  const [selectedDistrictId, setSelectedDistrictId] = useState<number>(0)
  const [newCityName, setNewCityName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedDistrictId(0)
      setNewCityName('')
    }
  }, [isOpen])

  // Handle add action
  const handleAdd = async () => {
    if (!newCityName.trim() || selectedDistrictId === 0) return

    setIsSubmitting(true)
    
    const selectedDistrict = districts.find(d => d.id === selectedDistrictId)
    const districtName = selectedDistrict?.name || ''

    // Simulating API call with timeout
    setTimeout(() => {
      onAdd(selectedDistrictId, districtName, newCityName.trim())
      setIsSubmitting(false)
      setSelectedDistrictId(0)
      setNewCityName('')
      onClose()
    }, 300)
  }

  // Handle cancel
  const handleCancel = () => {
    setSelectedDistrictId(0)
    setNewCityName('')
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New City</AlertTitle>
      <AlertDescription>
        Enter the details of the new city below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="districtSelect" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              District
            </label>
            <select
              id="districtSelect"
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              autoFocus
            >
              <option value={0}>Select a district</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="newCityName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              City Name
            </label>
            <Input
              id="newCityName"
              type="text"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              placeholder="Enter city name"
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
          disabled={!newCityName.trim() || selectedDistrictId === 0 || isSubmitting}
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

function DeleteCityAlert({
  isOpen,
  onClose,
  city,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  city: City | null
  onConfirm: (id: number) => void
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!city) return

    setIsDeleting(true)

    // Simulating API call with timeout
    setTimeout(() => {
      onConfirm(city.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!city) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this city?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{city.cityName}</strong> 
        from <strong className="text-zinc-900 dark:text-white">{city.districtName}</strong>. 
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

export default function CityPage() {
  // State management for the lists
  const [cities, setCities] = useState<City[]>(initialCities)
  const [districts] = useState<District[]>(initialDistricts)

  // Modal state management
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(cities.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCities = cities.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // ============================================================================
  // ACTION HANDLERS
  // ============================================================================

  /** Open view modal for a city */
  const handleView = (city: City) => {
    setSelectedCity(city)
    setActiveModal('view')
  }

  /** Open edit modal for a city */
  const handleEdit = (city: City) => {
    setSelectedCity(city)
    setActiveModal('edit')
  }

  /** Open delete confirmation modal for a city */
  const handleDelete = (city: City) => {
    setSelectedCity(city)
    setActiveModal('delete')
  }

  /** Open add city modal */
  const handleAddClick = () => {
    setActiveModal('add')
  }

  /** Close all modals */
  const closeModal = () => {
    setActiveModal(null)
    setSelectedCity(null)
  }

  // ============================================================================
  // CRUD HANDLERS - Ready for backend integration
  // ============================================================================

  const handleImportExcel = () => console.log('Import from Excel clicked')
  const handleExportExcel = () => console.log('Export to Excel clicked')
  const handleDownloadFormat = () => console.log('Download Format clicked')

  const handleAddCity = (districtId: number, districtName: string, cityName: string) => {
    const newId = cities.length > 0 ? Math.max(...cities.map(c => c.id)) + 1 : 1
    const newCity: City = { id: newId, districtId, districtName, cityName }
    setCities((prevCities) => [...prevCities, newCity])
  }

  const handleSaveEdit = (id: number, districtId: number, districtName: string, cityName: string) => {
    setCities((prevCities) =>
      prevCities.map((city) =>
        city.id === id ? { ...city, districtId, districtName, cityName } : city
      )
    )
  }

  const handleConfirmDelete = (id: number) => {
    setCities((prevCities) => prevCities.filter((city) => city.id !== id))
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
            <Heading>Cities</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all cities in the system
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
              Add City
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Horizontal Scroll Container */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden
          [&::-webkit-scrollbar]:h-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          <div className="min-w-[700px] flex flex-col h-full">
            {/* Table Header - Fixed */}
            <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              <div className="w-[100px] px-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">ID</div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">District</div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">City Name</div>
              <div className="w-[160px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
            </div>

            {/* Scrollable Table Body */}
            <div className="flex-1 overflow-y-auto
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-zinc-300
              [&::-webkit-scrollbar-thumb]:rounded-full
              dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
            >
              {cities.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                  No cities found. Click "Add City" to create one.
                </div>
              ) : (
                currentCities.map((city, index) => (
                  <div 
                    key={city.id} 
                    className={`flex items-center py-4 border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                      index === currentCities.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className="w-[100px] px-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums text-center">
                      {city.id}
                    </div>
                    <div className="flex-1 px-4 text-sm font-medium text-zinc-950 dark:text-white text-center">
                      {city.districtName}
                    </div>
                    <div className="flex-1 px-4 text-sm font-medium text-zinc-950 dark:text-white text-center">
                      {city.cityName}
                    </div>
                    <div className="w-[160px] px-4 flex items-center justify-center gap-3">
                      <ActionButton 
                        variant="view" 
                        title="View"
                        onClick={() => handleView(city)}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </ActionButton>
                      <ActionButton 
                        variant="edit" 
                        title="Edit"
                        onClick={() => handleEdit(city)}
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </ActionButton>
                      <ActionButton 
                        variant="delete" 
                        title="Delete"
                        onClick={() => handleDelete(city)}
                      >
                        <DeleteIcon className="w-4 h-4" />
                      </ActionButton>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pagination Footer */}
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

      {/* Add City Alert */}
      <AddCityAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        districts={districts}
        onAdd={handleAddCity}
      />

      {/* View City Alert */}
      <ViewCityAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        city={selectedCity}
      />

      {/* Edit City Alert */}
      <EditCityAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        city={selectedCity}
        districts={districts}
        onSave={handleSaveEdit}
      />

      {/* Delete City Alert */}
      <DeleteCityAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        city={selectedCity}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

