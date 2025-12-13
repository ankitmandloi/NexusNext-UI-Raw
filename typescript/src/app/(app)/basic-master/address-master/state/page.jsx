'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import Actions from '../common/components/Actions.jsx'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import CommonPagination from '../common/components/Pagination.jsx'

import { PlusIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

// ============================================================================
// INITIAL DATA
// ============================================================================
const ITEMS_PER_PAGE = 10
// Sample state data - Replace with API call in production
const initialStates = [
  { id: 1, name: 'Madhya Pradesh' },
  { id: 2, name: 'Maharashtra' },
  { id: 3, name: 'Andaman and Nicobar' },
  { id: 4, name: 'Andhra Pradesh' },
  { id: 5, name: 'Assam' },
  { id: 6, name: 'Bihar' },
  { id: 7, name: 'Chhattisgarh' },
  { id: 8, name: 'Goa' },
  { id: 9, name: 'Gujarat' },
  { id: 10, name: 'Haryana' },
  { id: 11, name: 'Himachal Pradesh' },
  { id: 12, name: 'Jharkhand' },
]

// ============================================================================
// COMPONENTS
// ============================================================================





// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================

function ViewStateAlert({ isOpen, onClose, state }) {
  if (!state) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>State Details</AlertTitle>
      <AlertDescription>
        View the details of the selected state below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{state.id}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">State Name:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{state.name}</span>
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

function EditStateAlert({ isOpen, onClose, state, onSave }) {
  const [editedName, setEditedName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populate form when state changes
  useEffect(() => {
    if (state && isOpen) {
      setEditedName(state.name)
    }
  }, [state, isOpen])

  // Handle save action
  const handleSave = async () => {
    if (!state || !editedName.trim()) return

    setIsSubmitting(true)

    // Simulating API call with timeout
    setTimeout(() => {
      onSave(state.id, editedName.trim())
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  // Handle cancel
  const handleCancel = () => {
    setEditedName('')
    onClose()
  }

  if (!state) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit State</AlertTitle>
      <AlertDescription>
        Update the state name below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-2">
          <label htmlFor="editStateName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            State Name
          </label>
          <Input
            id="editStateName"
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Enter state name"
            autoFocus
          />
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!editedName.trim() || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD STATE ALERT COMPONENT
// ============================================================================

function AddStateAlert({ isOpen, onClose, onAdd }) {
  const [newStateName, setNewStateName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setNewStateName('')
    }
  }, [isOpen])

  // Handle add action
  const handleAdd = async () => {
    if (!newStateName.trim()) return

    setIsSubmitting(true)

    // Simulating API call with timeout
    setTimeout(() => {
      onAdd(newStateName.trim())
      setIsSubmitting(false)
      setNewStateName('')
      onClose()
    }, 300)
  }

  // Handle cancel
  const handleCancel = () => {
    setNewStateName('')
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New State</AlertTitle>
      <AlertDescription>
        Enter the name of the new state below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-2">
          <label htmlFor="newStateName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            State Name
          </label>
          <Input
            id="newStateName"
            type="text"
            value={newStateName}
            onChange={(e) => setNewStateName(e.target.value)}
            placeholder="Enter state name"
            autoFocus
          />
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!newStateName.trim() || isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteStateAlert({ isOpen, onClose, state, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false)

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!state) return

    setIsDeleting(true)

    // Simulating API call with timeout
    setTimeout(() => {
      onConfirm(state.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!state) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this state?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{state.name}</strong>. 
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

export default function StatePage() {
  // State management for the list
  const [states, setStates] = useState(initialStates)

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedState, setSelectedState] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10



  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(states.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentStates = states.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ACTION HANDLERS

  const handleView = (state) => {
    setSelectedState(state)
    setActiveModal('view')
  }

  const handleEdit = (state) => {
    setSelectedState(state)
    setActiveModal('edit')
  }

  const handleDelete = (state) => {
    setSelectedState(state)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedState(null)
  }

  // CRUD HANDLERS

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

  const handleAddState = (name) => {
    const newId = states.length > 0 ? Math.max(...states.map(s => s.id)) + 1 : 1
    const newState = { id: newId, name }
    setStates((prevStates) => [...prevStates, newState])
  }

  const handleSaveEdit = (id, newName) => {
    setStates((prevStates) =>
      prevStates.map((state) =>
        state.id === id ? { ...state, name: newName } : state
      )
    )
  }

  const handleConfirmDelete = (id) => {
    setStates((prevStates) => prevStates.filter((state) => state.id !== id))
  }

  // RENDER
  return (
    <div className="flex flex-col " style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>States</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all states in the system
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
              Add State
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[15%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[55%] text-sm font-medium text-zinc-500 dark:text-zinc-400">State Name</div>
          <div className="w-[30%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
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
        >
          {states.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No states found. Click "Add State" to create one.
            </div>
          ) : (
            currentStates.map((state, index) => (
              <div
                key={state.id}
                className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                  index === currentStates.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="w-[15%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                  {state.id}
                </div>
                <div className="w-[55%] text-sm font-medium text-zinc-950 dark:text-white">
                  {state.name}
                </div>
                <div className="w-[160px] px-4 flex items-center justify-center">
                  <Actions
                    onView={() => handleView(state)}
                    onEdit={() => handleEdit(state)}
                    onDelete={() => handleDelete(state)}
                  />
                </div>

              </div>
            ))
          )}
        </div>

        {/* Pagination Footer - Same height as header */}
        <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

      </div>

      {/* ALERT MODALS */}
      <AddStateAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        onAdd={handleAddState}
      />

      <ViewStateAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        state={selectedState}
      />

      <EditStateAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        state={selectedState}
        onSave={handleSaveEdit}
      />

      <DeleteStateAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        state={selectedState}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
