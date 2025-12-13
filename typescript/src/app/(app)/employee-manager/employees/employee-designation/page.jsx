'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
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
// CONSTANTS
// ============================================================================

const hierarchyLevelOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const ITEMS_PER_PAGE = 10

// ============================================================================
// CUSTOM ICONS
// ============================================================================

function DeleteIcon({ className }) {
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

const initialDesignations = [
  { id: 1, designation: 'DSR', hierarchyLevel: 1 },
  { id: 2, designation: 'Area Head', hierarchyLevel: 2 },
  { id: 3, designation: 'LME/RME/SRME', hierarchyLevel: 3 },
  { id: 4, designation: 'HR', hierarchyLevel: 4 },
  { id: 5, designation: 'Manager', hierarchyLevel: 5 },
  { id: 6, designation: 'Senior Manager', hierarchyLevel: 6 },
  { id: 7, designation: 'Director', hierarchyLevel: 7 },
  { id: 8, designation: 'Vice President', hierarchyLevel: 8 },
]

// ============================================================================
// ACTION BUTTON COMPONENT
// ============================================================================

function ActionButton({ children, variant, title, onClick }) {
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

function ViewDesignationAlert({ isOpen, onClose, designation }) {
  if (!designation) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Designation Details</AlertTitle>
      <AlertDescription>
        View the details of the selected designation below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{designation.id}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Employee Designation:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{designation.designation}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Hierarchy Level:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{designation.hierarchyLevel}</span>
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

function EditDesignationAlert({ isOpen, onClose, designation, onSave }) {
  const [editedDesignation, setEditedDesignation] = useState('')
  const [editedHierarchyLevel, setEditedHierarchyLevel] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (designation && isOpen) {
      setEditedDesignation(designation.designation)
      setEditedHierarchyLevel(designation.hierarchyLevel)
    }
  }, [designation, isOpen])

  const handleSave = () => {
    if (!designation || !editedDesignation.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onSave(designation.id, editedDesignation.trim(), editedHierarchyLevel)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    setEditedDesignation('')
    setEditedHierarchyLevel(1)
    onClose()
  }

  if (!designation) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Designation</AlertTitle>
      <AlertDescription>Update the designation details below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Employee Designation
            </label>
            <Input
              type="text"
              value={editedDesignation}
              onChange={(e) => setEditedDesignation(e.target.value)}
              placeholder="Enter designation"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Hierarchy Level
            </label>
            <Listbox value={editedHierarchyLevel} onChange={setEditedHierarchyLevel}>
              {hierarchyLevelOptions.map((level) => (
                <ListboxOption key={level} value={level}>
                  <ListboxLabel>{level}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!editedDesignation.trim() || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD ALERT COMPONENT
// ============================================================================

function AddDesignationAlert({ isOpen, onClose, onAdd }) {
  const [newDesignation, setNewDesignation] = useState('')
  const [newHierarchyLevel, setNewHierarchyLevel] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setNewDesignation('')
      setNewHierarchyLevel(1)
    }
  }, [isOpen])

  const handleAdd = () => {
    if (!newDesignation.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onAdd(newDesignation.trim(), newHierarchyLevel)
      setIsSubmitting(false)
      setNewDesignation('')
      setNewHierarchyLevel(1)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    setNewDesignation('')
    setNewHierarchyLevel(1)
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New Designation</AlertTitle>
      <AlertDescription>Enter the details for the new designation below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Employee Designation
            </label>
            <Input
              type="text"
              value={newDesignation}
              onChange={(e) => setNewDesignation(e.target.value)}
              placeholder="Enter designation"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Hierarchy Level
            </label>
            <Listbox value={newHierarchyLevel} onChange={setNewHierarchyLevel}>
              {hierarchyLevelOptions.map((level) => (
                <ListboxOption key={level} value={level}>
                  <ListboxLabel>{level}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!newDesignation.trim() || isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteDesignationAlert({ isOpen, onClose, designation, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    if (!designation) return

    setIsDeleting(true)
    setTimeout(() => {
      onConfirm(designation.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!designation) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this designation?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{designation.designation}</strong>.
        This action cannot be undone.
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
// MAIN PAGE COMPONENT
// ============================================================================

export default function EmployeeDesignationPage() {
  const [designations, setDesignations] = useState(initialDesignations)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedDesignation, setSelectedDesignation] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(designations.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentDesignations = designations.slice(startIndex, endIndex)

  const handlePageChange = (page) => setCurrentPage(page)

  const handleView = (d) => { setSelectedDesignation(d); setActiveModal('view') }
  const handleEdit = (d) => { setSelectedDesignation(d); setActiveModal('edit') }
  const handleDelete = (d) => { setSelectedDesignation(d); setActiveModal('delete') }
  const handleAddClick = () => setActiveModal('add')
  const closeModal = () => { setActiveModal(null); setSelectedDesignation(null) }

  const handleImportExcel = () => console.log('Import from Excel clicked')
  const handleExportExcel = () => console.log('Export to Excel clicked')
  const handleDownloadFormat = () => console.log('Download Format clicked')

  const handleAddDesignation = (designation, hierarchyLevel) => {
    const newId = designations.length > 0 ? Math.max(...designations.map(d => d.id)) + 1 : 1
    setDesignations(prev => [...prev, { id: newId, designation, hierarchyLevel }])
  }

  const handleSaveEdit = (id, newDesignation, newHierarchyLevel) => {
    setDesignations(prev =>
      prev.map(d => d.id === id ? { ...d, designation: newDesignation, hierarchyLevel: newHierarchyLevel } : d)
    )
  }

  const handleConfirmDelete = (id) => {
    setDesignations(prev => prev.filter(d => d.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Employee Designation</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all employee designations in the system
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
              Add Designation
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        <div className="flex-1 overflow-x-auto overflow-y-hidden
          [&::-webkit-scrollbar]:h-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          <div className="min-w-[600px] flex flex-col h-full">
            <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              <div className="w-[120px] px-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">ID</div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Employee Designation</div>
              <div className="w-[220px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Hierarchy Level</div>
              <div className="w-[200px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
            </div>

            <div className="flex-1 overflow-y-auto
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-zinc-300
              [&::-webkit-scrollbar-thumb]:rounded-full
              dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
            >
              {designations.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                  No designations found. Click "Add Designation" to create one.
                </div>
              ) : (
                currentDesignations.map((designation, index) => (
                  <div 
                    key={designation.id} 
                    className={`flex items-center py-4 border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                      index === currentDesignations.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className="w-[120px] px-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums text-center">
                      {designation.id}
                    </div>
                    <div className="flex-1 px-4 text-sm font-medium text-zinc-950 dark:text-white text-center">
                      {designation.designation}
                    </div>
                    <div className="w-[220px] px-4 text-sm text-zinc-600 dark:text-zinc-400 text-center">
                      {designation.hierarchyLevel}
                    </div>
                    <div className="w-[200px] px-4 flex items-center justify-center gap-3">
                      <ActionButton 
                        variant="view" 
                        title="View"
                        onClick={() => handleView(designation)}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </ActionButton>
                      <ActionButton 
                        variant="edit" 
                        title="Edit"
                        onClick={() => handleEdit(designation)}
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </ActionButton>
                      <ActionButton 
                        variant="delete" 
                        title="Delete"
                        onClick={() => handleDelete(designation)}
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

      <AddDesignationAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        onAdd={handleAddDesignation}
      />

      <ViewDesignationAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        designation={selectedDesignation}
      />

      <EditDesignationAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        designation={selectedDesignation}
        onSave={handleSaveEdit}
      />

      <DeleteDesignationAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        designation={selectedDesignation}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
