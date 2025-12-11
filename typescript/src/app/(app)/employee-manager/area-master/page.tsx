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
// TYPES & SAMPLE DATA
// ============================================================================

interface City {
  id: number
  name: string
}

interface Area {
  id: number
  cityId: number
  cityName: string
  areaName: string
  areaCode: string
}

type ModalType = 'view' | 'edit' | 'delete' | 'add' | null

const ITEMS_PER_PAGE = 10

const initialCities: City[] = [
  { id: 1, name: 'Springfield' },
  { id: 2, name: 'Rivertown' },
  { id: 3, name: 'Lakeside' },
  { id: 4, name: 'Hillview' },
]

const initialAreas: Area[] = [
  { id: 1, cityId: 1, cityName: 'Springfield', areaName: 'North End', areaCode: 'SP-N' },
  { id: 2, cityId: 1, cityName: 'Springfield', areaName: 'Downtown', areaCode: 'SP-D' },
  { id: 3, cityId: 2, cityName: 'Rivertown', areaName: 'Harbor', areaCode: 'RT-H' },
  { id: 4, cityId: 3, cityName: 'Lakeside', areaName: 'West Bay', areaCode: 'LS-W' },
  { id: 5, cityId: 2, cityName: 'Rivertown', areaName: 'Central Plaza', areaCode: 'RT-C' },
  { id: 6, cityId: 4, cityName: 'Hillview', areaName: 'Summit Ridge', areaCode: 'HV-S' },
  { id: 7, cityId: 1, cityName: 'Springfield', areaName: 'East Side', areaCode: 'SP-E' },
  { id: 8, cityId: 3, cityName: 'Lakeside', areaName: 'Marina District', areaCode: 'LS-M' },
]

// ============================================================================
// ICONS / ACTION BUTTON
// ============================================================================

function DeleteIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="3,6 5,6 21,6"></polyline>
      <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
    </svg>
  )
}

function ActionButton({ children, variant, title, onClick }: { children: React.ReactNode; variant: 'view' | 'edit' | 'delete'; title: string; onClick?: () => void }) {
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
// MODALS
// ============================================================================

function ViewAreaAlert({ isOpen, onClose, area }: { isOpen: boolean; onClose: () => void; area: Area | null }) {
  if (!area) return null
  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Area Details</AlertTitle>
      <AlertDescription>View the selected area details below.</AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{area.id}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">City:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{area.cityName}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Area Name:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{area.areaName}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Area Code:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{area.areaCode}</span>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button color="dark/zinc" onClick={onClose}>Close</Button>
      </AlertActions>
    </Alert>
  )
}

function EditAreaAlert({ isOpen, onClose, area, cities, onSave }: { isOpen: boolean; onClose: () => void; area: Area | null; cities: City[]; onSave: (id: number, cityId: number, cityName: string, areaName: string, areaCode: string) => void }) {
  const [editedCityId, setEditedCityId] = useState<number>(0)
  const [editedAreaName, setEditedAreaName] = useState('')
  const [editedAreaCode, setEditedAreaCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (area && isOpen) {
      setEditedCityId(area.cityId)
      setEditedAreaName(area.areaName)
      setEditedAreaCode(area.areaCode)
    }
  }, [area, isOpen])

  const handleSave = () => {
    if (!area || editedCityId === 0 || !editedAreaName.trim() || !editedAreaCode.trim()) return
    setIsSubmitting(true)
    const cityName = cities.find(c => c.id === editedCityId)?.name || ''
    setTimeout(() => {
      onSave(area.id, editedCityId, cityName, editedAreaName.trim(), editedAreaCode.trim())
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    setEditedCityId(0)
    setEditedAreaName('')
    setEditedAreaCode('')
    onClose()
  }

  if (!area) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Area</AlertTitle>
      <AlertDescription>Update city, area name and area code.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">City</label>
            <select
              value={editedCityId}
              onChange={(e) => setEditedCityId(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value={0}>Select city</option>
              {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Area Name</label>
            <Input value={editedAreaName} onChange={(e) => setEditedAreaName(e.target.value)} placeholder="Enter area name" autoFocus />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Area Code</label>
            <Input value={editedAreaCode} onChange={(e) => setEditedAreaCode(e.target.value)} placeholder="Enter area code" />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={isSubmitting || editedCityId === 0 || !editedAreaName.trim() || !editedAreaCode.trim()}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

function AddAreaAlert({ isOpen, onClose, cities, onAdd }: { isOpen: boolean; onClose: () => void; cities: City[]; onAdd: (cityId: number, cityName: string, areaName: string, areaCode: string) => void }) {
  const [selectedCityId, setSelectedCityId] = useState<number>(0)
  const [newAreaName, setNewAreaName] = useState('')
  const [newAreaCode, setNewAreaCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setSelectedCityId(0)
      setNewAreaName('')
      setNewAreaCode('')
    }
  }, [isOpen])

  const handleAdd = () => {
    if (selectedCityId === 0 || !newAreaName.trim() || !newAreaCode.trim()) return
    setIsSubmitting(true)
    const cityName = cities.find(c => c.id === selectedCityId)?.name || ''
    setTimeout(() => {
      onAdd(selectedCityId, cityName, newAreaName.trim(), newAreaCode.trim())
      setIsSubmitting(false)
      setSelectedCityId(0)
      setNewAreaName('')
      setNewAreaCode('')
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    setSelectedCityId(0)
    setNewAreaName('')
    setNewAreaCode('')
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New Area</AlertTitle>
      <AlertDescription>Select city and provide area name and area code.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">City</label>
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              autoFocus
            >
              <option value={0}>Select city</option>
              {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Area Name</label>
            <Input value={newAreaName} onChange={(e) => setNewAreaName(e.target.value)} placeholder="Enter area name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Area Code</label>
            <Input value={newAreaCode} onChange={(e) => setNewAreaCode(e.target.value)} placeholder="Enter area code" />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={isSubmitting || selectedCityId === 0 || !newAreaName.trim() || !newAreaCode.trim()}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

function DeleteAreaAlert({ isOpen, onClose, area, onConfirm }: { isOpen: boolean; onClose: () => void; area: Area | null; onConfirm: (id: number) => void }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    if (!area) return
    setIsDeleting(true)
    setTimeout(() => {
      onConfirm(area.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!area) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this area?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{area.areaName}</strong> ({area.areaCode}) in <strong className="text-zinc-900 dark:text-white">{area.cityName}</strong>. This action cannot be undone.
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose} disabled={isDeleting}>Cancel</Button>
        <Button color="red" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Yes, Delete'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AreaMasterPage() {
  const [areas, setAreas] = useState<Area[]>(initialAreas)
  const [cities] = useState<City[]>(initialCities)

  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [selectedArea, setSelectedArea] = useState<Area | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(areas.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = areas.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => setCurrentPage(page)

  const handleView = (a: Area) => { setSelectedArea(a); setActiveModal('view') }
  const handleEdit = (a: Area) => { setSelectedArea(a); setActiveModal('edit') }
  const handleDelete = (a: Area) => { setSelectedArea(a); setActiveModal('delete') }
  const handleAddClick = () => setActiveModal('add')
  const closeModal = () => { setActiveModal(null); setSelectedArea(null) }

  const handleImportExcel = () => console.log('Import from Excel clicked')
  const handleExportExcel = () => console.log('Export to Excel clicked')
  const handleDownloadFormat = () => console.log('Download Format clicked')

  const handleAdd = (cityId: number, cityName: string, areaName: string, areaCode: string) => {
    const newId = areas.length > 0 ? Math.max(...areas.map(a => a.id)) + 1 : 1
    setAreas(prev => [...prev, { id: newId, cityId, cityName, areaName, areaCode }])
  }

  const handleSaveEdit = (id: number, cityId: number, cityName: string, areaName: string, areaCode: string) => {
    setAreas(prev => prev.map(a => a.id === id ? { ...a, cityId, cityName, areaName, areaCode } : a))
  }

  const handleConfirmDelete = (id: number) => {
    setAreas(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Area Master</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage areas and area codes
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
              Add Area
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
              <div className="w-[80px] px-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">ID</div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Area Name</div>
              <div className="w-[150px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Area Code</div>
              <div className="w-[180px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">City</div>
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
              {areas.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                  No areas found. Click "Add Area" to create one.
                </div>
              ) : (
                currentItems.map((a, index) => (
                  <div
                    key={a.id}
                    className={`flex items-center py-4 border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                      index === currentItems.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className="w-[80px] px-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums text-center">
                      {a.id}
                    </div>
                    <div className="flex-1 px-4 text-sm font-medium text-zinc-950 dark:text-white text-center">
                      {a.areaName}
                    </div>
                    <div className="w-[150px] px-4 text-sm text-zinc-700 dark:text-zinc-300 text-center">
                      {a.areaCode}
                    </div>
                    <div className="w-[180px] px-4 text-sm font-medium text-zinc-950 dark:text-white text-center">
                      {a.cityName}
                    </div>
                    <div className="w-[160px] px-4 flex items-center justify-center gap-3">
                      <ActionButton variant="view" title="View" onClick={() => handleView(a)}>
                        <EyeIcon className="w-4 h-4" />
                      </ActionButton>
                      <ActionButton variant="edit" title="Edit" onClick={() => handleEdit(a)}>
                        <PencilSquareIcon className="w-4 h-4" />
                      </ActionButton>
                      <ActionButton variant="delete" title="Delete" onClick={() => handleDelete(a)}>
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

      <AddAreaAlert isOpen={activeModal === 'add'} onClose={closeModal} cities={cities} onAdd={handleAdd} />
      <ViewAreaAlert isOpen={activeModal === 'view'} onClose={closeModal} area={selectedArea} />
      <EditAreaAlert isOpen={activeModal === 'edit'} onClose={closeModal} area={selectedArea} cities={cities} onSave={handleSaveEdit} />
      <DeleteAreaAlert isOpen={activeModal === 'delete'} onClose={closeModal} area={selectedArea} onConfirm={handleConfirmDelete} />
    </div>
  )
}

